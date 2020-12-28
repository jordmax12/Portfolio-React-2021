import React from 'react'
import './blogPost.module.scss'
import Div from '../div'

const BlogPost = (props) => {
  const { headline, picture, children, link } = props
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          { headline }
        </div>
        <div className="col-12">
          <div className="col-6-sm tal">
            ByLine
          </div>
          <div className="col-6-sm tar">
            Date
          </div>
        </div>
        <div className="col-12">
          <img src={picture} />
        </div>
        <div className="col-12 tal">
          {children}
        </div>
        <div className="col-12 tal">
          <button onClick={() => { window.open(link, "_blank") }}>
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default BlogPost