import React, { useEffect, useState } from 'react';
import styles from './jordan.module.scss';
import jordanWithRope from '../../assets/images/jordan/jordan-with-rope.png'
import jordanFalling from '../../assets/images/jordan/jordan-falling.png'
import jordanStanding from '../../assets/images/jordan/jordan-standing.png'
import jordanInAir from '../../assets/images/jordan/jordan-in-air.png'
import { animationFrameTimeout } from '../../assets/utils';

const Jordan = (props) => {
    const { percent, balloonY, completeCallback, animationCompleted } = props;
    const [jordanClasses, setJordanClasses] = useState(`${styles.jordan_box} ${styles.start}`);
    const [jordanImage, setJordanImage] = useState(jordanWithRope);
    const [jordanY, setJordanY] = useState(balloonY - 94);
    const [jordanStyle, setJordanStyle] = useState({ bottom: `${jordanY}px`});
    const [show, setShow] = useState(true);
    const [started, setStarted] = useState(false);

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if(animationCompleted && show) {
            setShow(false);
        }
    }, [animationCompleted])

    
    useEffect(() => {
        if(!started && percent === 100) {
            setJordanImage(jordanStanding);
        } else {
            if(!started) setStarted(true);

            setJordanY(balloonY - 94);
    
            if(percent > 0) {
                setJordanStyle({ bottom: `${balloonY - 114}px` });
            } else {
                setJordanStyle({ bottom: `${balloonY - 94}px` });
            }
            
            if(percent > 0 && percent < 100) {
                setJordanClasses(`${styles.jordan_box} ${styles.inair}`);
                setJordanImage(jordanInAir);
            }
    
            if(percent === 100) {
                animationFrameTimeout(() => {
                    setJordanStyle({})
                    setJordanClasses(`${styles.jordan_box} ${styles.reverse}`);
                    setJordanImage(jordanFalling);
                    animationFrameTimeout(() => {
                        setJordanImage(jordanStanding);
                        animationFrameTimeout(() => {
                            completeCallback();
                        }, 500);
                    }, 1900)
                }, 100)
            }
        }
    }, [percent, balloonY])
    /* eslint-enable react-hooks/exhaustive-deps */
    return (
        <img src={jordanImage} className={jordanClasses} style={{...jordanStyle}} alt="jordan" />
    )
}

export default Jordan;