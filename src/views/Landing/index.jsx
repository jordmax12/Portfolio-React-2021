import React, { useState, useEffect, useRef } from 'react';
import styles from './landing.module.scss';
import Typed from 'react-typed';
// import { landingStates } from '../../assets/utils'
import Balloon from '../../components/loader/balloon';
import MarioSquare from '../../components/marioSquare';
import Jordan from '../../components/jordan';

const generateNormalizedPercentLoaded = (percentLoaded) => {
    return percentLoaded && percentLoaded !== 0 ? Math.ceil(90 * parseFloat(percentLoaded / 100)) : 0
}

const getCurrentHeight = () => window.innerHeight

const mapNormalizedFontSize = () => {
    const height = getCurrentHeight();
    let fontSize = '15.5vh'
    if(height < 900 && height >= 721) {
        fontSize = "25.5vh"
    } else if(height < 721) {
        console.log('here??')
        fontSize = "160px"
    }
    // if(width > 1440 && width < 1700) {
    //     fontSize = '12.5vw';
    // } else if (width > 1700) {
    //     fontSize = '9.5vw';
    // } else if (width < 720){
    //     fontSize = '25.5vw';
    // } else if (width < 600){
    //     fontSize = '30.5vw';
    // } 

    return fontSize;
}

const Landing = (props) => {
    const { pageState, percentLoaded } = props;
    const [normalizedPercentLoaded, setNormalizedPercentLoaded] = useState(generateNormalizedPercentLoaded(percentLoaded))
    const [normalizedFontSize, setNormalizedFontSize] = useState(mapNormalizedFontSize())

    useEffect(() => {
        setNormalizedPercentLoaded(generateNormalizedPercentLoaded(percentLoaded))
    }, [percentLoaded])

    useEffect(() => {
        const resizeListener = () => {
            setNormalizedFontSize(mapNormalizedFontSize())
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);
    
        // clean up function
        return () => {
          // remove resize listener
          window.removeEventListener('resize', resizeListener);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
      }, [])

    const typedRef = useRef(null);
    const renderTyped = () => {
        if(percentLoaded === 100) {
            return <Typed
            strings={[
                'software engineer',
                'animal lover',
                'aws developer',
                'blackhawks fan',
                'computer enthusiast',
                'react developer',
                'breaker of chains'
            ]}
            typeSpeed={40}
            backSpeed={50}
            ref={typedRef}
            className={`${styles.typedTarget} ${styles.GineosMedium}`}
            loop >
            <span ref={typedRef} id="typedTarget"></span>
        </Typed>
        }
    }

    const [ balloonY, setBalloonY ] = useState('56px');
    return (
        <>
            {
                <div className={styles.typedContainer}>
                    <h1 className={styles.GineosMedium} style={{color: 'black', fontSize: normalizedFontSize, margin: '0', marginRight: percentLoaded === 100 ? "unset" : "50%"}}>
                        {renderTyped()}
                        <span style={{ verticalAlign: 'middle', color: 'grey', fontSize: '18px'}}>
                        since
                        </span> 
                        '{normalizedPercentLoaded}
                    </h1>
                </div>
            }
            {
                window.navigator.connection.effectiveType != "4g"
                ? null
                : <>
                    <Balloon percent={percentLoaded} text={'Loading...'} trackBalloonY={setBalloonY} />
                    <Jordan balloonY={balloonY} percent={percentLoaded} />
                    <MarioSquare percent={percentLoaded} />
                </>
            }
            { percentLoaded === 100 && (
                <div className={styles.navContainer}>
                    {/* <p style={{ color: 'grey', fontSize: '2em', paddingLeft: '15px'}}>Jordan Max</p> */}
                    <p style={{ color: 'grey', fontSize: '1em', paddingLeft: '15px', cursor: 'pointer'}}>Projects</p>
                    <p style={{ color: 'grey', fontSize: '1em', paddingLeft: '15px', cursor: 'pointer'}}>Resume</p>
                    <p style={{ color: 'grey', fontSize: '1em', paddingLeft: '15px', cursor: 'pointer'}}>Blog</p>
                </div>
            )}
        </>
    )
}

export default Landing;