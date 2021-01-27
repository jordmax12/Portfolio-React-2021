import React, { memo } from "react";
import styles from "./index.module.scss";
import Bg from "./bg";
import { useTransition, animated, config } from 'react-spring';


// need to redo this, look at modules/timeline, and look how he does the background animation.
// lets de-engineer and learn from this. 
// construct a component that transitions background, maybe accepts the animation as a prop. 

const BackgroundAnimator = ({ triggerBg, isFullScreen = true, showDescription = true, clientX = 0, clientY = 0, isFirstTime = true, children }) => {
  console.log('here?1')
  const containerTransition = useTransition(isFullScreen, null, {
    from: {
      opacity: isFirstTime? 1 : 0,
      // transform: isFirstTime ? 'scaleY(1)': 'scaleY(0.07)',
      background: isFirstTime ? '#222831' : '#333333',
    },
    enter: {
      opacity: 1,
      // transform: 'scaleY(1)',
      background: '#222831',
    },
    leave: {
      opacity: 0,
      // transform: 'scaleY(0.07)',
      background: '#333333',
    },
    config: isFullScreen ? config.default: config.slow
  });
  console.log(isFullScreen);
  const backgroundAnimatorTransition = useTransition(triggerBg, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    containerTransition.map(({ item: containerItem, props: transitionProps }) => (
      containerItem && (
        <animated.div
          key='header-container'
          style={transitionProps}
          className={styles.header_container}
        >
          {
            backgroundAnimatorTransition.map(({ item: backgroundItem, props: backgroundProps }) => (
              backgroundItem && (
                <animated.div
                  key='background'
                  style={backgroundProps}
                  className={styles.header_background_container}
                >
                  <Bg clientX={clientX} clientY={clientY}>
                    {children}
                  </Bg>
                  
                </animated.div>
              )
            ))
          }
        </animated.div>
      )
    ))
  );
}

export default memo(BackgroundAnimator);
