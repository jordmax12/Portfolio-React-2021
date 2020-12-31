import React, { useEffect, useState } from 'react';
import styles from './jordan.module.scss';
import jordanWithRope from '../../assets/images/jordan/jordan-with-rope.png'
import jordanFalling from '../../assets/images/jordan/jordan-falling.png'
import jordanStanding from '../../assets/images/jordan/jordan-standing.png'
const Jordan = (props) => {
    const { percent } = props;
    const [jordanClasses, setJordanClasses] = useState(styles.JordanBox)
    const [jordanImage, setJordanImage] = useState(jordanWithRope)
    useEffect(() => {
        if(percent === 100) {
            setJordanClasses(`${styles.JordanBox} object`);
            setTimeout(() => {
                console.log("DROP NOW")
                setJordanClasses(`${styles.JordanBox} reverse`);
                setJordanImage(jordanFalling)
                setTimeout(() => {
                    setJordanImage(jordanStanding)
                }, 1800)
            }, 3990)
        }
    }, [percent])
    return (
        <img src={jordanImage} className={jordanClasses} />
    )
}

export default Jordan;