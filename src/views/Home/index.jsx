import React, { useState } from 'react';
import { landingStates } from '../../assets/utils'
import { Transition } from "react-spring/renderprops";
import styles from './landing.module.scss'
import Projects from "../Projects"
import Blog from "../Blog";
import Div from '../../components/div'

const Home = (props) => {
  const [previousBodyType, setPreviousBodyType] = useState(landingStates.NONE);
  const [bodyType, setBodyType] = useState(landingStates.NONE);
  let fromAnimation, enterAnimation, leaveAnimation;

  const updateBodyType = bodyType => {
    setPreviousBodyType(previousBodyType);
    setBodyType(bodyType);
  };

  const getBodyContent = (bodyType, screenSize) => {
    // const showMobile = screenSize === 'sm' || screenSize === 'md';
    const showMobile = false;

    return (
      props => (
        <Div
          fillParent
          style={props}
          className={styles.body_content_container}
        >
          {bodyType == landingStates.PROJECTS && ( <Projects /> )}
          {/* {bodyType == landingStates.RESUME && (showMobile ? <TimelineMobile updateBodyType={this.updateBodyType} /> :  <Timeline />)} */}
          {bodyType == landingStates.BLOG && ( <Blog />)}
        </Div>
      )
    )
  }

  if (
    previousBodyType == landingStates.NONE ||
    bodyType == landingStates.NONE
  ) {
    fromAnimation = {
      opacity: 1,
      transform: "translate(0px, 100px)"
    };
    enterAnimation = {
      opacity: 1,
      transform: "translate(0px, 0px)"
    };
    leaveAnimation = {
      opacity: 0,
      transform: "translate(0px, 100px)"
    };
  } else if (bodyType == landingStates.TIMELINE) {
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
  } else if (bodyType == landingStates.PROJECT) {
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
    <Div fillParent className={styles.body_container}>
      <Transition
        items={bodyType}
        key={bodyType => bodyType}
        from={fromAnimation}
        enter={enterAnimation}
        leave={leaveAnimation}
        config={{
          delay: previousBodyType == landingStates.NONE ? 500 : 0
        }}
      >
        {bodyType => getBodyContent(bodyType, 0)}
        {/* <p style={{ fontColor: 'pink', fontSize: '19px'}}> HELLO WORLD </p> */}
      </Transition>
  </Div>
  )
}

export default Home