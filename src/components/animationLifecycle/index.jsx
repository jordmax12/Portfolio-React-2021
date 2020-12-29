import React, { useState, useEffect } from 'react';

const AnimationLifecycle = ({ match, whenToRender, component: Component, ...rest }) => {
  const [showComponent, setShowComponent] = useState(whenToRender(match));
  const [startPageEndAnimation, setStartPageEndAnimation ] = useState(false);
  console.log('logging match', match)
  useEffect(() => {
    if (whenToRender(match)) {
      setShowComponent(true)
    } else if (showComponent) {
      setStartPageEndAnimation(true);
    }

  }, [match, whenToRender, showComponent])

  const onPageAnimationEnd = () => {
    setShowComponent(false);
    setStartPageEndAnimation(false)
  }

  return (
    showComponent && (
      <Component
        match={match}
        startPageEndAnimation={startPageEndAnimation}
        onPageAnimationEnd={onPageAnimationEnd}
        {...rest}
      />
    )
  )
}
 
export default AnimationLifecycle;