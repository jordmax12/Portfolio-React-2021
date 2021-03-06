import React, { useState, useEffect } from "react";
import RatingsCard from "../ratingsCard";
import { animated,  useTransition } from "react-spring";

export const Gallery = (props) => {
  const { projects, initProjectDetails } = props;
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(projects)
  }, [projects])

  const transitions = useTransition(cards, card => card.key, {
    from: { transform: "translate3d(0,-4000px,0)", opacity: 0, display: 'inline-block', padding: '10px' },
    enter: { transform: "translate3d(0,0px,0)", opacity: 1, display: 'inline-block', padding: '10px' },
    leave: { transform: "translate3d(0,-4000px,0)", opacity: 0, display: 'inline-block', padding: '10px' },
    config: {
      duration: 800
    }
  });

  return (
    <div style={{maxWidth: '830px', marginRight: 'auto', marginLeft: 'auto'}}>
        {transitions.map(({ item, key, props }) =>
            item && <animated.div key={key} style={props}>
              <RatingsCard key={key} {...item} initProjectDetails={initProjectDetails}  />
            </animated.div>
          )}
    </div>
  );
};

export default Gallery;
