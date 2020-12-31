import React, { useEffect, useState } from 'react';
import styles from './jordan.module.scss';

const Jordan = (props) => {
    const { percent } = props;
    const [jordanClasses, setJordanClasses] = useState(styles.JordanBox)
    useEffect(() => {
        if(percent === 100) {
            setJordanClasses(`${styles.JordanBox} object`);
            setTimeout(() => {
                console.log("DROP NOW")
                setJordanClasses(`${styles.JordanBox} reverse`);
            }, 3990)
        }
    }, [percent])
    return (
        <div className={jordanClasses}>

        </div>
    )
}

export default Jordan;