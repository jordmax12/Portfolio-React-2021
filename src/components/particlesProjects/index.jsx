import React from "react";
import Particles from "react-particles-js";
import styles from "./particlesProjects.module.scss";
import "pathseg";

const ParticlesProjects = (props) => {
  return (
    <div className={styles.particlesLandingContainer}>
      <div className={styles.particlesLandingHolder}>
        <Particles
          height={"250px"}
          params={{
            particles: {
              number: {
                value: 200,
                limit: 300,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#ffffff"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 5
                },
                image: {
                  src: "images/github.svg",
                  width: 100,
                  height: 100
                }
              },
              opacity: {
                value: 0.5,
                random: true,
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.5,
                  sync: false
                }
              },
              size: {
                value: 30,
                random: true,
                anim: {
                  enable: true,
                  speed: 10,
                  size_min: 10,
                  sync: false
                }
              },
              line_linked: {
                enable: false,
                distance: 100,
                color: "#ffffff",
                opacity: 1,
                width: 1
              },
              move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: "bubble",
                  parallax: {
                    enable: true,
                    force: 60,
                    smooth: 10
                  }
                },
                onClick: {
                  enable: true,
                  mode: "push"
                },
                resize: true
              },
              modes: {
                grab: {
                  distance: 400,
                  lineLinked: {
                    opacity: 1
                  }
                },
                bubble: {
                  distance: 400,
                  size: 100,
                  duration: 2,
                  opacity: 1,
                  speed: 2
                },
                repulse: {
                  distance: 200
                },
                push: {
                  particles_nb: 4
                },
                remove: {
                  particles_nb: 2
                }
              }
            },
            backgroundMask: {
              enable: true,
              cover: {
                color: {
                  value: {
                    r: 34,
                    g: 40,
                    b: 49
                  }
                }
              }
            },
            retina_detect: true,
            fps_limit: 30,
            background: {
              image:
                "url('https://cdn.matteobruni.it/images/particles/background3.jpg')"
            }
          }}
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
        />
      </div>
      {props.children}
    </div>
  );
};

export default ParticlesProjects;
