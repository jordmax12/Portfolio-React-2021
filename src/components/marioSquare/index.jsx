import React, { useState, useEffect } from 'react';
import styles from './marioSquare.module.scss';
import { animationFrameTimeout } from '../../assets/utils';


const MarioSquare = (props) => {
    const { percent } = props;
    const [blockImgStyles, setBlockImgStyles] = useState(styles.marioSquare);
    useEffect(() => {
        if(percent === 100) {
            console.log("PERCENT 100 IN MARIO SQUARE")
            animationFrameTimeout(() => {
                console.log("CHANGE STATE NOW 2")
                setBlockImgStyles(styles.activeMarioSquare)
            }, 2200)
        }
    }, [percent])
    return (
        <>
            <div className={blockImgStyles} />
        </>
    )
}

export default MarioSquare;