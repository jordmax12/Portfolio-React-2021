import React from 'react'
import './blogPost.module.scss'
import Div from '../div'

const BlogPost = (props) => {
  const { headline, picture, children, link, date } = props;
  const authorPage = "https://jordanmax.medium.com/"
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="blogLink" onClick={() => { window.open(link, "_blank") }}>{ headline }</h1>
        </div>
        <div className="col-12">
          <div className="col-6-sm tal">
            <p className="blogLink" onClick={() => {  window.open(authorPage, "_blank") }}>Jordan Max</p>
          </div>
          <div className="col-6-sm tar">
            <p>{date}</p>
          </div>
        </div>
        <div className="col-12">
          <img src={picture} />
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