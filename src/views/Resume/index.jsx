import React, { Component } from "react";
import styles from "./resume.module.scss";
import Div from "../../components/div";
import TimelineSelector from "../../components/timelineSelector";
import { resume } from "../../helpers/resumeConstants";
import nextcrewLogo from '../../assets/images/logos/nextcrew-logo.jpg';
import newserLogo from '../../assets/images/logos/newser-logo.png';
import fcbLogo from '../../assets/images/logos/fcb-logo.jpg';
import syngentaLogo from '../../assets/images/logos/syngenta-logo.png';
import nextcrewBackground from '../../assets/images/backgrounds/nextcrew.jpg';
import newserBackground from '../../assets/images/backgrounds/newser.jpg';
import fcbBackground from '../../assets/images/backgrounds/fcb.jpg';
import syngentaBackground from '../../assets/images/backgrounds/syngenta.jpg';
import find from "lodash/find";
import { Transition } from "react-spring/renderprops";
// import RightContainer from "Common/containers/rightContainer";

class Resume extends Component {
  state = {
    selectedTimelineId: "nextcrew",
    selectionNext: true
  };

  constructor(props) {
    super(props);
    this.isFirstAnimation = true;
  }

  componentDidMount() {
    this.isFirstAnimation = false;
  }

  onTimelineSelected = ({ selectedId, selectionNext }) => {
    this.setState({ selectedTimelineId: selectedId, selectionNext });
  };

  mapBackgroundImage = id => {
    switch(id) {
        case 'nextcrew':
            return nextcrewBackground;
        case 'newser':
            return newserBackground;
        case 'fcb':
            return fcbBackground;
        case 'syngenta':
            return syngentaBackground;
        default:
            console.error('unhandled background id')
    }
  }

  mapLogo = id => {
        switch(id) {
            case 'nextcrew':
                return nextcrewLogo;
            case 'newser':
                return newserLogo;
            case 'fcb':
                return fcbLogo;
            case 'syngenta':
                return syngentaLogo;
            default:
                console.error('unhandled logo id')
        }
    }

  getImageBackgroundAnimation = selectionNext => {
    if (this.isFirstAnimation) {
      return {
        from: { transform: 'translateY(0vh)' },
        enter: { transform: 'translateY(0vh)' },
        leave: { transform: 'translateY(0vh)' }
      };
    }
    else if (selectionNext) {
      return {
        from: { transform: 'translateY(100vh)' },
        enter: { transform: 'translateY(0vh)' },
        leave: { transform: 'translateY(-100vh)' }
      };
    }

    return {
      from: { transform: 'translateY(-100vh)' },
      enter: { transform: 'translateY(0vh)' },
      leave: { transform: 'translateY(100vh)' }
    };
  };

  render() {
    const { selectedTimelineId, selectionNext } = this.state;
    const timeline = find(resume, timelineItem => {
      return timelineItem.id === selectedTimelineId;
    });
    return (
      <Div row fillParent align="stretch" className={styles.timeline_container}>
        <Transition
          items={timeline}
          keys={timeline => timeline.id}
          from={this.getImageBackgroundAnimation(selectionNext).from}
          enter={this.getImageBackgroundAnimation(selectionNext).enter}
          leave={this.getImageBackgroundAnimation(selectionNext).leave}
        >

          {timeline => props => (
            <img
                alt='background'
                src={this.mapBackgroundImage(timeline.id)}
                style={props}
                className={styles.background_image}
            ></img>
          )}
        </Transition>
        <div className={styles.background_overlay}></div>
        <div className={styles.left_background_gradient}></div>

        {/* <Div className={styles.left_container}> */}
        <Div
            row
            fillParent
            align="stretch"
            className={styles.timeline_container}
        >
            <div
                className={`${styles.customContainerMaxWidth400} ${styles.customOverflowYMed} container`}
            >
              <div className="row">
                <div className={`col-2 ${styles.customNoMarginMobile}`}>
                    <TimelineSelector
                      selectedId={selectedTimelineId}
                      listValue={resume}
                      tech={timeline}
                      onItemSelected={this.onTimelineSelected}
                    />
                </div>
              </div>
            </div>

          {/* <Transition
            items={timeline}
            keys={timeline => timeline.id}
            from={{ opacity: 0 }}
            enter={{ opacity: 1 }}
            leave={{ opacity: 0 }}
          >
            {timeline => props => (
              <Div style={props} className={styles.content_container}>
                <div className={styles.title}>{timeline.companyName}</div>

                <Div align="start" className={styles.description_container}>
                  <div className={styles.description}>{timeline.duration}</div>
                  <div className={styles.description}>{timeline.position}</div>
                  <div className={styles.description}>{timeline.description}</div>
                </Div>
              </Div>
            )}
          </Transition> */}
        </Div>

        {/* <RightContainer item={timeline} /> */}
      </Div>
    );
  }
}

export default Resume;