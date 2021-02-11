import React, { useState, useEffect, useRef } from 'react';
import styles from './landing.module.scss';
import Typed from 'react-typed';
import { Spring } from "react-spring/renderprops";
import Balloon from '../../components/balloon';
import Jordan from '../../components/Jordan';
import { landingStates } from '../../assets/utils';
import ParticlesLanding from '../../components/particlesLanding';

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

    useEffect(() => {
        console.log('logging percentLoaded', percentLoaded)
        setNormalizedPercentLoaded(generateNormalizedPercentLoaded(percentLoaded));
    }, [percentLoaded])

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

    return (
        <ParticlesLanding>
            {
                <Spring delay={0} to={{ opacity: !showAnimationElements ? 1 : 0 }}>
                    {({opacity}) =>
                        <div className={styles.typed_container}>
                            <h1 className={`${styles.gineos_medium} ${styles.ninety_text}`} style={{ fontSize: `${normalizedFontSize}`}}>
                                <span  style={{opacity}}>
                                    {renderTyped()}
                                    <span style={{ verticalAlign: 'middle', color: 'grey', fontSize: '18px', fontFamily: 'Spartan, sans-serif'}}>
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
                window.navigator.connection.effectiveType !== "4g"
                ? null
                : <>
                    <Balloon percent={percentLoaded} trackBalloonY={(newBalloonY) => updateBalloonY(newBalloonY)} />
                    <Jordan animationCompleted={!showAnimationElements} balloonY={balloonY} percent={percentLoaded} completeCallback={triggerLoadingCompleted} />
                </>
            }
                <Spring delay={0} to={{ opacity: !showAnimationElements ? 1 : 0 }}>
                    {({opacity}) =>
                        <div style={{opacity}} className={styles.nav_container}>
                            <p onClick={() => updateBodyType(landingStates.PROJECTS)} className={styles.landing_nav_link}>Projects</p>
                            <p className={styles.landing_nav_link}>Resume</p>
                            <p onClick={() => updateBodyType(landingStates.BLOG)} className={styles.landing_nav_link}>Blog</p>
                        </div>
                    }
                </Spring>
        </ParticlesLanding>
    )
}

export default Landing;