import React, { useState, useEffect } from 'react'
import { Spring } from "react-spring/renderprops";
import styles from './header.module.scss';
import { landingStates } from '../../assets/utils';

const Header = (props) => {
  const { showHeader, showHeaderWidth, homeButtonClickHandler, bodyType, updateBodyType } = props;
  const [headerLoaderTextClasses, setHeaderLoaderTextClasses] = useState(`${styles.db} ${styles.header_loader_text}`)
  const [headerNavTextClasses, setHeaderNavTextClasses] = useState(styles.dn)

  useEffect(() => {
    if(showHeader) {
      setHeaderNavTextClasses(styles.header_nav_link);
      setHeaderLoaderTextClasses(styles.dn);
    } 
  }, [showHeader])

  const renderExternals = (type) => {
    const _className = type === 'top' ? styles.top_header_external_link : headerNavTextClasses;
    return (
      <>
          <span onClick={() => window.open('Resume2023-V3.pdf')} className={_className}>Resume</span>
          <span onClick={() => window.open('https://www.github.com/jordmax12')} className={_className}>Github</span>
          <span onClick={() => window.open('www.linkedin.com/in/jordanmaxjs')} className={_className}>LinkedIn</span>
          {/* <span onClick={() => window.open('https://jdmdev-portfolio.herokuapp.com')} className={_className}>2019</span> */}
      </>
    )
  }
  
  const renderHome = (type) => {
    const _className = type === 'top' ? styles.top_header_external_link : headerNavTextClasses;
    return (
      <>
        <span onClick={() => updateBodyType(landingStates.NONE)} className={_className} style={{ width: '100%'}}>Home</span>
      </>
    )
  }

  const renderBack = (type) => {
    return (
      <>
          {renderHome(type)}
      </>
    )
  }

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
                          {
                            bodyType === landingStates.NONE
                            ? renderExternals('top')
                            : renderBack('top')
                          }
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
              {
                bodyType === landingStates.NONE
                ? renderExternals()
                : renderBack()
              }
            </div>
          }
        </Spring>

        <p className={headerLoaderTextClasses}> Loading Modules {showHeaderWidth}% </p>
      </div>
    </>
  )
}

export default Header
