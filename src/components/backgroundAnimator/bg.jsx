import React, { Component, Fragment, memo } from 'react';
import styles from './bg.module.scss';
import { useSpring, animated, useTransition, config } from 'react-spring';
import image1 from '../../assets/images/backgrounds/Carbon.jpg';
import image2 from '../../assets/images/backgrounds/background-test.png';
// import backgroundDarkDoodleSecond from 'Images/background-dark-doodle-second-layer.png';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate(${x / 20}px,${y / 20}px)`;
const trans2 = (x, y) => `translate(${x / 15}px,${y / 15}px)`;
const trans3 = (x, y) => `translate(${x / 10}px,${y / 10}px)`;

const Bg = ({ clientX, clientY, children }) => {
  console.log(children)
  const animationProps = useSpring({ xy: calc(clientX, clientY), config: { mass: 10, tension: 550, friction: 240 } });
  return (
      <Fragment>
        <animated.div className={styles.background_image_layer} style={{ transform: animationProps.xy.interpolate(trans1), backgroundImage: `url(${image1})` }}>
          <div style={{ width: '100%', height: '100%', position: 'relative'}}>
            {children}
          </div>
        </animated.div>
        <animated.div className={styles.background_image_layer} style={{ transform: animationProps.xy.interpolate(trans2), backgroundImage: `url(${image2})` }}>
            <div style={{ width: '100%', height: '100%', position: 'relative'}}>
              {children}
            </div>
        </animated.div>
        {/* <animated.div className={styles.background_image_layer} style={{ transform: animationProps.xy.interpolate(trans3), backgroundImage: `url(${image2})` }}>
        </animated.div> */}
      </Fragment>
  )
}

export default memo(Bg);
