import React, { useState, useEffect } from 'react'
import styles from './header.module.scss'
// import Div from '../div'

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const BlogPost = (props) => {
  const { showHeader, showHeaderWidth } = props;
  const defaultMenuClasses = `col-12 ${styles.navigation}`
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const [menuClasses, setMenuClasses] = useState(defaultMenuClasses);
  const [containerClasses, setContainerClases] = useState(styles.dn);
  const [headerLoaderTextClasses, setHeaderLoaderTextClasses] = useState(`${styles.db} ${styles.headerLoaderText}`)
  /* eslint-disable no-unused-vars */
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      if(containerClasses === styles.dn && showHeader) {
        setContainerClases('row')
      }
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
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [defaultMenuClasses])

  useEffect(() => {
    if(showHeader) {
      setContainerClases('row');
      setHeaderLoaderTextClasses('dn');
    } 
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [showHeader])

  useEffect(() => {
    if(hamburgerIsOpen) {
      setMenuClasses(`col-12`);
    } else {
      setMenuClasses(defaultMenuClasses)
    }
  }, [hamburgerIsOpen, defaultMenuClasses])

  const handleHamburger = (e) => {
    e.preventDefault();
    if(hamburgerIsOpen) {
      setHamburgerIsOpen(false);
      return
    }

    setHamburgerIsOpen(true);
  }

  const handleItemClick = (path) => {
    window.location = path;
  }

  return (
    <div style={{ position: 'relative', width: '96%', marginRight: 'auto', marginLeft: 'auto', height: '56px' }}>
      
      <div style={{ backgroundColor: '#ececec', width: `${showHeaderWidth}%`, height: '20px', position: 'absolute', bottom: '0'}} onClick={() => handleItemClick('/')}>
          
          {/* <p>Github</p> */}
      </div>
      <p className={headerLoaderTextClasses}> Loading Modules {showHeaderWidth}% </p>
      {/* <div className={styles.headerContainer} >
        <div className={containerClasses}>
          <div className="col-12">
            <div className={`col-12 ${styles.hamburger}`}> */}
              {/* eslint-disable jsx-a11y/anchor-is-valid */}
              {/* <a href="#" className="icon" onClick={handleHamburger}>
                <i className="fa fa-bars"></i> */}
              {/* </a>
            </div>

          </div>
        </div>
      </div> */}
    </div>
  )
}

export default BlogPost