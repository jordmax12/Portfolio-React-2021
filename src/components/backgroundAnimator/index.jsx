import React, { Fragment, memo } from 'react';
import styles from './background_animator.module.scss';
import { useSpring, animated } from 'react-spring';
import backgroundTest from '../../assets/images/backgrounds/background-test.png'
import backgroundDarkDoodleFixed from '../../assets/images/backgrounds/background-dark-doodle-fixed-layer.png';
import backgroundDarkDoodleFirst from '../../assets/images/backgrounds/background-dark-doodle-first-layer.png';
import backgroundDarkDoodleSecond from '../../assets/images/backgrounds/background-dark-doodle-second-layer.png';

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2];
const trans1 = (x, y) => `translate(${x / 35}px,${y / 20}px)`;
const trans2 = (x, y) => `translate(${x / 15}px,${y / 15}px)`;
const trans3 = (x, y) => `translate(${x / 10}px,${y / 10}px)`;

const BackgroundAnimator = ({ clientX, clientY }) => {
  const animationProps = useSpring({ xy: calc(clientX, clientY), config: { mass: 10, tension: 550, friction: 240 } });
  return (
    <div className={styles.background_container}>
      {/* <animated.div className={styles.background_image_layer} style={{ transform: animationProps.xy.interpolate(trans1) }}>
      </animated.div> */}
      {/* <animated.img
        className={styles.background_image_layer}
        src={backgroundTest}
        style={{
        transform: animationProps.xy.interpolate(trans1)
        }}
        /> */}
      {/* <animated.div className={styles.background_image_layer} style={{ transform: animationProps.xy.interpolate(trans2), backgroundImage: `url(${backgroundTest})` }}>
      </animated.div>
      <animated.div className={styles.background_image_layer} style={{ transform: animationProps.xy.interpolate(trans3), backgroundImage: `url(${backgroundTest})` }}>
      </animated.div> */}
    </div>
  )
}

export default memo(BackgroundAnimator);
