import React, { useState } from 'react'
import './App.scss';
import './assets/scss/simple-grid.scss'
import { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from './components/loader/loader'
// import AnimationLifecycle from './components/animationLifecycle';

const Header = React.lazy(() => import("./components/header"))
// const Projects = React.lazy(() => import("./views/Projects"));
const Home = React.lazy(() => import("./views/Home"));
// const Blog = React.lazy(() => import("./views/Blog"));

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
              {/* WORKING */}
              {/* <Header showHeader={showHeader} showHeaderWidth={showHeaderWidth} />
              <Loader updateHeaderWidth={updateHeaderWidth} showHeaderAfterLoader={showHeaderAfterLoader}>
                <Route
                  exact
                  path="/"
                  children={(props) => (
                    <AnimationLifecycle
                      component={Home}
                      whenToRender={(match) => match}
                      {...props}
                    />
                  )}
                /> */}
              {/* END WORKING */}
              {/* <Route
                  exact
                  path="/projects"
                  children={(props) => (
                    <AnimationLifecycle
                      component={Projects}
                      whenToRender={(match) => match}
                      {...props}
                    />
                  )}
                />
                <Route
                  exact
                  path="/blog"
                  children={(props) => (
                    <AnimationLifecycle
                      component={Blog}
                      whenToRender={(match) => match}
                      {...props}
                    />
                  )}
                /> */}
              {/* </Loader> */}
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
