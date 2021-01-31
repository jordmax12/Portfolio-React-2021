import TimelineSelector from '../../components/timelineSelector'
import { useState, useEffect } from 'react'
import { getImagePosition, getBackgroundTransition, random } from '../../helpers/helper';
import { projects } from '../../helpers/projectsConstants';
import Gallery from '../../components/gallery';
import BackgroundAnimator from '../../components/backgroundAnimator';
import styles from "./projects.module.scss";
import Div from "../../components/div";
import find from "lodash/find";
import { Transition, Spring } from "react-spring/renderprops";
import { technologies } from '../../helpers/projectsConstants';
import ParticlesProjects from '../../components/particlesProjects';

const Projects = () => {
  const [selectedTechId, setSelectedTechId] = useState('nodejs')
  const [matchedProjects, setMatchedProjects] = useState(projects)
  const [changeProjects, setChangeProducts] = useState(false);
  const [show, setShow] = useState(false);
  // TODO: is the following needed? review.
  /* eslint-disable no-unused-vars */
  const [isFirstAnimation, setIsFirstAnimation] = useState(false)
  /* eslint-disable no-unused-vars */
  const [imageAlignment, setImageAlignment] = useState(random(0, 3))
  /* eslint-disable no-unused-vars */
  const [imagePosition, setImagePosition] = useState(getImagePosition(selectedTechId, imageAlignment))
  const [backgroundTransition, setBackgroundTransition] = useState(getBackgroundTransition(
    selectedTechId,
    imageAlignment,
    isFirstAnimation
  ))
  /* eslint-disable no-unused-vars */
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
      setTimeout(() => {
        setMatchedProjects(build_projects)
      }, 100)

      setTimeout(() => {
        setShow(true)
      }, 300)

    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [changeProjects])

  useEffect(() => {
    setMatchedProjects([]);
    setChangeProducts(true)
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

  const tech = find(technologies, techItem => {
    return techItem.id === selectedTechId;
  });
  return (
    <ParticlesProjects currentStack={selectedTechId}>
  <Transition
    items={show}
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
  >
    {
      show => show && (
        value => {
          return (
            <div style={{ width: '100%', height: '100%' }}>
              <Div row fillParent align="stretch" className={styles.timeline_container}>
                
                {/* <img alt="tech-logo" src={bgTest} className={styles.background_static_image} /> */}
                <div className="container">
                  <div className="row">
                    <div className="col-2">
                      <TimelineSelector
                        selectedId={selectedTechId}
                        listValue={technologies}
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
                              const fromAnimation = tech.id === selectedTechId ? from : enter;
                              const toAnimation = tech.id === selectedTechId ? enter : leave;
                              const isReactRelated = tech.id === "react"
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
                                          alt="background"
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
          )
        }
      )
    }
    
  </Transition>
  </ParticlesProjects>
  );
}

export default Projects;
