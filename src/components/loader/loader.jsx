import React, { useState, useEffect, Fragment } from "react";
import styles from "./loader.module.scss";
import { loaderPageStates } from "./loaderConstants";
import { Transition, Spring } from "react-spring/renderprops";
import Div from "../div";
import { withRouter, matchPath } from "react-router";
import { animationFrameTimeout } from "../../assets/utils";
import { preloadImage, getImagesFromContext } from "./loaderHelper";

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

const assetsJordanImages = require.context(
    "../../assets/images/jordan",
    false,
    /.*\.png$|jpg$/
);

const Loader = (props) => {
    const [contentLoadedPercentage, setContentLoadedPercentage] = useState(0);
    const [pageState] = useState(loaderPageStates.IS_LOADING);
    const {
        location,
        children,
        updateCurrentPercentLoaded
    } = props;
    let itemsLoaded = 0;
    let totalItems = 0;
    let loaderStarted = false;
	/* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (!loaderStarted) {
            setTimeout(() => {
                
                loaderStarted = true;
                startLoader();
            }, 1000);
        }
    }, []);
	/* eslint-enable react-hooks/exhaustive-deps */
    const startLoader = () => {
        const images = Array.from(document.images);
        const extractedImages = [
            ...getImagesFromContext(assetsImages),
            ...getImagesFromContext(assetTechnologyImages),
            ...getImagesFromContext(assetsJordanImages),
        ];

        extractedImages.map((image) =>
            images.push(preloadImage(image, incrementLoading))
        );

        import("../../views/Home").then((Home) => incrementLoading());
        import("../../views/Projects").then((Projects) => incrementLoading());
        import("../../views/Blog").then((Home) => incrementLoading());
        totalItems = images.length;
        let areImagesLoaded = true;
        if (images) {
            images.forEach((element) => {
                if (areImagesLoaded) {
                    areImagesLoaded = element.complete;
                }
            });
        }

        if (areImagesLoaded) {
            completeAnimation();
        } else {
            const match = matchPath(location.pathname, {
                path: "/project/:projectSlug?",
                exact: true,
                strict: false,
            });

            if (match) {
                // Todo also check if intro animation is done or not ... if not the make this condition false
                completeAnimation(); // immediatly load page.
            } else {
                valuateProgress();
            }
        }
    };

    const incrementLoading = () => {
        itemsLoaded += 1;
    };

    const valuateProgress = () => {
        const isLastPercentage = totalItems - itemsLoaded <= 1;
        const updateStateAfter = 0;

        animationFrameTimeout(() => {
            // manually incrementing the progress for the last 2 percent to make a seemless animation.
            if (isLastPercentage) {
                incrementLoading();
            }
            const contentLoadedPercentage = Math.trunc(
                (itemsLoaded / totalItems) * 100
            );
            setContentLoadedPercentage(Math.min(contentLoadedPercentage, 90));
            if (itemsLoaded >= totalItems) {
                setTimeout(() => {
                    completeAnimation();
                }, 4000);
            } else {
                valuateProgress();
            }
        }, updateStateAfter);
    };

    const completeAnimation = () => {
        if (contentLoadedPercentage > 98) {
            // if by chance its not 100 then show 100 on page
            setContentLoadedPercentage(100);
        }
    };
    /* --------------------------------------------------Render------------------------------------------- */
    return (
        <div className={styles.loader_top_container}>
            {
                <Div align className={styles.background_loader_container}>
                    <Transition
                        items={pageState}
                        from={{ opacity: 1 }}
                        enter={{ opacity: 1 }}
                        leave={{ opacity: 0 }}
                    >
                        {() => (transitionProps) => (
                            <Fragment>
                                <Spring
                                    to={{
                                        height: "100%",
                                        x: contentLoadedPercentage,
                                    }}
                                    config={{
                                        mass: 0.5,
                                        tension: 100,
                                        friction: 30,
                                    }}
                                >
                                    {(springProps) => {
                                        const newPercentLoaded = Math.ceil(
                                            springProps.x
                                        );
                                        updateCurrentPercentLoaded(
                                            newPercentLoaded
                                        );
                                        return (
                                            <Fragment>
                                                <div
                                                    style={{
                                                        opacity:
                                                            transitionProps.opacity,
                                                        height: "100%",
                                                    }}
                                                    className={
                                                        styles.loading_text_container
                                                    }
                                                >
                                                    {children}
                                                </div>
                                            </Fragment>
                                        );
                                    }}
                                </Spring>
                            </Fragment>
                        )}
                    </Transition>
                </Div>
            }
        </div>
    );
};

export default withRouter(Loader);
