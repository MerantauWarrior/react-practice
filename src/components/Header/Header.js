import React from 'react';
import styles from './Header.module.css';

const Header = ( props ) => (
  <div className={styles.Header}>
    <div className={[styles.Container, "container"].join(' ')}>
      <div className={styles.Logo}>{props.logoText}</div>
      {!props.showSticky ? <button className={styles.ShowWigdet} onClick={props.clicked}>show widget</button> : null}
      <div className={styles.Contacts}>
        <div className={styles.Contact}>My Email: {props.email}</div>
        <div className={styles.Contact}>My Phone: {props.tel}</div>
      </div>
    </div>
  </div>
);

export default Header;