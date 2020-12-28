import React, { useState, useEffect } from 'react'
import styles from './header.module.scss'
// import Div from '../div'

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const BlogPost = (props) => {
  const defaultMenuClasses = `col-3 ${styles.navigation}`
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const [menuClasses, setMenuClasses] = useState(defaultMenuClasses);
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      // TODO: this isnt working for some reason?
      // const lastWidth = width;
      const newWidth = getWidth();
      setWidth(newWidth)
      if(newWidth >= 720) { 
        setMenuClasses(defaultMenuClasses);
        setHamburgerIsOpen(false);
      }
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  useEffect(() => {
    if(hamburgerIsOpen) {
      setMenuClasses(`col-12`);
    } else {
      setMenuClasses(defaultMenuClasses)
    }
  }, [hamburgerIsOpen])

  const handleHamburger = (e) => {
    e.preventDefault();
    if(hamburgerIsOpen) {
      setHamburgerIsOpen(false);
      return
    }

    setHamburgerIsOpen(true);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className={`col-12 ${styles.hamburger}`}>
            <a href="#" className="icon" onClick={handleHamburger}>
              <i className="fa fa-bars"></i>
            </a>
          </div>
          <div className={menuClasses}>
						Home
          </div>
          <div className={menuClasses}>
						Resume
					</div>
					<div className={menuClasses}>
						Projects
					</div>
					<div className={menuClasses}>
						Blog
					</div>
        </div>
      </div>
    </div>
  )
}

export default BlogPost