import React from 'react';
import styles from './Footer.module.css';

const Footer = ( props ) => (
  <div className={styles.Footer}>
    <div className="container">
    <p className={styles.Text}>This text is hardcoded from the Footer Component</p>
      <div className={styles.Copyright}>Copyright {props.year}</div>
    </div>
  </div>
);

export default Footer;