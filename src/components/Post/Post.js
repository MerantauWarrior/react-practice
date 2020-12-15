import React from 'react';
import styles from './Post.module.css';

const post = (props) => (
  <div className={styles.Card} onClick={props.clicked}>
    <div className={styles.Title}>{props.title}</div>
    <div className={styles.Info}>      
      <div className={styles.Author}>{props.author}</div>
      <div className={styles.Category}>{props.category}</div>
    </div>
  </div>
);

export default post;