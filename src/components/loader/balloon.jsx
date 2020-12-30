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
    const { percent } = props;
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

    const [balloonWidth, setBalloonWidth] = useState(findWidth());
    const [balloonHeight, setBalloonHeight] = useState(findHeight());
    const [balloonClass, setBalloonClass] = useState(styles.balloon);
    const [confettiActive, setConfettiActive] = useState(false);

    useEffect(() => {
        setBalloonHeight(findHeight());
        setBalloonWidth(findWidth());
        if(percent >= 100) {
            // setConfettiActive(true);
            // setBalloonClass('trigger');
            setTimeout(() => {
                // setBalloonClass('dn');
            }, confettiConfig.duration)
        }
    }, [percent])



    return (
        <div className={balloonClass} style={{ lineHeight: `${balloonHeight}px`, height: `${balloonHeight}px`, width: `${balloonWidth}px`}}>
            <h5 style={{display: confettiActive ? 'none': 'inline-block', lineHeight: '1', verticalAlign: 'middle'}}>{percent}% Loading...</h5>
            <Confetti active={confettiActive} config={ confettiConfig } />
        </div>
    )
}

export default Balloon;
