import React, { useState } from 'react';
import { landingStates } from '../../assets/utils'
import { Transition } from "react-spring/renderprops";
import styles from './home.module.scss'
import Projects from "../Projects"
import Blog from "../Blog";
import Landing from "../Landing";

const initGoBackClass = `${styles.dn} ${styles.go_back}`;

const Home = (props) => {
  const { percentLoaded, loadingCompleted } = props;
  const [previousBodyType, setPreviousBodyType] = useState(landingStates.NONE);
  const [bodyType, setBodyType] = useState(landingStates.NONE);
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
            {/* NEED TO SUPPLY PERCENT LOADED, look into Context see if we can utilize this instead */}
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
    fromAnimation = {
      opacity: 1,
      transform: "translate(0px, 0px)"
    };
    enterAnimation = {
      opacity: 1,
      transform: "translate(0px, 0px)"
    };
    leaveAnimation = {
      opacity: 0,
      transform: "translate(0px, 300px)"
    };
  } else if (bodyType === landingStates.BLOG) {
    fromAnimation = {
      opacity: 0,
      transform: "translate(-300px, 0px)"
    };
    enterAnimation = {
      opacity: 1,
      transform: "translate(0px, 0px)"
    };
    leaveAnimation = {
      opacity: 0,
      transform: "translate(300px, 0px)"
    };
  } else if (bodyType === landingStates.PROJECTS) {
    fromAnimation = {
      opacity: 0,
      transform: "translate(300px, 0px)"
    };
    enterAnimation = {
      opacity: 1,
      transform: "translate(0px, 0px)"
    };
    leaveAnimation = {
      opacity: 0,
      transform: "translate(-300px, 0px)"
    };
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