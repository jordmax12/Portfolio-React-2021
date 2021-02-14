import React, { useState } from 'react';
import { landingStates } from '../../assets/utils'
import { Transition } from "react-spring/renderprops";
import styles from './home.module.scss'
import Projects from "../Projects"
import Blog from "../Blog";
import Landing from "../Landing";
import animations from './animations';

const initGoBackClass = `${styles.dn} ${styles.go_back}`;

const Home = (props) => {
  const { percentLoaded, loadingCompleted } = props;
  const [bodyType, setBodyType] = useState(landingStates.NONE);
  const [previousBodyType, setPreviousBodyType] = useState(bodyType);
  const [showGoBack, setShowGoBack] = useState(initGoBackClass)
  let fromAnimation, enterAnimation, leaveAnimation;

  /* eslint-disable no-unused-vars */
  const updateBodyType = _bodyType => {
    let goBackClass = initGoBackClass;
    if(_bodyType !== landingStates.NONE) {
      goBackClass= styles.go_back;
    }
    setShowGoBack(goBackClass);
    setPreviousBodyType(bodyType);
    setBodyType(_bodyType);
  };

  const goBackHandler = () => {
    updateBodyType(landingStates.NONE)
  }

  const getBodyContent = bodyType => {
    return (
      props => {
        return (
          <div
            style={props}
            className={styles.body_content_container}
          >
            {bodyType === landingStates.NONE && ( <Landing loadingCompleted={loadingCompleted} percentLoaded={percentLoaded} updateBodyType={updateBodyType} /> )}
            {bodyType === landingStates.PROJECTS && ( <Projects updateBodyType={updateBodyType} /> )}
            {/* {bodyType == landingStates.RESUME && (showMobile ? <TimelineMobile updateBodyType={this.updateBodyType} /> :  <Timeline />)} */}
            {bodyType === landingStates.BLOG && ( <Blog updateBodyType={updateBodyType} />)}
          </div>
        )
      } 
    )
  }

  if (
    previousBodyType === landingStates.NONE ||
    bodyType === landingStates.NONE
  ) {
    fromAnimation = animations.noneAnimations.fromAnimation
    enterAnimation = animations.noneAnimations.enterAnimation
    leaveAnimation = animations.noneAnimations.leaveAnimation
  } else if (bodyType === landingStates.BLOG) {
    fromAnimation = animations.blogAnimations.fromAnimation
    enterAnimation = animations.blogAnimations.enterAnimation
    leaveAnimation = animations.blogAnimations.leaveAnimation
  } else if (bodyType === landingStates.PROJECTS) {
    fromAnimation = animations.projectsAnimations.fromAnimation
    enterAnimation = animations.projectsAnimations.enterAnimation
    leaveAnimation = animations.projectsAnimations.leaveAnimation
  }
  return (
    <div className={styles.home_container}>
      <p className={showGoBack} onClick={goBackHandler}> {'<'} Go Back </p>
      <Transition
        items={bodyType}
        key={bodyType => bodyType}
        from={fromAnimation}
        enter={enterAnimation}
        leave={leaveAnimation}
        config={{
          delay: 0
        }}
      >
        {bodyType => getBodyContent(bodyType)}
      </Transition>
  </div>
  )
}

export default Home