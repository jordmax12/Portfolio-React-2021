import React, { useState } from 'react';
import { landingStates } from '../../assets/utils'
import { Transition } from "react-spring/renderprops";
import styles from './home.module.scss'
import Projects from "../Projects"
import Blog from "../Blog";
import Landing from "../Landing";

const Home = (props) => {
  const { percentLoaded, loadingCompleted } = props;
  const [previousBodyType, setPreviousBodyType] = useState(landingStates.NONE);
  const [bodyType, setBodyType] = useState(landingStates.NONE);
  let fromAnimation, enterAnimation, leaveAnimation;

  /* eslint-disable no-unused-vars */
  const updateBodyType = bodyType => {
    setPreviousBodyType(previousBodyType);
    setBodyType(bodyType);
  };

  const getBodyContent = bodyType => {
    return (
      props => {
        return (
          <div
            // style={props}
            className={styles.body_content_container}
          >
            {/* NEED TO SUPPLY PERCENT LOADED, look into Context see if we can utilize this instead */}
            {bodyType === landingStates.NONE && ( <Landing loadingCompleted={loadingCompleted} percentLoaded={percentLoaded} pageState={bodyType} /> )}
            {bodyType === landingStates.PROJECTS && ( <Projects /> )}
            {/* {bodyType == landingStates.RESUME && (showMobile ? <TimelineMobile updateBodyType={this.updateBodyType} /> :  <Timeline />)} */}
            {bodyType === landingStates.BLOG && ( <Blog />)}
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
      transform: "translate(0px, 0px)"
    };
  } else if (bodyType === landingStates.TIMELINE) {
    fromAnimation = {
      opacity: 0,
      transform: "translate(0px, 0px)"
    };
    enterAnimation = {
      opacity: 1,
      transform: "translate(0px, 0px)"
    };
    leaveAnimation = {
      opacity: 0,
      transform: "translate(0px, 0px)"
    };
  } else if (bodyType === landingStates.PROJECT) {
    fromAnimation = {
      opacity: 0,
      transform: "translate(0px, 0px)"
    };
    enterAnimation = {
      opacity: 1,
      transform: "translate(0px, 0px)"
    };
    leaveAnimation = {
      opacity: 0,
      transform: "translate(0px, 0px)"
    };
  }

  return (
    <div className={styles.home_container}>
      <Transition
        items={bodyType}
        key={bodyType => bodyType}
        from={fromAnimation}
        enter={enterAnimation}
        leave={leaveAnimation}
        config={{
          delay: previousBodyType === landingStates.NONE ? 500 : 0
        }}
      >
        {bodyType => getBodyContent(bodyType)}
      </Transition>
  </div>
  )
}

export default Home