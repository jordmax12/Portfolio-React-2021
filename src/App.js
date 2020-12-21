import logo from './logo.svg';
import './App.scss';
import './assets/scss/simple-grid.scss'
import { Suspense } from 'react'
// import Test from './components/test'
import Projects from './views/Projects/projects';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// const PageTransitionExample = React.lazy(() => import("./examples/pageTransition"));
// const Landing = React.lazy(() => import("./modules/landing/landing"));
// const ProjectDetailsPage = React.lazy(() =>import("./modules/projectDetailsPage"));
function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={null}>
          <Switch>
            {/* <Route
              path="/example/pagetransition"
              component={PageTransitionExample}
            /> */}

            <Route path="/">
              {/* <Loader> */}
              <Projects />
              {/* <Route 
                  exact
                  path="/project/:projectSlug?"
                  children={(props) => (
                    <AnimationLifecycle
                      component={ProjectDetailsPage}
                      whenToRender={(match)=>(match && match.params && match.params.projectSlug)}
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
