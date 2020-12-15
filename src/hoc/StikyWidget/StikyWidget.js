import React, { Component } from 'react';
import styles from './StickyWidget.module.css';

class StickyWidget extends Component {
  render() {
    return (
      <div className={styles.StykyWigdet}>
        <button className={styles.BtnClose} onClick={this.props.clicked}>x</button>
        {this.props.text}
        {this.props.children}
      </div>
    );
  }
}

export default StickyWidget;