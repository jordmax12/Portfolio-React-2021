import React, { useState, useEffect, useRef } from 'react';
import styles from './landing.module.scss';
import Typed from 'react-typed';
import { Spring } from "react-spring/renderprops";
import Balloon from '../../components/balloon';
import MarioSquare from '../../components/marioSquare';
import Jordan from '../../components/jordan';
import Confetti from 'react-dom-confetti';

const generateNormalizedPercentLoaded = (percentLoaded) => {
    return percentLoaded && percentLoaded !== 0 ? Math.ceil(90 * parseFloat(percentLoaded / 100)) : 0
}

const getCurrentHeight = () => window.innerHeight
const getCurrentWidth = () => window.innerWidth

const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#f00", "#0f0", "#00f"]
  };

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
    const { pageState, percentLoaded, loadingCompleted } = props;
    const [normalizedPercentLoaded, setNormalizedPercentLoaded] = useState(generateNormalizedPercentLoaded(percentLoaded))
    const [normalizedFontSize, setNormalizedFontSize] = useState(mapNormalizedFontSize())
    const [showAnimation, setShowAnimation] = useState(true)
    const [showAnimationElements, setShowAnimationElements] = useState(true);
    const [animationTimeoutTriggered, setAnimationTimeoutTriggered] = useState(true);
    const [initConfetti, setInitConfetti] = useState(false);

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

    const triggerLoadingCompleted = () => {
        setShowAnimationElements(false);
        loadingCompleted();
    }

    const [ balloonY, setBalloonY ] = useState('56px');
    return (
        <>
            {
                <Spring delay={0} to={{ opacity: !showAnimationElements ? 1 : 0 }}>
                    {({opacity}) =>
                        <div className={styles.typedContainer}>
                            <h1 className={styles.GineosMedium} style={{color: 'black', fontSize: normalizedFontSize, margin: '0'}}>
                                <span  style={{opacity}}>
                                    {renderTyped()}
                                    <span style={{ verticalAlign: 'middle', color: 'grey', fontSize: '18px'}}>
                                    since
                                </span>
                                </span> 
                                '{normalizedPercentLoaded}
                            </h1>
                        </div>
                    }
                </Spring>
            }
            {
                window.navigator.connection.effectiveType != "4g"
                ? null
                : <>
                    {/* <div style={{ position: 'absolute', left: '50%', top: '56px'}}>
                        <Confetti active={initConfetti} config={ confettiConfig } />
                    </div> */}
                    <Balloon percent={percentLoaded} trackBalloonY={setBalloonY} triggerConfetti={() => setInitConfetti(true)} />
                    <Jordan animationCompleted={!showAnimationElements} balloonY={balloonY} percent={percentLoaded} completeCallback={triggerLoadingCompleted} />
                    {/* <MarioSquare animationCompleted={!showAnimationElements} percent={percentLoaded} /> */}

                </>
            }
            {/* { !showAnimationElements && ( */}
                <Spring delay={0} to={{ opacity: !showAnimationElements ? 1 : 0 }}>
                    {({opacity}) =>
                        <div style={{opacity}} className={styles.navContainer}>
                            <p className={styles.landingNavLink}>Projects</p>
                            <p className={styles.landingNavLink}>Resume</p>
                            <p className={styles.landingNavLink}>Blog</p>
                        </div>
                    }
                </Spring>
            {/* )} */}

        </>
    )
}

export default Landing;