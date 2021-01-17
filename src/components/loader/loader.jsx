import React, { useState, useEffect, Fragment } from "react";
import styles from "./loader.module.scss";
import { loaderPageStates } from "./loaderConstants";
import { Transition, Spring } from "react-spring/renderprops";
import Div from "../div";
import { withRouter, matchPath } from "react-router";
import { CookieService } from "../../assets/utils/cookieService"
import { animationFrameTimeout } from '../../assets/utils';
import { preloadImage, getImagesFromContext } from './loaderHelper';
import LoaderContext from './loader-context';

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

// const assetsBackgroundImages = require.context(
//   '../../assets/images/backgrounds',
//   false,
//   /.*\.png$|jpg$/
// );

const assetsJordanImages = require.context(
	'../../assets/images/jordan',
	false,
	/.*\.png$|jpg$/
  );

const Loader = (props) => {
    const [ contentLoadedPercentage, setContentLoadedPercentage ] = useState(0);
	// const [ showBackground, setShowBackground ] = useState(true);
	// const [ balloonY, setBalloonY ] = useState('56px');
	/* eslint-disable no-unused-vars */
    const [ pageState, setPageState ] = useState(loaderPageStates.IS_LOADING);
	const { location, children, updateCurrentPercentLoaded, showHeaderAfterLoader } = props;
    // let lastUpdated = 0;
    let itemsLoaded = 0;
    let totalItems = 0;
	let loaderStarted = false;

    useEffect(() => {
        if(!loaderStarted){
			setTimeout(() => {
				/* eslint-disable react-hooks/exhaustive-deps */
				loaderStarted = true;
				startLoader();
			}, 1000)
        }
    }, [])

    const startLoader = () => {
		const images = Array.from(document.images);
		const extractedImages = [
				...getImagesFromContext(assetsImages),
				...getImagesFromContext(assetTechnologyImages),
				// ...getImagesFromContext(assetsBackgroundImages),
				...getImagesFromContext(assetsJordanImages)
		]

		extractedImages.map(image => (
				images.push(preloadImage(image, incrementLoading))
		));

		import("../../views/Home").then(Home => incrementLoading()); // increment manually being called.
		import("../../views/Projects").then(Projects => incrementLoading()); // Asyncronysly complete on background. //Todo unless if its the projects page .. use routeMatch
		import("../../views/Blog").then(Home => incrementLoading()); // increment manually being called.
		totalItems = images.length;
		let areImagesLoaded = true;
		if (images) {
			images.forEach(element => {
				if (areImagesLoaded) {
					areImagesLoaded = element.complete;
				}
			});
		}

		if (areImagesLoaded) {
			completeAnimation(true); // immediatly load page.
		} else {
			const introAlreadyShown = CookieService.get("INTRO_COMPLETED");
			const match = matchPath(location.pathname, {
				path: "/project/:projectSlug?",
				exact: true,
				strict: false
			});

			if (match && introAlreadyShown) {
				// Todo also check if intro animation is done or not ... if not the make this condition false
				// completeAnimation(true); // immediatly load page.
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
		// const updateStateAfter = isLastPercentage ? 600 : 400; //600 ms for the last 2 percentage
		const updateStateAfter = 0;

		animationFrameTimeout(() => {
			// manually incrementing the progress for the last 2 percent to make a seemless animation.
			if (isLastPercentage) {
				incrementLoading();
			}
			const contentLoadedPercentage = Math.trunc(
				(itemsLoaded / totalItems) * 100
			)
			setContentLoadedPercentage(
				Math.min(contentLoadedPercentage, 100)
			);
			if (itemsLoaded >= totalItems) {
				setTimeout(() => {
					// completeAnimation();
				}, 4000)
			} else {
				valuateProgress();
			}
		}, updateStateAfter)
	};

	const completeLoading = () => {
		showHeaderAfterLoader();
	}

	const completeAnimation = showImmediately => {
		const introAlreadyShown = CookieService.get("INTRO_COMPLETED");

		// Loading background images in the background, without a loader tracking progress
		// TODO: revisit this
		const images = [];
		// getImagesFromContext(assetsBackgroundImages).map(image =>
		// 	images.push(preloadImage(image))
		// );


		// if (showImmediately) {
		// 	// setPageState(loaderPageStates.SHOW_PAGE);
		// 	setShowBackground(false);
		// }

		if (contentLoadedPercentage > 98) {
			// if by chance its not 100 then show 100 on page
			setContentLoadedPercentage(100);
		}

		// setPageState(loaderPageStates.COMPLETED_LOADING)
		
		// so created a timeout to not show content immediately
		animationFrameTimeout(() => {
			
			if (!disableIntro && !introAlreadyShown) {
				// setPageState(loaderPageStates.SHOW_INTRO)
			} else {					
				// animationFrameTimeout(() => {
				// 	showHeaderAfterLoader();
				// 	// setTimeout(() => {
				// 	// 	setPageState(loaderPageStates.SHOW_PAGE);
				// 	// }, 300)
				// }, 400)
			}
		}, 500);
	};
  /* --------------------------------------------------Render------------------------------------------- */
    return (
		<LoaderContext.Provider value={{
			completeLoading
		}}>
			<div className={styles.loader_top_container}>
				{(
				<Div align className={styles.background_loader_container}>
				{/* {pageState === loaderPageStates.SHOW_PAGE && children}
				{pageState !== loaderPageStates.SHOW_PAGE && ( */}
					<Transition
						items={pageState}
						from={{ opacity: 1 }}
						enter={{ opacity: 1 }}
						leave={{ opacity: 0 }}
					>
						
					{pageState =>
						(transitionProps => (
							<Fragment>
							<Spring
								to={{
									height: '100%',
									x: contentLoadedPercentage
								}}
								config={{
									mass: 0.5,
									tension: 100,
									friction: 30
								}}
							>
								{
								springProps => {
									const newPercentLoaded = Math.ceil(springProps.x);
									updateCurrentPercentLoaded(newPercentLoaded);
									return (
										<Fragment>
											<div style={{
											opacity: transitionProps.opacity,
											height: '100%',
											}} className={styles.loading_text_container}>
												{children}
											</div>
										</Fragment>
									)
								}
								}
							</Spring>
							</Fragment>
						))}
					</Transition>
				{/* )} */}
				
				</Div>
			)
			}
			</div>
		</LoaderContext.Provider>
    )
}

export default withRouter(Loader);
