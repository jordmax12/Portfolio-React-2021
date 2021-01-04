import React, { useState } from 'react';
// import styles from './landing.module.scss';
// import { landingStates } from '../../assets/utils'
import Balloon from '../../components/loader/balloon';
import MarioSquare from '../../components/marioSquare';
import Jordan from '../../components/jordan';

const Landing = (props) => {
    const { pageState, percentLoaded } = props;
    const [ balloonY, setBalloonY ] = useState('56px');
    console.log('logging pageState', pageState);
    return (
        <>
            {
                <>
                    <Balloon percent={percentLoaded} text={'Loading...'} trackBalloonY={setBalloonY} />
                    <Jordan balloonY={balloonY} percent={percentLoaded} />
                    <MarioSquare percent={percentLoaded} />
                </>
            }
            { percentLoaded === 100 && (
                <div>
                    <p style={{ color: 'pink', fontSize: '2em'}}>HELLO LANDING PAGE!</p>
                </div>
            )}
        </>
    )
}

export default Landing;