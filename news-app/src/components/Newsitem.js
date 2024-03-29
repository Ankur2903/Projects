import React from 'react'

const Newsitem = (props)=>{
    let {title, description,imageUrl,newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <span className='position-absolute top-0 translate-middle badge rounded-pill bg-danger' style={{left:'0%',zIndex: 1}}>{source}</span>
          <img src={imageUrl?imageUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvOXlxMpvHkjPrI38WbF7KZ7UjcVvum_-oVw&usqp=CAU"} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {author?author:"Unknow"} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target='blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default Newsitem
