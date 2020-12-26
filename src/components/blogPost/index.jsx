import React from 'react'
import './blogPost.module.scss'
import BlogBody from '../blogBody'

const BlogPost = (props) => {
  const { children } = props;
  return (
    <>
      {children}
      <BlogBody>
        Inside Blog Body
      </BlogBody>
    </>
  )
}

export default BlogPost