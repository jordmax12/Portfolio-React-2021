import React from 'react'
import './blog.module.scss'
import BlogPost from '../../components/blogPost'
import testImage from "../../assets/images/technology/react-tech-icon.png";

const Blog = (props) => {
  return (
    <div style={{height: 'calc(100% - 50px)'}}>
      <BlogPost headline="Testing Headline" picture={testImage} link="https://jordanmax.medium.com/the-power-of-the-serverless-framework-61d37af062c8" date="December 24, 2020" source="medium">
        Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post Inside Blog Post
      </BlogPost>
    </div>
  )
}

export default Blog