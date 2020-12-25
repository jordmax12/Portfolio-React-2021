// import logo from '../logo.svg';
import TimelineSelector from '../../components/timelineSelector'
import { useState, useEffect } from 'react'
import { getImagePosition, getBackgroundTransition, random, parseNewLine } from '../../helpers/helper';
import reactIcon from '../../assets/images/technology/react-tech-icon.png';
import npmIcon from '../../assets/images/technology/npm-tech-icon.png';
import awsIcon from '../../assets/images/technology/aws-tech-icon.png';
import nodejsIcon from '../../assets/images/technology/nodejs-tech-icon.png';
import pythonIcon from '../../assets/images/technology/python-tech-icon.png';
import { projects } from '../../assets/utils/projects';
import Gallery from '../../components/gallery'
import styles from "./projects.module.scss";
import Div from "../../components/div";
import find from "lodash/find";
import { Transition, Spring } from "react-spring/renderprops";
import techDoodleImage from "../../assets/images/backgrounds/tech-doodle-background-image.png";

const techList = [
  {
    id: 'nodejs',
    name: 'NodeJS',
    firstLogo: nodejsIcon,
    backgroundImage: nodejsIcon,
    description: `I have the most as well as recent experience in React compared to other technology in my list. I have created and architected web projects from scratch as well as jumped on ongoing projects.
    <br/><br/>I am familiar with recent techniques and libraries used in react like code-splitting, Hooks, React-Router, Final-Form, Redux, Redux-api-middleware, css in js, etc.`,
    projects: ['snapteam', 'nykaa', 'wakency'],
  },
  {
    id: 'aws',
    name: 'AWS',
    firstLogo: awsIcon,
    backgroundImage: awsIcon, //but recently have not touched on Android development so have to freshen up a bit on it.
    description: `I started my development journey with Android and have the most experience in it along with React.<br/><br/>
    I have complete lifecycle experience on Android app developement from creating to publishing and managing, and have experience with needed android libraries which includes: Retrofit, Dagger, Picasso, ActiveAndroid, etc.`,
    projects: ['vc_music_player', 'measure']
  },
  {
    id: 'npm',
    name: 'NPM',
    firstLogo: npmIcon,
    backgroundImage: npmIcon,
    description: `I have created and published a React-Native app for iOS and Android so i am familiar with its lifecycle, while working with React-Native CLI.<br/><br/>
    I have contributed some bug fixes to some open source React-Native libraries during my period developing on react native.
    `,
    projects: ['lighthouse', 'pulse']
  },
  {
    id: 'react',
    name: 'React',
    firstLogo: reactIcon,
    backgroundImage: reactIcon,
    description: `I have a bit of experience in Laravel and backend development although have not created any project from scratch but have worked on seperate modules and features.<br/><br/>
    I am familiar with backend development and the frameworks features like: MVC architecture, HTML template engine (blade), Eloquent ORM, Artisan and Seeders.`,
    projects: ['benefactory', 'snapteam']
  },
  {
    id: 'python',
    name: 'Python',
    firstLogo: pythonIcon,
    backgroundImage: pythonIcon,
    description: 'I have experience in creating an electron app with the help of React while also considering platform specific technicalities during development like, Desktop/Web notifications, screen routing, storage.<br/><br/>Written configurations to bundle Web app and Electron app seperatly for both.',
    projects: ['snapteam']
  }
];



const Projects = (props) => {
  const [isFirstAnimation, setIsFirstAnimation] = useState(false)
  const [selectedTechId, setSelectedTechId] = useState('nodejs')
  const [matchedProjects, setMatchedProjects] = useState(projects)
  const [changeProjects, setChangeProducts] = useState(false);
  const [imageAlignment, setImageAlignment] = useState(random(0, 3))
  const [imagePosition, setImagePosition] = useState(getImagePosition(selectedTechId, imageAlignment))
  const [backgroundTransition, setBackgroundTransition] = useState(getBackgroundTransition(
    selectedTechId,
    imageAlignment,
    isFirstAnimation
  ))
  const [techTransitionAnimation, setTechTransitionAnimation] = useState({
    nodejs: {
      ...backgroundTransition,
      imagePosition
    }
  })

  useEffect(() => {
    if (changeProjects) {
      const build_projects = []
      setChangeProducts(false)
      projects.forEach(p => {
        if (p.stack.includes(selectedTechId))
          build_projects.push(p);
      })

      console.log('logging build_projects', build_projects)
      setMatchedProjects(build_projects)
    }
  }, [changeProjects])

  useEffect(() => {
    console.log('tech changed')
    setMatchedProjects([]);
    setChangeProducts(true)
    //   console.log('inside callback?')
    //   projects.forEach(p => {
    //     if (p.stack.includes(selectedTechId))
    //       build_projects.push(p);
    //   })

    //   console.log('logging build_projects', build_projects)
    //   setMatchedProjects(build_projects)
    // })
  }, [selectedTechId])

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
            <div className="col-10">
              <div className="gallery_container">
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
                      const isReactRelated = tech.id == "react"
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
              </div>
              <Gallery
                projects={matchedProjects} />
            </div>
          </div>
        </div>
      </Div>
    </div>

  );
}

export default Projects;
