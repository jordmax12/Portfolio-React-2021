import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

import styles from "./styles.module.scss";

const calculateValues = (x, y) => [
  -(y - window.innerHeight / 2) / 40,
  (x - window.innerWidth / 2) / 40,
  1.1
];

const inverseOpacity = o => 1 - o;
const inverseTransform = t => `${t} rotateY(180deg)`;

export const RatingsCard = ({ title, rating, props: main_props }) => {
  const [selected, setSelected] = useState(false);
  // TODO: look into this props
  const [props, set] = useSpring(() => ({
    state: [0, 0, 1]
  }));
  console.log('TODO: look into this props', props);
  const { opacity, transform } = useSpring({
    config: {
      friction: 22,
      tension: 500
    },
    opacity: selected ? 1 : 0,
    transform: `rotateY(${selected ? 180 : 0}deg)`
  });

  return (
    <animated.div
      className={styles.RatingsCard}
      onClick={() => setSelected(!selected)}
      onMouseLeave={() => set({ state: [0, 0, 1] })}
      onMouseMove={({ clientX: x, clientY: y }) =>
        set({ state: calculateValues(x, y) })
      }
      style={main_props}
    >
      <animated.div
        className={styles.RatingsCardFront}
        style={{
          opacity: opacity.interpolate(inverseOpacity),
          textAlign: 'center',
          transform
        }}
      >
        {title}
      </animated.div>
      <animated.div
        className={styles.RatingsCardBack}
        style={{
          opacity,
          transform: transform.interpolate(inverseTransform)
        }}
      >
      </animated.div>
    </animated.div>
  );
};

export default RatingsCard;
