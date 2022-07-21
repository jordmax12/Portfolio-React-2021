import React, { useState, useEffect, useRef } from 'react';
import styles from './landing.module.scss';
import Typed from 'react-typed';
import { Spring } from "react-spring/renderprops";
import Balloon from '../../components/balloon';
import Jordan from '../../components/Jordan';
import ParticlesLanding from '../../components/particlesLanding';
import { landingStates } from '../../assets/utils';

const generateNormalizedPercentLoaded = (percentLoaded) => {
    return percentLoaded && percentLoaded !== 0 ? Math.ceil(90 * parseFloat(percentLoaded / 100)) : 0;
}

const getCurrentHeight = () => window.innerHeight;
const getCurrentWidth = () => window.innerWidth;

const mapNormalizedFontSize = () => {
    const height = getCurrentHeight();
    const width = getCurrentWidth();
    let fontSize = '12.5vh';
    if(width < 500) {
        fontSize = '8.5vh';
    } else if (width > 500 && width < 700) {
        fontSize = '15.5vh';
    }
    else if(height < 900 && height >= 721) {
        fontSize = "12.5vh";
    } else if(height < 721) {
        fontSize = "160px";
    }

    return fontSize;
}

const Landing = (props) => {
    const { percentLoaded, loadingCompleted, updateBodyType } = props;
    const [normalizedPercentLoaded, setNormalizedPercentLoaded] = useState(generateNormalizedPercentLoaded(percentLoaded));
    const [normalizedFontSize, setNormalizedFontSize] = useState(mapNormalizedFontSize());
    const [showAnimationElements, setShowAnimationElements] = useState(true);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if(!started && percentLoaded === 100) {
            setShowAnimationElements(false);
        } else {
            if(!started) setStarted(true);
            setNormalizedPercentLoaded(generateNormalizedPercentLoaded(percentLoaded));
        }

    }, [percentLoaded, started])

    useEffect(() => {
        const resizeListener = () => {
            setNormalizedFontSize(mapNormalizedFontSize());
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
        return <Typed
            strings={[
                'serverless guru',
                'animal lover',
                'aws developer',
                'pc builder',
                'software engineer',
                'breaker of chains'
            ]}
            typeSpeed={40}
            backSpeed={50}
            ref={typedRef}
            className={`${styles.typed_target} ${styles.gineos_medium}`}
            loop >
            <span ref={typedRef} id="typedTarget"></span>
        </Typed>
    }

    const triggerLoadingCompleted = () => {
        setShowAnimationElements(false);
        loadingCompleted();
    }

    const [ balloonY, setBalloonY ] = useState('56px');

    const updateBalloonY = (newBalloonY) => {
        setBalloonY(newBalloonY);
    }

    const isSafari = () => {
        var ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('chrome') === -1) {
            return true
        }

        return false;
    }

    return (
        <ParticlesLanding>
            {
                <Spring delay={0} to={{ opacity: !showAnimationElements ? 1 : 0 }}>
                    {({opacity}) =>
                        <div className={styles.typed_container}>
                            <h1 className={`${styles.gineos_medium} ${styles.ninety_text}`} style={{ fontSize: `${normalizedFontSize}`}}>
                                <span  style={{opacity}}>
                                    {renderTyped()}
                                    <span style={{ verticalAlign: 'middle', color: 'grey', fontSize: '18px', fontFamily: 'Spartan, sans-serif', display: 'inline-block', marginTop: '5px'}}>
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
                !isSafari() && window.navigator.connection.effectiveType !== "4g"
                ? null
                : <>
                    <Balloon animationCompleted={!showAnimationElements} percent={percentLoaded} trackBalloonY={(newBalloonY) => updateBalloonY(newBalloonY)} />
                    <Jordan animationCompleted={!showAnimationElements} balloonY={balloonY} percent={percentLoaded} completeCallback={triggerLoadingCompleted} />
                </>
            }
                <Spring delay={0} to={{ opacity: !showAnimationElements ? 1 : 0 }}>
                    {({opacity}) =>
                        <div style={{opacity}} className={styles.nav_container}>
                            <p onClick={() => updateBodyType(landingStates.PROJECTS)} className={styles.landing_nav_link}>Recent Work</p>
                            <p onClick={() => window.open('https://jordanmax.medium.com/')} className={styles.landing_nav_link}>Blog</p>
                        </div>
                    }
                </Spring>
        </ParticlesLanding>
    )
}

export default Landing;