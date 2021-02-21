import React, { useState, useEffect } from 'react'
import { Spring } from "react-spring/renderprops";
import styles from './header.module.scss';

const Header = (props) => {
  const { showHeader, showHeaderWidth, homeButtonClickHandler } = props;
  const [headerLoaderTextClasses, setHeaderLoaderTextClasses] = useState(`${styles.db} ${styles.header_loader_text}`)
  const [headerNavTextClasses, setHeaderNavTextClasses] = useState(styles.dn)

  useEffect(() => {
    if(showHeader) {
      setHeaderNavTextClasses(styles.header_nav_link);
      setHeaderLoaderTextClasses(styles.dn);
    } 
  }, [showHeader])

  return (
    <>
      <div className={styles.main_header_container}>
        <Spring delay={100} to={{ opacity: showHeader ? 1 : 0 }}>
            {({opacity}) =>
            <>
              <div className={styles.top_header_container} style={{opacity}}>
                {
                  (
                    <>
                      <span className={styles.top_header_title} onClick={homeButtonClickHandler}>Jordan Max - Full Stack Engineer</span>
                      <div className={styles.top_header_externals}>
                          <span className={styles.top_header_external_link}>LinkedIn</span>
                          <span className={styles.top_header_external_link}>Github</span>
                          <span className={styles.top_header_external_link}>Medium</span>
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
            <div style={{ width: `${showHeaderWidth}%` }} className={styles.header_container}>
                <span style={{opacity}} className={headerNavTextClasses}>LinkedIn</span>
                <span style={{opacity}} className={headerNavTextClasses}>Github</span>
                <span style={{opacity}} className={headerNavTextClasses}>Medium</span>
            </div>
          }
        </Spring>

        <p className={headerLoaderTextClasses}> Loading Modules {showHeaderWidth}% </p>
      </div>
    </>
  )
}

export default Header