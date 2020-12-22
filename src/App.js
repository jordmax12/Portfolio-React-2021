import logo from './logo.svg';
import './App.scss';
import './assets/scss/simple-grid.scss'
import { Suspense } from 'react'
// import Test from './components/test'
import Projects from './views/Projects';
import Home from './views/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// const PageTransitionExample = React.lazy(() => import("./examples/pageTransition"));
// const Landing = React.lazy(() => import("./modules/landing/landing"));
// const ProjectDetailsPage = React.lazy(() =>import("./modules/projectDetailsPage"));
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
