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
        // min width = 120
        // max width = 290
        const newWidth = 120 + Math.ceil(percent * 1.7);
        return newWidth;
    }
    
    const findHeight = () => {
        // min height = 145
        // max height = 360
        const newHeight = 145 + Math.ceil(percent * 2.15);
        return newHeight;
    }

    const [balloonWidth, setBalloonWidth] = useState(findWidth())
    const [balloonHeight, setBalloonHeight] = useState(findHeight())
    const [balloonClass, setBalloonClass] = useState(styles.balloon)

    useEffect(() => {
        setBalloonHeight(findHeight());
        setBalloonWidth(findWidth());
        if(percent >= 100) {
            setBalloonClass('dn')
            // setBalloonClass('dn')
        }
    }, [percent])



    return (
        <div className={balloonClass} style={{ height: `${balloonHeight}px`, width: `${balloonWidth}px`}}>
            <Confetti active={percent === 100} config={ confettiConfig } />
        </div>
    )
}

export default Balloon;
