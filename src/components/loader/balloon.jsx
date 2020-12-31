import React, { useState, useEffect, Fragment } from "react";
import styles from './balloon.module.scss';
import Confetti from 'react-dom-confetti';

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

const Balloon = (props) => {
    const { percent, trackBalloonY } = props;
    const findWidth = () => {
        // const newWidth = 120 + Math.ceil(percent * 1.7);
        const newWidth = 120 + Math.ceil(percent * 3.7);
        return newWidth;
    }
    
    const findHeight = () => {
        // const newHeight = 145 + Math.ceil(percent * 2.15);
        const newHeight = 145 + Math.ceil(percent * 4.15);
        return newHeight;
    }

    const findBalloonY = () => {
        const _y = Math.ceil(percent * 4) + 150;
        trackBalloonY(_y);
        return _y;
    }

    const [balloonWidth, setBalloonWidth] = useState(findWidth());
    const [balloonHeight, setBalloonHeight] = useState(findHeight());
    const [balloonY, setBalloonY] = useState(findBalloonY());
    const [balloonClass, setBalloonClass] = useState(styles.balloon);
    const [confettiActive, setConfettiActive] = useState(false);

    useEffect(() => {
        setBalloonHeight(findHeight());
        setBalloonWidth(findWidth());
        setBalloonY(findBalloonY());
        if(percent >= 100) {
            // 
            // setBalloonClass(`${styles.balloon} object`);
            setTimeout(() => {
                setConfettiActive(true);
                setBalloonClass('trigger');
                setTimeout(() => {
                    setBalloonClass('dn');
                }, confettiConfig.duration)
            }, 4000)
        }
    }, [percent])



    return (
        <div className={balloonClass} style={{ lineHeight: `${balloonHeight}px`, height: `${balloonHeight}px`, width: `${balloonWidth}px`, bottom: `${balloonY}px`}}>
            <h5 style={{display: confettiActive ? 'none': 'inline-block', lineHeight: '1', verticalAlign: 'middle'}}>{percent}% Loading...</h5>
            <Confetti active={confettiActive} config={ confettiConfig } />
        </div>
    )
}

export default Balloon;
