import React, { useState, useEffect } from "react";
import styles from './balloon.module.scss';
import { Spring } from "react-spring/renderprops";

const Balloon = (props) => {
    const { percent, trackBalloonY } = props;
    const findWidth = () => {
        const newWidth = 120 + Math.ceil(percent * 3.7);
        return newWidth;
    }
    
    const findHeight = () => {
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
    const [trigger, setTrigger] = useState(false);
    const [started, setStarted] = useState(false);
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if(!started) setStarted(true)

        // We have already loaded page, dont do anything or show balloon animation.
        if(!started && percent === 100) {
            setBalloonClass(styles.dn)
        } else {
            console.log('here')
            setBalloonHeight(findHeight());
            setBalloonWidth(findWidth());
            setBalloonY(findBalloonY());
            if(percent >= 100) {
                console.log('setting true')
                setBalloonClass(`${styles.balloon} ${styles.trigger}`);
                setTimeout(() => {
                    setTrigger(true);
                    setBalloonClass(`${styles.balloon} ${styles.trigger}`);
                }, 600)
            }
        }


    }, [percent])
    /* eslint-enable react-hooks/exhaustive-deps */


    return (
        <Spring delay={0} to={{ opacity: !trigger ? 1 : 0 }}>
            {({opacity}) =>                
                <div className={balloonClass} style={{ lineHeight: `${balloonHeight}px`, height: `${balloonHeight}px`, width: `${balloonWidth}px`, bottom: `${balloonY}px`}} />
            }
        </Spring>
    )
}

export default Balloon;
