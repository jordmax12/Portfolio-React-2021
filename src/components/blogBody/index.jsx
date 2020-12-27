import React from 'react'
import './blogBody.module.scss'

const BlogBody = (props) => {
  const { children, headline } = props;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
            {headline}
        </div>
        <div className="col-12">
            {children}
        </div>
      </div>
    </div>
  )
}

export default BlogBody