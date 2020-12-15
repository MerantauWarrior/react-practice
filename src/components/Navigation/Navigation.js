import React from 'react';
import styles from './Navigation.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const Navigation =(props) =>(
  <div className={styles.Navigation}>
    <div className="container">
      <ul className={styles.List}>
        <NavigationItem link="/" exact>Home</NavigationItem>
        {props.isAuth ? <NavigationItem link="/posts">Posts</NavigationItem> : null}
        <NavigationItem link="/video">Video</NavigationItem>
        {!props.isAuth
          ? <NavigationItem link="/login" classControl={true}>Log In</NavigationItem>
          : <NavigationItem link="/logout" classControl={true}>Log Out</NavigationItem>}
      </ul>
    </div>
  </div>
);

export default Navigation;