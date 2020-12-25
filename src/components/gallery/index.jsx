import React, { useState } from "react";
import RatingsCard from "../ratings-card";
import { useSpring, animated,  useTransition, Spring } from "react-spring";
// import bezier from 'bezier-easing'
import "./gallery.css";

const get_number_inbetween = (min, max) => {
  return Math.floor(Math.random() * max) + (min)
}

const projects = [
  {
    title: "simple-fs",
    key: '1',
    stack: [
      "npm",
      "nodejs"
    ]
  },
  {
    title: "serverless-generator",
    key: '2',
    stack: [
      "npm",
      "nodejs",
      "aws"
    ]
  },
  {
    title: "enogen",
    key: '3',
    stack: [
      "aws",
      "nodejs"
    ]
  },
  {
    title: "databus",
    key: '4',
    stack: [
      "python",
      "aws"
    ]
  },
  {
    title: "agriedge",
    key: '5',
    stack: [
      "nodejs"
    ]
  },
  {
    title: 'FCB AI',
    key: '6',
    stack: [
      "nodejs"
    ]
  }
]

export const Gallery = () => {
  const [cards, setCards] = useState(projects);

  const toggle_divs = () => {
    let test = [];
    setCards(
      test = projects.filter((x) => x.title == "enogen" || x.title == "agriedge")
    );
    setTimeout(() => {
      console.log('logging test', test);
      setCards(test);
    }, 800);
  };

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
        <button onClick={toggle_divs}>SHOW/HIDE</button>
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
