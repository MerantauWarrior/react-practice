import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './NavigationItem.module.css';

const NavigationItem = (props) => (
  <li className={props.classControl
    ? [styles.NavigationItem, styles.Control].join(' ')
    : styles.NavigationItem}>
    <NavLink
    to={props.link}
    exact={props.exact}
    activeClassName={styles.MyActive}>{props.children}</NavLink>
  </li>
);

export default NavigationItem;