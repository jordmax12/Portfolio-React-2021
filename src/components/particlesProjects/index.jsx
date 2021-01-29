import React from "react";
import Particles from "react-particles-js";
import styles from "./particlesProjects.module.scss";
import "pathseg";
import awsSvg from '../../assets/images/backgrounds/AWS.svg'

const ParticlesProjects = (props) => {
  return (
    <div className={styles.particlesLandingContainer}>
      <div className={styles.particlesLandingHolder}>
        <Particles
          height={"100vh"}
        //   params={{
        //     particles: {
        //       number: {
        //         value: 90,
        //         density: {
        //           enable: true,
        //           value_area: 800,
        //         },
        //       },
        //       color: {
        //         value: "#ffffff",
        //       },
        //       shape: {
        //         type: "circle",
        //         stroke: {
        //           width: 0,
        //           color: "#000000",
        //         },
        //         image: {
        //           src: "img/github.svg",
        //           width: 100,
        //           height: 100,
        //         },
        //       },
        //       opacity: {
        //         value: 0.4,
        //         random: true,
        //         anim: {
        //           enable: true,
        //           speed: 1,
        //           opacity_min: 0.1,
        //           sync: false,
        //         },
        //       },
        //       size: {
        //         value: 3,
        //         random: true,
        //         anim: {
        //           enable: true,
        //           speed: 2,
        //           size_min: 0.1,
        //           sync: false,
        //         },
        //       },
        //       line_linked: {
        //         enable_auto: true,
        //         distance: 100,
        //         color: "#fff",
        //         opacity: 1,
        //         width: 1,
        //         condensed_mode: {
        //           enable: false,
        //           rotateX: 600,
        //           rotateY: 600,
        //         },
        //       },
        //       move: {
        //         enable: true,
        //         speed: 1,
        //         direction: "none",
        //         random: false,
        //         straight: false,
        //         out_mode: "out",
        //         bounce: false,
        //         attract: {
        //           enable: false,
        //           rotateX: 600,
        //           rotateY: 1200,
        //         },
        //       },
        //     },
        //     interactivity: {
        //       detect_on: "canvas",
        //       events: {
        //         onhover: {
        //           enable: false,
        //         },
        //         onclick: {
        //           enable: false,
        //         },
        //         resize: true,
        //       },
        //     },
        //     retina_detect: true,
        //   }}
        params={{
            fps_limit: 28,
            particles: {
                collisions: {
                    enable: false
                },
                number: {
                    value: 200,
                    density: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 30,
                    opacity: 0.4
                },
                move: {
                    speed: 1
                },
                opacity: {
                    anim: {
                        enable: true,
                        opacity_min: 0.05,
                        speed: 1,
                        sync: false
                    },
                    value: 0.4
                }
            },
            polygon: {
                enable: true,
                scale: 0.5,
                type: "inline",
                move: {
                    radius: 10
                },
                url: "blob:https://maketext.io/8e606bea-f00c-4b60-b679-41dfcf5b79e8",
                inline: {
                    arrangement: "equidistant"
                },
                draw: {
                    enable: true,
                    stroke: {
                        color: "rgba(255, 255, 255, .2)"
                    }
                }
            },
            retina_detect: false,
            interactivity: {
                events: {
                    onhover: {
                        enable: true,
                        mode: "bubble"
                    }
                },
                modes: {
                    bubble: {
                        size: 6,
                        distance: 40
                    }
                }
            }
        }}
        />
      </div>
      {props.children}
    </div>
  );
};

export default ParticlesProjects;
