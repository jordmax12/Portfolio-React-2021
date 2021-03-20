import React, { useState } from 'react';
import './App.scss';
import './assets/scss/simple-grid.scss';
import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from './components/loader/loader';
import { landingStates } from './assets/utils'

const Header = React.lazy(() => import("./components/header"));
const Home = React.lazy(() => import("./views/Home"));

function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [currentPercentLoaded, setCurrentPercentLoaded] = useState(0);
  const [bodyType, setBodyType] = useState(landingStates.NONE);
  const [previousBodyType, setPreviousBodyType] = useState(bodyType);
  const loadingCompleted = () => {
    setShowHeader(true);
  }

  const updateCurrentPercentLoaded = (percent) => setCurrentPercentLoaded(percent);

  const homeButtonClickHandler = () => {
    goBackHandler();
  }

  const goBackHandler = () => {
    if (bodyType !== landingStates.NONE)
      updateBodyType(landingStates.NONE);
  }

  const updateBodyType = _bodyType => {
    setPreviousBodyType(bodyType);
    setBodyType(_bodyType);
  };

  return (
    <div className="App">
      <Router>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/">
              <Header homeButtonClickHandler={homeButtonClickHandler} showHeader={showHeader} showHeaderWidth={currentPercentLoaded} updateBodyType={updateBodyType} />
              <Loader updateCurrentPercentLoaded={updateCurrentPercentLoaded}>
                <Home bodyType={bodyType} previousBodyType={previousBodyType} updateBodyType={updateBodyType} percentLoaded={currentPercentLoaded} loadingCompleted={loadingCompleted} />
              </Loader>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
