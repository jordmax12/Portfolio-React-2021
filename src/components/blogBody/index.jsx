import React from 'react'
import './blogBody.module.scss'

const BlogBody = (props) => {
  const { children } = props;
  return (
    <div> {children} </div>
  )
}

export default BlogBody