import React, { useState } from "react";
import RatingsCard from "../ratings-card";
import { useSpring, animated,  useTransition, Spring } from "react-spring";
// import bezier from 'bezier-easing'
import "./gallery.css";

const get_number_inbetween = (min, max) => {
  return Math.floor(Math.random() * max) + (min)
}

export const Gallery = (props) => {
  const { projects } = props;
  console.log('logging projects', projects)
  const [cards, setCards] = useState(projects);
  console.log('logging cards????', cards);
  // const toggle_divs = () => {
  //   let test = [];
  //   setCards(
  //     test = projects.filter((x) => x.title == "enogen" || x.title == "agriedge")
  //   );
  //   setTimeout(() => {
  //     setCards(test);
  //   }, 800);
  // };

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
      <div style={{width: '100%'}}>
        {/* <button onClick={toggle_divs}>SHOW/HIDE</button> */}
      </div>
        {transitions.map(({ item, key, props }) =>
            item && <animated.div key={key} style={props}>
              <RatingsCard key={key} {...item}  />
            </animated.div>
          )}
    </div>
    
  );
};

export default Gallery;
