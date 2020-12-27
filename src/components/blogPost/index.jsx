import React from 'react'
import './blogPost.module.scss'
import BlogBody from '../blogBody'
import Div from '../div'

const BlogPost = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <BlogBody headline="This is a test blog post">
            Inside Blog Body
          </BlogBody>
        </div>
      </div>
    </div>
  )
}

export default BlogPost