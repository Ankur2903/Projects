import React, {useEffect, useState} from 'react'
import Newsitem from './Newsitem'
import Spinner from './spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{
  const [articles, setarticles] = useState([])
  const [loading, setloading] = useState(true)
  const [page,setpage] = useState(1)
  const [totalResults,settotalResults] = useState(0)


  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(false)
    props.setProgress(100);
  }
  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - IndiaNews`;
    updateNews();
  },[])

  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=c488e58aa8db4c669697d64be8d27adb&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)
    setloading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    setarticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
    setloading(false)
  };

    return (
      <div className="container my-3">
        <h1 className='text-center' style={{maegin: '35px 0px', marginTop: '90px'}}>IndiaNews - Top {capitalizeFirstLetter(props.category)} Headline</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
         >
          <div className='container'>
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <Newsitem title = {element.title?element.title:""} description={element.description?element.description:""} imageUrl = {element.urlToImage} newsUrl ={element.url} author = {element.author} date = {element.publishedAt} source ={element.source.name}/>
          </div> 
        })}
        </div>
        </div></InfiniteScroll>
      </div>
    )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}

export default News
