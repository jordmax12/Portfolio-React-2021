import React, { Component, Fragment } from "react";
import styles from "./loader.module.scss";
import { loaderPageStates } from "./loaderConstants";
import { Transition, Spring } from "react-spring/renderprops";
import Div from "../div";
import { withRouter, matchPath } from "react-router";
import { CookieService } from "../../assets/utils/cookieService"
import BackgroundAnimator from "../backgroundAnimator";
import { animationFrameTimeout } from '../../assets/utils';
import { preloadImage, getImagesFromContext } from './loaderHelper';

const assetsImages = require.context(
  `../../assets/images`,
  false,
  /.*\.png$|jpg$|jpeg$/
);
const assetTechnologyImages = require.context(
  `../../assets/images/technology`,
  false,
  /.*\.png$|jpg$/
);

const assetsBackgroundImages = require.context(
  '../../assets/images/backgrounds',
  false,
  /.*\.png$|jpg$/
);

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentLoadedPercentage: 0,
      showBackground: true,
      pageState: loaderPageStates.IS_LOADING,
      disableIntro: true
    };

    this.lastUpdated = 0;
    this.itemsLoaded = 0;
    this.totalItems = 0;
  }

  componentDidMount() {
    this.startLoader();
  }

  /* --------------------------------------------------Initialize Loader function------------------------------------------- */
  startLoader = () => {
    const { location } = this.props;
    const images = Array.from(document.images);

    const extractedImages = [
      ...getImagesFromContext(assetsImages),
      ...getImagesFromContext(assetTechnologyImages)
    ]

    extractedImages.map(image => (
      images.push(preloadImage(image, this.incrementLoading))
    ));

    import("../../views/Home").then(Home => this.incrementLoading()); // increment manually being called.
    import("../../views/Projects").then(Projects => { }); // Asyncronysly complete on background. //Todo unless if its the projects page .. use routeMatch

    this.totalItems = images.length + 2
    let areImagesLoaded = true;

    // enables flag to hide loader if all the images are loaded 
    if (images) {
      images.forEach(element => {
        if (areImagesLoaded) {
          areImagesLoaded = element.complete;
        }
      });
    }

    if (areImagesLoaded) {
      this.completeLoading(true); // immediatly load page.
    } else {
      const introAlreadyShown = CookieService.get("INTRO_COMPLETED");
      const match = matchPath(location.pathname, {
        path: "/project/:projectSlug?",
        exact: true,
        strict: false
      });

      if (match && introAlreadyShown) {
        // Todo also check if intro animation is done or not ... if not the make this condition false
        this.completeLoading(true); // immediatly load page.
      } else {
        this.valuateProgress();
      }
    }
  };

  /* --------------------------------------------------Validate function------------------------------------------- */
  // This function is called every 400 millisecond to update the progress bar
  // Because if we keep updating the progress bar on callback of items loaded then the animation suffers
  valuateProgress = () => {
    const isLastPercentage = this.totalItems - this.itemsLoaded <= 1;
    const updateStateAfter = isLastPercentage ? 600 : 400; //600 ms for the last 2 percentage

    animationFrameTimeout(() => {
      // manually incrementing the progress for the last 2 percent to make a seemless animation.
      if (isLastPercentage) {
        this.incrementLoading();
      }

      const contentLoadedPercentage = Math.trunc(
        (this.itemsLoaded / this.totalItems) * 100
      )

      this.setState({
        contentLoadedPercentage
      });
      if (this.itemsLoaded >= this.totalItems) {
        this.completeLoading();
      } else {
        this.valuateProgress();
      }
    }, updateStateAfter)
  };

  /* --------------------------------------------------Loader Increment function------------------------------------------- */
  incrementLoading = () => {
    this.itemsLoaded = this.itemsLoaded + 1;
  };

  /* --------------------------------------------------Finish Up function------------------------------------------- */
  completeLoading = showImmediately => {
    const { contentLoadedPercentage, disableIntro } = this.state;
    const introAlreadyShown = CookieService.get("INTRO_COMPLETED");

    //Loading background images in the background, without a loader tracking progress
    const images = [];
    getImagesFromContext(assetsBackgroundImages).map(image =>
      images.push(preloadImage(image))
    );


    if (showImmediately) {
      return this.setState({
        pageState: loaderPageStates.SHOW_PAGE,
        showBackground: false
      });
    }

    if (contentLoadedPercentage !== 100) {
      // if by chance its not 100 then show 100 on page
      this.setState({ contentLoadedPercentage: 100 });
    }

    this.setState({
      pageState: loaderPageStates.COMPLETED_LOADING // complete loading animation takes around 400 ms to hide
    });

    // so created a timeout to not show content immediately
    animationFrameTimeout(() => {
      if (!disableIntro && !introAlreadyShown) {
        this.setState({
          pageState: loaderPageStates.SHOW_INTRO
        });
      } else {
        this.setState({
          pageState: loaderPageStates.SHOW_PAGE
        });
        animationFrameTimeout(() => this.setState({ showBackground: false }), 400)
      }
    }, 500);
  };

  /* --------------------------------------------------OnEndIntroAnimation Callback------------------------------------------- */
  onIntroAnimationEnd = () => {
    this.setState({ pageState: loaderPageStates.INTRO_COMPLETED });

    animationFrameTimeout(() => {
      this.setState({
        pageState: loaderPageStates.SHOW_PAGE
      });
      animationFrameTimeout(() => this.setState({ showBackground: false }), 400)
    }, 500);
  };
  /* --------------------------------------------------Render------------------------------------------- */
  render() {
    const { children } = this.props;
    const { contentLoadedPercentage, pageState, showBackground } = this.state;
    console.log(styles)
    return (
      <Div className={styles.loader_top_container}>
        {pageState === loaderPageStates.SHOW_PAGE && children}
        {
          showBackground && (
            <Div align className={styles.background_loader_container}>
              <div className={styles.background_container}>
                <div className={styles.background}>
                  <BackgroundAnimator clientX={0} clientY={0} />
                </div>
              </div>
              <Transition
                items={pageState}
                from={{ opacity: 1 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}
              >
                {pageState =>
                  pageState === loaderPageStates.IS_LOADING &&
                  (transitionProps => (
                    <Fragment>
                      <Spring
                        to={{
                          height: `calc(100vw - ${contentLoadedPercentage}vw)`,
                          x: contentLoadedPercentage
                        }}
                      >
                        {
                          springProps => (
                            <Fragment>
                              <div style={transitionProps} className={styles.percentage_text}>{Math.floor(springProps.x)}</div>
                              <div style={{
                                opacity: transitionProps.opacity,
                                height: springProps.height,
                              }} className={styles.loading_text_container}>
                                <div className={styles.loading_text}>
                                  Loading...
                                </div>
                              </div>
                            </Fragment>
                          )
                        }
                      </Spring>
                    </Fragment>
                  ))}
              </Transition>
            </Div>
          )
        }

        {/* Intro Animation */}
        {/* <Transition
          items={pageState}
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}
        >
          {pageState =>
            pageState == loaderPageStates.SHOW_INTRO &&
            (props => (
              <Intro
                style={props}
                onAnimationEnd={() => this.onIntroAnimationEnd()}
              />
            ))
          }
        </Transition> */}
      </Div>
    );
  }
}

export default withRouter(Loader);
