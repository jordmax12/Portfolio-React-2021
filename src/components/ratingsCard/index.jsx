import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import reactIcon from '../../assets/images/technology/react-tech-icon.png';
import npmIcon from '../../assets/images/technology/npm-tech-icon.png';
import awsIcon from '../../assets/images/technology/aws-tech-icon.png';
import nodejsIcon from '../../assets/images/technology/nodejs-tech-icon.png';
import pythonIcon from '../../assets/images/technology/python-tech-icon.png';
import styles from "./styles.module.scss";

const calculateValues = (x, y) => [
  -(y - window.innerHeight / 2) / 40,
  (x - window.innerWidth / 2) / 40,
  1.1
];

const inverseOpacity = o => 1 - o;
const inverseTransform = t => `${t} rotateY(180deg)`;

const iconMapper = tech_id => {
  switch(tech_id) {
    case 'react':
      return reactIcon
    case 'npm':
      return npmIcon
    case 'aws':
      return awsIcon
    case 'nodejs':
      return nodejsIcon
    case 'python':
      return pythonIcon
    default:
      return null;
  }
}

export const RatingsCard = ({ title, stack, externals, initProjectDetails, description, props: main_props }) => {
  const [selected, setSelected] = useState(false);
  
  // TODO: look into this props
  const [props, set] = useSpring(() => ({
    state: [0, 0, 1]
  }));

  // console.log('logging props', props)

  const { opacity, transform } = useSpring({
    config: {
      friction: 22,
      tension: 500
    },
    opacity: selected ? 1 : 0,
    transform: `rotateY(${selected ? 180 : 0}deg)`
  });

  const handleViewMore = (e, project_title) => {
    e.stopPropagation()
    initProjectDetails(externals);
  }
  return (
    <>
    <animated.div
      className={styles.RatingsCard}
      props={props}
      onClick={() => setSelected(!selected)}
      onMouseLeave={() => set({ state: [0, 0, 1] })}
      onMouseMove={({ clientX: x, clientY: y }) =>
        set({ state: calculateValues(x, y) })
      }
      style={main_props}
    >
      <animated.div
        className={styles.RatingsCardBack}
        style={{
          opacity,
          zIndex: selected ? 100 : 0,
          transform: transform.interpolate(inverseTransform)
        }}
      >
        <div className={styles.backContainer}>
            <div className={styles.descriptionContainer}>
              <p className={styles.descriptionText}>{description}</p>
            </div>
            {externals.length > 0 && 
              <div>
                <p onClick={(e) => handleViewMore(e, title)} className={styles.ratingsLink}>View More</p>
              </div>
            }
        </div>

      </animated.div>
      <animated.div
        className={styles.RatingsCardFront}
        style={{
          opacity: opacity.interpolate(inverseOpacity),
          zIndex: selected ? 0 : 100,
          textAlign: 'center',
          transform
        }}
      >
        <div className={styles.techContainer}>
          <p className={styles.ratingsLink}>{title}</p>
          <div>
            <div className={styles.stackContainer}>
              {
                stack.map(s => {
                  return <img alt="tech-logo" className={styles.logo} src={iconMapper(s)} />
                })
              }
            </div>
          </div>
        </div>
      </animated.div>
    </animated.div>
    </>
  );
};

export default RatingsCard;
