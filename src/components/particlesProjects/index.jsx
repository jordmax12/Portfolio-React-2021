import React from "react";
import Particles from "react-particles-js";
import styles from "./particlesProjects.module.scss";
import "pathseg";
/* eslint-disable no-unused-vars */
const svgLinks = {
  'aws': '',

}
/* eslint-enable no-unused-vars */
const ParticlesProjects = (props) => {
  return (
    <div className={styles.particlesLandingContainer}>
      <div className={styles.particlesLandingHolder}>
        <Particles
          height={"300px"}
          width={"500px"}
          style={{
              backgroundColor: 'transparent'
          }}
          params={{
            detectRetina: false,
            fpsLimit: 30,
            background: {
              color: "transparent",
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: "bubble",
                },
                resize: true,
              },
              modes: {
                bubble: {
                  color: "#fdb927",
                  distance: 100,
                  duration: 2,
                  opacity: 1,
                  size: 10,
                  speed: 3,
                },
              },
            },
            particles: {
              color: {
                value: "#000",
              },
              links: {
                blink: false,
                color: "#fff",
                consent: false,
                distance: 20,
                enable: true,
                opacity: 0.8,
                width: 1,
              },
              move: {
                attract: {
                  enable: false,
                  rotate: {
                    x: 600,
                    y: 1200,
                  },
                },
                bounce: false,
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: false,
                  area: 2000,
                },
                limit: 0,
                value: 100,
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.05,
                  speed: 3,
                  sync: false,
                },
                random: false,
                value: 1,
              },
              shape: {
                type: "circle",
              },
              size: {
                animation: {
                  enable: false,
                  minimumValue: 0.1,
                  speed: 40,
                  sync: false,
                },
                random: true,
                value: 3,
              },
            },
            polygon: {
              enable: true,
              scale: 0.5,
              type: "inline",
              move: {
                radius: 10,
              },
              url:
                "https://gist.githubusercontent.com/jordmax12/cea40cc3f05ebf3a83e90b4102a6765a/raw/aae70f1aad573a2de711d189757c5afe5394c036/Test.svg",
              inline: {
                arrangement: "equidistant",
              },
              draw: {
                enable: true,
                stroke: {
                  color: "rgba(255, 255, 255, .2)",
                },
              },
            },
          }}
        />
      </div>
      {props.children}
    </div>
  );
};

export default ParticlesProjects;
