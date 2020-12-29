import React from 'react'
import './blogPost.module.scss'

const BlogPost = (props) => {
  const { children, date, headline, link, picture, source} = props;
  const authorPage = "https://jordanmax.medium.com/"
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 tal">
          <h1 className="blogLink blogHeadline" onClick={() => { window.open(link, "_blank") }}>{ headline }</h1>
        </div>
        <div className="col-12">
          <div className="col-6-sm tal">
            <p><span  className="blogLink" onClick={() => {  window.open(authorPage, "_blank") }}>Jordan Max</span> via <span className="source">{source}</span></p>
          </div>
          <div className="col-6-sm tar">
            <p>{date}</p>
          </div>
        </div>
        <div className="col-12">
          <img alt="blog post" src={picture} />
        </div>
        <div className="col-12 tal">
          {children}
        </div>
        <div className="col-12 tal">
          <button className="button" onClick={() => { window.open(link, "_blank") }}>
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPost