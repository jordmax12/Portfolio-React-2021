import React from 'react'
import './header.module.scss'
// import Div from '../div'

const BlogPost = (props) => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="col-3">
						Home
          </div>
          <div className="col-3">
						Resume
					</div>
					<div className="col-3">
						Projects
					</div>
					<div className="col-3">
						Blog
					</div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost