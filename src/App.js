import React, { useState } from 'react';
import './App.scss';
import './assets/scss/simple-grid.scss';
import { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from './components/loader/loader';

const Header = React.lazy(() => import("./components/header"));
const Home = React.lazy(() => import("./views/home"));

function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [currentPercentLoaded, setCurrentPercentLoaded] = useState(0);

  const loadingCompleted = () => {
    setShowHeader(true);
  }

  const updateCurrentPercentLoaded = (percent) => setCurrentPercentLoaded(percent);

  return (
    <div className="App">
        <Router>
          <Suspense fallback={null}>
            <Switch>
              <Route path="/">
                <Header showHeader={showHeader} showHeaderWidth={currentPercentLoaded} />
                <Loader updateCurrentPercentLoaded={updateCurrentPercentLoaded}>
                  <Home percentLoaded={currentPercentLoaded} loadingCompleted={loadingCompleted} />
                </Loader>
              </Route>
            </Switch>
          </Suspense>
        </Router>
    </div>
  );
}

export default App;
