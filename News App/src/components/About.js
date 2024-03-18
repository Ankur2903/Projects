import React, { Component } from 'react'

const About = ()=> {
    return (
      <div className='container mx-144'>
        This website is made by Ankur Saini. This code is a React.js app that fetches news articles from an API based on categories like business, entertainment, etc. It uses React Router for routing and a loading bar component to show progress. The News component fetches news using the apiKey and displays them. The setProgress method updates the loading bar. Each category has its route and renders the News component with specific props.
      </div>
    )
}

export default About
