import React, { useState, useEffect } from 'react'
import { Spring } from "react-spring/renderprops";
import styles from './header.module.scss';
import { landingStates } from '../../assets/utils'

const Header = (props) => {
  const { showHeader, showHeaderWidth, homeButtonClickHandler, updateBodyType } = props;
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
                          <span onClick={() => updateBodyType(landingStates.PROJECTS)} className={styles.top_header_external_link}>Recent Work</span> 
                          <span onClick={() => window.open('https://jdmdev-portfolio.herokuapp.com')} className={styles.top_header_external_link}>2019</span>
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
                <span onClick={() => updateBodyType(landingStates.PROJECTS)} style={{opacity}} className={headerNavTextClasses}>Recent Work</span>
                <span onClick={() => window.open('https://jdmdev-portfolio.herokuapp.com')} style={{opacity}} className={headerNavTextClasses}>2019</span>
            </div>
          }
        </Spring>

        <p className={headerLoaderTextClasses}> Loading Modules {showHeaderWidth}% </p>
      </div>
    </>
  )
}

export default Header