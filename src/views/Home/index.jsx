import React from 'react';
import { landingStates } from '../../assets/utils'
import { Transition } from "react-spring/renderprops";
import styles from './home.module.scss'
import Projects from "../Projects"
import Blog from "../Blog";
import Landing from "../Landing";
import animations from './animations';

const Home = (props) => {
  const { percentLoaded, loadingCompleted, bodyType, previousBodyType } = props;
  let fromAnimation, enterAnimation, leaveAnimation;

  const getBodyContent = bodyType => {
    return (
      props => {
        return (
          <div
            style={props}
            className={styles.body_content_container}
          >
            {bodyType === landingStates.NONE && ( <Landing loadingCompleted={loadingCompleted} percentLoaded={percentLoaded} /> )}
            {bodyType === landingStates.PROJECTS && ( <Projects /> )}
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