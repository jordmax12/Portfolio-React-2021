import React, { useState, useEffect } from 'react';
import MarioSquareImg from '../../assets/images/jordan/mario-square.png';
import ActiveMarioSquareImg from '../../assets/images/jordan/active-mario-square.png';
import styles from './marioSquare.module.scss';

const MarioSquare = (props) => {
    const { percent } = props;
    // const [blockImg, setBlockImg] = useState(MarioSquareImg);
    const [blockImgStyles, setBlockImgStyles] = useState(styles.marioSquare);
    useEffect(() => {
        if(percent === 100) {
            
            setTimeout(() => {
                // setBlockImg(ActiveMarioSquareImg);
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