import reactStringReplace from 'react-string-replace';

export const random = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const parseNewLine = object => {
  //const regexNewLine=/@(\w+)/g
  const newLineMatch = (match, index, offset) => {
    return (<br key={index} />);
  }

  return reactStringReplace(object, "<br/>", newLineMatch)
}

// Component Specific Logic (used in technology page)
export const getImagePosition = (techType, imageAlignment, isMobile = false) => {
  let lowerRange = 15;
  // let higherRange = techType == 'android' ? 70 : 20;
  let higherRange =  20;

  if (isMobile) {
    // lowerRange = techType == 'android' ? 15 : 30;
    lowerRange = 30;
    // higherRange = techType == 'android' ? 70 : 35;
    higherRange =  35;
  }

  const imageLeft = random(lowerRange, higherRange);
  const imageTop = random(lowerRange, higherRange);

  // if (techType == "android") {
  //   switch (imageAlignment) {
  //     case 0:
  //       return {
  //         transform: "rotate(180deg)",
  //         left: `${imageLeft}vw`,
  //         top: 0
  //       };

  //     case 1:
  //       return {
  //         transform: "rotate(270deg)",
  //         top: `${imageTop}vh`,
  //         right: '-63px'
  //       };

  //     case 2:
  //       return {
  //         transform: "rotate(0deg)",
  //         left: `${imageLeft}vw`,
  //         bottom: 0
  //       };

  //     case 3:
  //       return {
  //         transform: "rotate(90deg)",
  //         left: '-63px',
  //         top: `${imageTop}vh`
  //       };
  //   }
  // }

  return {
    left: `${imageLeft}vw`,
    top: `${imageTop}vh`
  };
};




// Component Specific logic used in technology page
export const getBackgroundTransition = (techType, imageAlignment, isFirstAnimation) => {
  let transition = {};

  // if (
  //   techType == "react" ||
  //   techType == "react-native" ||
  //   techType == "electron"
  // ) {
  //   // transform and rotate are going to be used by image tag
  //   transition = {
  //     from: {
  //       opacity: 0,
  //       transform: "scale(0) rotate(360deg)"
  //     },
  //     enter: {
  //       opacity: 1,
  //       transform: "scale(1) rotate(0deg)"
  //     },
  //     leave: {
  //       opacity: 0,
  //       transform: "scale(0) rotate(360deg)"
  //     }
  //   };
  // } else if (techType == "android") {
  //   switch (imageAlignment) {
  //     case 0:
  //       transition = {
  //         from: {
  //           transform: "translate(0vw, -100vh)"
  //         },
  //         enter: { transform: "translate(0vw, 0vh)" },
  //         leave: { transform: "translate(0vw,-100vh)" }
  //       };
  //     break;
  //     case 1:
  //       transition = {
  //         from: { transform: "translate(100vw, 0vh)" },
  //         enter: { transform: "translate(0vw, 0vh)" },
  //         leave: { transform: "translate(100vw, 0vh)" }
  //       };
  //     break;
  //     case 2:
  //       transition = {
  //         from: { transform: "translate(0vw, 100vh)" },
  //         enter: { transform: "translate(0vw, 0vh)" },
  //         leave: { transform: "translate(0vw, 100vh)" }
  //       };
  //     break;
  //     case 3:
  //       transition = {
  //         from: {
  //           transform: "translate(-100vw, 0vh)"
  //         },
  //         enter: { transform: "translate(0vw, 0vh)" },
  //         leave: {
  //           transform: "translate(-100vw, 0vh)"
  //         }
  //       };
  //     break;
  //   }
  // }

  transition = {
    from: {
      opacity: 0,
      transform: "scale(0) rotate(360deg)"
    },
    enter: {
      opacity: 1,
      transform: "scale(1) rotate(0deg)"
    },
    leave: {
      opacity: 0,
      transform: "scale(0) rotate(360deg)"
    }
  };

  if (!transition.from) {
    transition = {
      from: { transform: "translate(0vw, -100vh)" },
      enter: { transform: "translate(0vw, 0vh)" },
      leave: { transform: "translate(0vw, -100vh)" }
    };
  }

  if (isFirstAnimation) {
    transition = {
      ...transition,
      from: transition.enter,
    }
  }

  return transition;
};