import React from 'react';
import MarioSquareImg from '../../assets/images/jordan/mario-square.png';
import styles from './marioSquare.module.scss';

const MarioSquare = () => {
    return (
        <>
            <img src={MarioSquareImg} className={styles.marioSquare} />
        </>
    )
}

export default MarioSquare;