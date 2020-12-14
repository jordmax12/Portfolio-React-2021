import logo from '../logo.svg';
import '../App.scss';
import TimelineSelector from './timelineSelector'
import { useState } from 'react'
import { getImagePosition, getBackgroundTransition, random, parseNewLine } from '../helpers/helper';
import reactIcon from '../assets/react-tech-icon.png';
import reactNativeIcon from '../assets/react-native-tech-icon.png';
import androidIcon from '../assets/android-tech-icon.png';
import laravelIcon from '../assets/laravel-tech-icon.png';
import electronIcon from '../assets/electron-tech-icon.png';
import reactBackgroundImage from '../assets/react-background-image.png';
import reactNativeBackgroundImage from '../assets/react-native-background-image.png';
import androidBackgroundImage from '../assets/android-background-image.png';
import laravelBackgroundImage from '../assets/laravel-background-image.png';
import electronBackgroundImage from '../assets/electron-background-image.png';

import Gallery from './gallery'
import styles from "./projects.module.scss";
import Div from "./div";
import find from "lodash/find";
import { Transition, Spring } from "react-spring/renderprops";
import RightContainer from "./rightContainer";
import techDoodleImage from "../assets/tech-doodle-background-image.png";

const techList = [
  {
    id: 'react',
    name: 'React',
    firstLogo: reactIcon,
    backgroundImage: reactBackgroundImage,
    description: `I have the most as well as recent experience in React compared to other technology in my list. I have created and architected web projects from scratch as well as jumped on ongoing projects.
    <br/><br/>I am familiar with recent techniques and libraries used in react like code-splitting, Hooks, React-Router, Final-Form, Redux, Redux-api-middleware, css in js, etc.`,
    projects: ['snapteam', 'nykaa', 'wakency'],
  },
  {
    id: 'android',
    name: 'Android',
    firstLogo: androidIcon,
    backgroundImage: androidBackgroundImage, //but recently have not touched on Android development so have to freshen up a bit on it.
    description: `I started my development journey with Android and have the most experience in it along with React.<br/><br/>
    I have complete lifecycle experience on Android app developement from creating to publishing and managing, and have experience with needed android libraries which includes: Retrofit, Dagger, Picasso, ActiveAndroid, etc.`,
    projects: ['vc_music_player', 'measure']
  },
  {
    id: 'react-native',
    name: 'React-Native',
    firstLogo: reactNativeIcon,
    backgroundImage: reactNativeBackgroundImage,
    description: `I have created and published a React-Native app for iOS and Android so i am familiar with its lifecycle, while working with React-Native CLI.<br/><br/>
    I have contributed some bug fixes to some open source React-Native libraries during my period developing on react native.
    `,
    projects: ['lighthouse', 'pulse']
  },
  {
    id: 'laravel',
    name: 'Laravel',
    firstLogo: laravelIcon,
    backgroundImage: laravelBackgroundImage,
    description: `I have a bit of experience in Laravel and backend development although have not created any project from scratch but have worked on seperate modules and features.<br/><br/>
    I am familiar with backend development and the frameworks features like: MVC architecture, HTML template engine (blade), Eloquent ORM, Artisan and Seeders.`,
    projects: ['benefactory', 'snapteam']
  },
  {
    id: 'electron',
    name: 'Electron',
    firstLogo: electronIcon,
    backgroundImage: electronBackgroundImage,
    description: 'I have experience in creating an electron app with the help of React while also considering platform specific technicalities during development like, Desktop/Web notifications, screen routing, storage.<br/><br/>Written configurations to bundle Web app and Electron app seperatly for both.',
    projects: ['snapteam']
  }
];



const Test = (props) => {
  const [isFirstAnimation, setIsFirstAnimation] = useState(false)
  const [selectedTechId, setSelectedTechId] = useState('react')
  const [imageAlignment, setImageAlignment] = useState(random(0,3))
  const [imagePosition, setImagePosition] = useState(getImagePosition(selectedTechId, imageAlignment))
  const [backgroundTransition, setBackgroundTransition] = useState(getBackgroundTransition(
      selectedTechId,
      imageAlignment,
      isFirstAnimation
  ))
  const [techTransitionAnimation, setTechTransitionAnimation] = useState({
    react: {
      ...backgroundTransition,
      imagePosition
    }
  })

  const onTechSelected = ({ selectedId }) => {
    const imageAlignment = random(0, 3);
    const imagePosition = getImagePosition(selectedId, imageAlignment);
    const backgroundTransition = getBackgroundTransition(
      selectedId,
      imageAlignment,
      isFirstAnimation,
    );
    setSelectedTechId(selectedId)
    setTechTransitionAnimation({
      ...techTransitionAnimation,
      [selectedId]: {
        ...backgroundTransition,
        imagePosition
      }
    })
  };

  const tech = find(techList, techItem => {
    return techItem.id == selectedTechId;
  });
  return (
    <div style={{ width: '100%', height: '100%' }}>
        <Div row fillParent align="stretch" className={styles.timeline_container}>
            <img src={techDoodleImage} className={styles.background_static_image} />
            {/* <div className={styles.left_background_gradient}></div> */}

            {/* <Div className={styles.left_container}> */}
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <TimelineSelector
                    selectedId={selectedTechId}
                    listValue={techList}
                    tech={tech}
                    onItemSelected={onTechSelected}
                />
                </div>
                <div className="col-2">
                  <Div className={styles.timeline_container}>
                    <Transition
                      items={tech}
                      keys={tech => tech.id}
                      from={{ opacity: 0 }}
                      enter={{ opacity: 1 }}
                      leave={{ opacity: 0 }}
                      >
                      {tech => tech.id && (
                          value => {
                          const { imagePosition, from, enter, leave } = techTransitionAnimation[tech.id];
                          const fromAnimation = tech.id == selectedTechId ? from : enter;
                          const toAnimation = tech.id == selectedTechId ? enter : leave;
                          const isReactRelated =
                              tech.id == "react" ||
                              tech.id == "react-native" ||
                              tech.id == "electron";

                          return (
                              <Spring
                              from={{
                                  opacity: isReactRelated ? fromAnimation.opacity : 1,
                                  transform: fromAnimation.transform,
                              }}
                              to={{
                                  opacity: isReactRelated ? toAnimation.opacity : 1,
                                  transform: toAnimation.transform,
                              }}
                              >
                              {
                                  props => (
                                  <Div
                                      style={{
                                      opacity: isReactRelated ? props.opacity : 1,
                                      transform: !isReactRelated ? props.transform : "unset"
                                      }}
                                      className={styles.background_image_container}
                                  >
                                      <img
                                      src={tech.backgroundImage}
                                      style={{
                                          left: 0,
                                          right: imagePosition.right,
                                          top: 0,
                                          bottom: imagePosition.bottom,
                                          transform: props.transform
                                      }}
                                      className={styles.background_image}
                                      ></img>
                                  </Div>
                                  )
                              }
                              </Spring>
                          )
                          }
                      )}
                      </Transition>
                  </Div>
                </div>
                <div className="col-8">
                    <Gallery />
                </div>
              </div>
            </div>
        </Div>
    </div>
    
  );
}

export default Test;
