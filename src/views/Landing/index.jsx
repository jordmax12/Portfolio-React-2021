import React, { useState, useEffect, useRef } from 'react';
import styles from './landing.module.scss';
import Typed from 'react-typed';
import Balloon from '../../components/balloon';
import MarioSquare from '../../components/marioSquare';
import Jordan from '../../components/jordan';

const generateNormalizedPercentLoaded = (percentLoaded) => {
    return percentLoaded && percentLoaded !== 0 ? Math.ceil(90 * parseFloat(percentLoaded / 100)) : 0
}

const getCurrentHeight = () => window.innerHeight
const getCurrentWidth = () => window.innerWidth

const mapNormalizedFontSize = () => {
    const height = getCurrentHeight();
    const width = getCurrentWidth();
    let fontSize = '15.5vh'
    if(width < 500) {
        fontSize = '8.5vh'
    } else if (width > 500 && width < 700) {
        fontSize = '15.5vh'
    }
    else if(height < 900 && height >= 721) {
        fontSize = "25.5vh"
    } else if(height < 721) {
        fontSize = "160px"
    }

    return fontSize;
}

const Landing = (props) => {
    const { pageState, percentLoaded } = props;
    const [normalizedPercentLoaded, setNormalizedPercentLoaded] = useState(generateNormalizedPercentLoaded(percentLoaded))
    const [normalizedFontSize, setNormalizedFontSize] = useState(mapNormalizedFontSize())
    const [showAnimation, setShowAnimation] = useState(true)
    const [showAnimationElements, setShowAnimationElements] = useState(true);
    const [animationTimeoutTriggered, setAnimationTimeoutTriggered] = useState(true);

    useEffect(() => {
        setNormalizedPercentLoaded(generateNormalizedPercentLoaded(percentLoaded))
        if(percentLoaded && animationTimeoutTriggered) {
            setAnimationTimeoutTriggered(false);
            setTimeout(() => {
                console.log('here')
                setShowAnimation(false)
            }, 500)
        }
    }, [percentLoaded, animationTimeoutTriggered])

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
                'computer builder',
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
                    <Balloon percent={percentLoaded} trackBalloonY={setBalloonY} />
                    <Jordan animationCompleted={!showAnimationElements} balloonY={balloonY} percent={percentLoaded} completeCallback={() => setShowAnimationElements(false)} />
                    <MarioSquare animationCompleted={!showAnimationElements} percent={percentLoaded} />
                </>
            }
            { percentLoaded === 100 && (
                <div className={styles.navContainer}>
                    <p className={styles.landingNavLink}>Projects</p>
                    <p className={styles.landingNavLink}>Resume</p>
                    <p className={styles.landingNavLink}>Blog</p>
                </div>
            )}
        </>
    )
}

export default Landing;