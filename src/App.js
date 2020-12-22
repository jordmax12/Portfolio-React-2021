import React from 'react'
import logo from './logo.svg';
import './App.scss';
import './assets/scss/simple-grid.scss'
import { Suspense } from 'react'
// import Test from './components/test'
// import Projects from './views/Projects';
// import Home from './views/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Loader from './components/loader/loader'
import AnimationLifecycle from './components/animationLifecycle';
const Projects = React.lazy(() => import("./views/Projects"));
const Home = React.lazy(() => import("./views/Home"));
// const Landing = React.lazy(() => import("./modules/landing/landing"));
// const ProjectDetailsPage = React.lazy(() =>import("./modules/projectDetailsPage"));
function App() {
  return (
    <div className="App">
      <Router>
        {/* <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch> */}
        <Suspense fallback={null}>
          <Switch>
            <Route path="/">
              <Loader>
                {/* <Home /> */}
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
                />
                <Route
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
              </Loader>
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
