import React, { useState } from "react";
import RatingsCard from "../ratings-card";
import { useSpring, animated,  useTransition, Spring } from "react-spring";
// import bezier from 'bezier-easing'
import "./gallery.css";
// import image1 from "./image1.jpg";
// import image2 from "./image2.jpg";
// import image3 from "./image3.jpg";

const get_number_inbetween = (min, max) => {
  return Math.floor(Math.random() * max) + (min)
}

const test_1 = [
  {
    title: "simple-fs",
    key: '1'
  },
  {
    title: "serverless-generator",
    key: '2'
  },
  {
    title: "enogen",
    key: '3'
  },
  {
    title: "databus",
    key: '4'
  },
  {
    title: "agriedge",
    key: '5'
  },
  {
    title: 'FCB AI',
    key: '6'
  }
]

const test_2 = [
  {
    title: "other project",
    key: '7'
  },
  {
    title: "enogen",
    key: '3'
  },
  {
    title: "other project 3",
    key: '9'
  },
  {
    title: "agriedge",
    key: '5'
  },
  {
    title: "other project 5",
    key: '10'
  }
]

export const Gallery = () => {
  const [cards, setCards] = useState(test_1)

  console.log('logging cards', cards)

  const toggle_divs = () => {
    setCards(
      test_1.filter((x) => x.title == "enogen" || x.title == "agriedge")
    );
    setTimeout(() => {
      setCards(test_2);
    }, 800);
  };

  const transitions = useTransition(cards, card => card.key, {
    // config: {
    //   tension: 50,
    //   mass: 7,
    //   velocity: 3
    // },
    from: { transform: "translate3d(0,-4000px,0)", opacity: 0, display: 'inline-block', padding: '10px' },
    enter: { transform: "translate3d(0,0px,0)", opacity: 1, display: 'inline-block', padding: '10px' },
    leave: { transform: "translate3d(0,-4000px,0)", opacity: 0, display: 'inline-block', padding: '10px' },
    config: {
      duration: 800
    }
  });

  return (
    <div>
      <div style={{width: '100%'}}>
        <button onClick={toggle_divs}>SHOW/HIDE</button>
      </div>
      {/* <div className="Gallery"> */}
        {transitions.map(({ item, key, props }) =>
            item && <animated.div key={key} style={props}>
              <RatingsCard key={key} {...item}  />
              {/* {item.title} */}
            </animated.div>
          )}
        
      {/* </div> */}
    </div>
    
  );
};

// const test_1 = [
//   {
//     title: "project 1",
//     key: "1"
//   },
//   {
//     title: "project 2",
//     key: "2"
//   },
//   {
//     title: "project 3",
//     key: "3"
//   },
//   {
//     title: "project 4",
//     key: "4"
//   },
//   {
//     title: "project 5",
//     key: "5"
//   },
//   {
//     title: "project 6",
//     key: "6"
//   }
// ];

// const test_2 = [
//   {
//     title: "other project",
//     key: "7"
//   },
//   {
//     title: "project 3",
//     key: "3"
//   },
//   {
//     title: "other project 3",
//     key: "9"
//   },
//   {
//     title: "project 5",
//     key: "5"
//   },
//   {
//     title: "other project 5",
//     key: "11"
//   }
// ];

// export const Gallery = () => {
//   const [cards, setCards] = useState(test_1);

//   console.log("logging cards", cards);

//   const toggle_divs = () => {
//     setCards(
//       test_1.filter((x) => x.title == "project 3" || x.title == "project 5")
//     );
//     setTimeout(() => {
//       setCards(test_2);
//     }, 800);
//   };

//   const transitions = useTransition(cards, (card) => card.key, {
//     // config: {
//     //   tension: 50,
//     //   mass: 7,
//     //   velocity: 3
//     // },
//     from: { transform: "translate3d(-200px,0px,0)", opacity: 0 },
//     enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
//     leave: { transform: "translate3d(-200px,0px,0)", opacity: 0 },
//     config: {
//       duration: 800
//     }
//   });

//   return (
//     <div>
//       <div style={{ width: "100%" }}>
//         <button onClick={toggle_divs}>SHOW/HIDE</button>
//       </div>
//       <div className="App">
//         {transitions.map(
//           ({ item, key, props }) =>
//             item && (
//               <animated.div key={key} style={props}>
//                 {/* <RatingsCard {...item} /> */}
//                 {item.title}
//               </animated.div>
//             )
//         )}
//       </div>
//     </div>
//   );
// };

export default Gallery;
