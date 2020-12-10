import React, { Component } from 'react';
import Div from '../div';
import leftArrowIcon from "../../assets/icons/icon-left-arrow.png";
import styles from './pagination_button.module.scss';

const PaginationButton = ({ className, isEnabled, onClick, isRight }) => {
  return (
    <Div
      align
      justify
      className={`${styles.button_container} ${className} ${!isEnabled ? styles.disabled : ''}`}
      onClick={onClick}
    >
      <img className={`${styles.arrow} ${isRight ? styles.right_arrow : null}`} src={leftArrowIcon} />
    </Div>
  );
}

export default PaginationButton;
