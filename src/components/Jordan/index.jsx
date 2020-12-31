import React, { useEffect, useState } from 'react';
import styles from './jordan.module.scss';
import jordanWithRope from '../../assets/images/jordan/jordan-with-rope.png'
import jordanFalling from '../../assets/images/jordan/jordan-falling.png'
import jordanStanding from '../../assets/images/jordan/jordan-standing.png'
const Jordan = (props) => {
    const { percent, balloonY } = props;
    const [jordanClasses, setJordanClasses] = useState(styles.JordanBox);
    const [jordanImage, setJordanImage] = useState(jordanWithRope);
    const [jordanY, setJordanY] = useState(balloonY - 94);
    const [jordanStyle, setJordanStyle] = useState({ bottom: `${jordanY}px`})
    useEffect(() => {
        console.log('logging balloonY', balloonY)
        setJordanY(balloonY - 94);
        setJordanStyle({ bottom: `${balloonY - 94}px` });
        if(percent === 100) {
            // setJordanClasses(`${styles.JordanBox} object`);
            setTimeout(() => {
                console.log("DROP NOW")
                setJordanStyle({})
                setJordanClasses(`${styles.JordanBox} reverse`);
                setJordanImage(jordanFalling);
                setTimeout(() => {
                    setJordanImage(jordanStanding)
                }, 1500)
            }, 3990)
        }
    }, [percent, balloonY])
    return (
        <img src={jordanImage} className={jordanClasses} style={jordanStyle} />
    )
}

export default Jordan;