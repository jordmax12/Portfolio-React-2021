import React from 'react'
import './blog.module.scss'
import BlogPost from '../../components/blogPost'

const Blog = (props) => {
  return (
    <div>
      <BlogPost>
        Inside Blog Post
      </BlogPost>
    </div>
  )
}

export default Blog