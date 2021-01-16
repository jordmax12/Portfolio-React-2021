import React, { useState, useEffect } from 'react';
import styles from './marioSquare.module.scss';
import { animationFrameTimeout } from '../../assets/utils';
import { Spring } from "react-spring/renderprops";

const MarioSquare = (props) => {
    const { percent, animationCompleted } = props;
    const [blockImgStyles, setBlockImgStyles] = useState(styles.marioSquare);
    const [show, setShow] = useState(true);
    useEffect(() => {
        if(animationCompleted && show) {
            setShow(false);
        }
    }, [animationCompleted])

    useEffect(() => {
        if(percent === 100) {
            animationFrameTimeout(() => {
                setBlockImgStyles(styles.activeMarioSquare)
            }, 2200)
        }
    }, [percent])
    return (
        <Spring delay={100} to={{ opacity: show ? 1 : 0 }}>
            {({opacity}) => <div style={{opacity}} className={blockImgStyles} /> }
        </Spring>
        
    )
}

export default MarioSquare;