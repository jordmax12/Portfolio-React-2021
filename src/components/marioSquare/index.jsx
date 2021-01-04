import React, { useState, useEffect } from 'react';
import styles from './marioSquare.module.scss';

const MarioSquare = (props) => {
    const { percent } = props;
    const [blockImgStyles, setBlockImgStyles] = useState(styles.marioSquare);
    useEffect(() => {
        if(percent === 100) {
            
            setTimeout(() => {
                setBlockImgStyles(styles.activeMarioSquare)
            }, 1600)
        }
    }, [percent])
    return (
        <>
            <div className={blockImgStyles} />
        </>
    )
}

export default MarioSquare;