import React, { useState, useEffect } from 'react'
import { Spring } from "react-spring/renderprops";
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
  const [headerNavTextClasses, setHeaderNavTextClasses] = useState(styles.dn)
  /* eslint-disable no-unused-vars */
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const resizeListener = () => {
      if(containerClasses === styles.dn && showHeader) {
        setContainerClases('row')
      }

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
      // setHeaderLoaderTextClasses('dn');
      setHeaderNavTextClasses(styles.headerNavLink);
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

    <div className={styles.mainHeaderContainer}>
      <Spring delay={100} to={{ opacity: showHeader ? 1 : 0 }}>
          {({opacity}) =>
          <>
            <div className={styles.topHeaderContainer} style={{opacity}}>
              {
                (
                  <>
                    <span className={styles.topHeaderTitle}>Jordan Max - Full Stack Engineer</span>
                    <div className={styles.topHeaderExternals}>
                        <span className={styles.topHeaderExternalLink}>LinkedIn</span>
                        <span className={styles.topHeaderExternalLink}>Github</span>
                        <span className={styles.topHeaderExternalLink}>Medium</span>
                    </div>
                  </>
                )
              }
            </div>
          </>
        }
      </Spring>
      <Spring delay={100} to={{ opacity: showHeader ? 1 : 0 }}>
        {({opacity}) =>
          <div style={{ width: `${showHeaderWidth}%` }} className={styles.headerContainer} onClick={() => handleItemClick('/')}>
              <span style={{opacity}} className={headerNavTextClasses}>LinkedIn</span>
              <span style={{opacity}} className={headerNavTextClasses}>Github</span>
              <span style={{opacity}} className={headerNavTextClasses}>Medium</span>
          </div>
        }
      </Spring>

      <Spring delay={100} to={{ opacity: !showHeader ? 1 : 0 }}>
        {({opacity}) =>
          <p style={{opacity}} className={headerLoaderTextClasses}> Loading Modules {showHeaderWidth}% </p>
        }
      </Spring>
    </div>
  )
}

export default BlogPost