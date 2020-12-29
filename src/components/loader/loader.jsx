import React, { useState, useEffect} from "react";
import styles from "./loader.module.scss";
import { loaderPageStates } from "./loaderConstants";
import { Transition, Spring } from "react-spring/renderprops";
import Div from "../div";
import { withRouter, matchPath } from "react-router";
import { CookieService } from "../../assets/utils/cookieService"
import BackgroundAnimator from "../backgroundAnimator";
import { animationFrameTimeout } from '../../assets/utils';
import { preloadImage, getImagesFromContext } from './loaderHelper';
const disableIntro = true;
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

const Loader = (props) => {
    const [ contentLoadedPercentage, setContentLoadedPercentage ] = useState(0);
    const [ showBackground, setShowBackground ] = useState(true);
    const [ pageState, setPageState ] = useState(loaderPageStates.IS_LOADING);
    const { location, children } = props;
    let lastUpdated = 0;
    let itemsLoaded = 0;
    let totalItems = 0;
    let loaderStarted = false;

    useEffect(() => {
        if(!loaderStarted){
            loaderStarted = true;
            startLoader();
        }
    }, [])

    const startLoader = () => {
			console.log('logging location', location);
			console.log('logging document', document.images);
			const images = Array.from(document.images);
			const extractedImages = [
					...getImagesFromContext(assetsImages),
					...getImagesFromContext(assetTechnologyImages)
			]
	
			extractedImages.map(image => (
					images.push(preloadImage(image, incrementLoading))
			));
	
			import("../../views/Home").then(Home => incrementLoading()); // increment manually being called.
			import("../../views/Projects").then(Projects => incrementLoading()); // Asyncronysly complete on background. //Todo unless if its the projects page .. use routeMatch
			import("../../views/Blog").then(Home => incrementLoading()); // increment manually being called.
	
			totalItems = images.length + 3;
			let areImagesLoaded = true;
			if (images) {
				images.forEach(element => {
					if (areImagesLoaded) {
						areImagesLoaded = element.complete;
					}
				});
			}
	
			if (areImagesLoaded) {
				completeLoading(true); // immediatly load page.
			} else {
				const introAlreadyShown = CookieService.get("INTRO_COMPLETED");
				const match = matchPath(location.pathname, {
					path: "/project/:projectSlug?",
					exact: true,
					strict: false
				});
	
				if (match && introAlreadyShown) {
					// Todo also check if intro animation is done or not ... if not the make this condition false
					completeLoading(true); // immediatly load page.
				} else {
					valuateProgress();
				}
			} 
		}
		
		const incrementLoading = () => {
			itemsLoaded += 1;
		};

		const valuateProgress = () => {
			const isLastPercentage = totalItems - itemsLoaded <= 1;
			const updateStateAfter = isLastPercentage ? 600 : 400; //600 ms for the last 2 percentage
	
			animationFrameTimeout(() => {
				// manually incrementing the progress for the last 2 percent to make a seemless animation.
				if (isLastPercentage) {
					incrementLoading();
				}
	
				const contentLoadedPercentage = Math.trunc(
					(itemsLoaded / totalItems) * 100
				)
	
				setContentLoadedPercentage(
					contentLoadedPercentage
				);
				if (itemsLoaded >= totalItems) {
					setTimeout(() => {
						completeLoading();
					}, 1500)
				} else {
					valuateProgress();
				}
			}, updateStateAfter)
		};


		const completeLoading = showImmediately => {
			console.log('hit complete loading', showImmediately)
			// const { contentLoadedPercentage, disableIntro } = this.state;
			const introAlreadyShown = CookieService.get("INTRO_COMPLETED");
	
			// Loading background images in the background, without a loader tracking progress
			// TODO: revisit this
			const images = [];
			getImagesFromContext(assetsBackgroundImages).map(image =>
				images.push(preloadImage(image))
			);
	
	
			if (showImmediately) {
				// return this.setState({
				// 	pageState: loaderPageStates.SHOW_PAGE,
				// 	showBackground: false
				// });
				setPageState(loaderPageStates.SHOW_PAGE);
				setShowBackground(false);
			}
	
			if (contentLoadedPercentage !== 100) {
				// if by chance its not 100 then show 100 on page
				// this.setState({ contentLoadedPercentage: 100 });
				setContentLoadedPercentage(100);
			}
	
			// this.setState({
			// 	pageState: loaderPageStates.COMPLETED_LOADING // complete loading animation takes around 400 ms to hide
			// });
			setPageState(loaderPageStates.COMPLETED_LOADING)
			
			// so created a timeout to not show content immediately
			animationFrameTimeout(() => {
				
				if (!disableIntro && !introAlreadyShown) {
					// this.setState({
					// 	pageState: loaderPageStates.SHOW_INTRO
					// });
					setPageState(loaderPageStates.SHOW_INTRO)
				} else {
					// this.setState({
					// 	pageState: loaderPageStates.SHOW_PAGE
					// });
					setPageState(loaderPageStates.SHOW_PAGE)
					animationFrameTimeout(() => {
						// this.showHeaderAfterLoader();
						// this.setState({ showBackground: false })
						setShowBackground(false);
					}, 400)
				}
			}, 500);
		};
  /* --------------------------------------------------Render------------------------------------------- */
    // const { children } = this.props;
    // const { contentLoadedPercentage, pageState, showBackground } = this.state;
    return (
        <div className={styles.loader_top_container}>
					{pageState === loaderPageStates.SHOW_PAGE && children}
        </div>
    //   <Div className={styles.loader_top_container}>
    //     {pageState === loaderPageStates.SHOW_PAGE && children}
    //     {
    //       showBackground && (
    //         <Div align className={styles.background_loader_container}>
    //           <Transition
    //             items={pageState}
    //             from={{ opacity: 1 }}
    //             enter={{ opacity: 1 }}
    //             leave={{ opacity: 0 }}
    //           >
    //             {pageState =>
    //               pageState === loaderPageStates.IS_LOADING &&
    //               (transitionProps => (
    //                 <Fragment>
    //                   <Spring
    //                     to={{
    //                       height: '100vh',
    //                       x: contentLoadedPercentage
    //                     }}
    //                   >
    //                     {
    //                       springProps => {
    //                         console.log('logging contentLoadedPercentage', Math.floor(springProps.x))
    //                         this.updateHeaderWidth(Math.floor(springProps.x));
    //                         return (
    //                           <Fragment>
    //                             <div style={{
    //                               opacity: transitionProps.opacity,
    //                               height: '100vh',
    //                             }} className={styles.loading_text_container}>
    //                               {/* <div style={{ width: '100%'}}>
    //                                 <div style={{
    //                                   width: `${Math.floor(springProps.x)}%`,
    //                                   backgroundColor: 'blue',
    //                                   height: '50px',
    //                                   position: 'absolute',
    //                                   top: '0',
    //                                   left: '0'
    //                                 }}></div>
    //                               </div> */}
    //                               <div className={styles.loading_text}>
    //                               {Math.floor(springProps.x)} Loading...
    //                               </div>
    //                             </div>
    //                           </Fragment>
    //                         )

    //                       }
                          
                          
    //                     }
    //                   </Spring>
    //                 </Fragment>
    //               )
                  
    //               )}
    //           </Transition>
    //         </Div>
    //       )
    //     }
    //   </Div>
    )
}

export default withRouter(Loader);
