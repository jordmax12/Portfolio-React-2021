import React, { useState, useEffect } from "react";
import styles from './balloon.module.scss';
import { Spring } from "react-spring/renderprops";

const Balloon = (props) => {
    const { percent, trackBalloonY, triggerConfetti } = props;
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
        const _y = Math.ceil(percent * 5) + 110;
        trackBalloonY(_y);
        return _y;
    }

    const [balloonWidth, setBalloonWidth] = useState(findWidth());
    const [balloonHeight, setBalloonHeight] = useState(findHeight());
    const [balloonY, setBalloonY] = useState(findBalloonY());
    const [balloonClass, setBalloonClass] = useState(styles.balloon);
    const [confettiActive, setConfettiActive] = useState(false);
    const [trigger, setTrigger] = useState(false);
    // const [animationCompleted, setAnimationCompleted] = useState(false);

    useEffect(() => {
        setBalloonHeight(findHeight());
        setBalloonWidth(findWidth());
        setBalloonY(findBalloonY());
        if(percent >= 100) {
            setTimeout(() => {
                setConfettiActive(true);
                setTrigger(true);
                // setBalloonClass('trigger');
                // setBalloonHeight(0);
                // setBalloonWidth(0);
                triggerConfetti();
                setTimeout(() => {
                    // setBalloonClass('dn');
                    
                }, 3000)
            }, 600)

        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [percent])



    return (
        <Spring delay={0} to={{ opacity: !trigger ? 1 : 0 }}>
            {({opacity}) =>
                <div className={balloonClass} style={{ opacity, lineHeight: `${balloonHeight}px`, height: `${balloonHeight}px`, width: `${balloonWidth}px`, bottom: `${balloonY}px`}}>
                    {/* <h5 style={{ color: 'white', display: confettiActive ? 'none': 'inline-block', lineHeight: '1', verticalAlign: 'middle'}}>{percent}% Loading...</h5> */}
                </div>
            }
        </Spring>
    )
}

export default Balloon;
