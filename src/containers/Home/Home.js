import React, {Component} from 'react';
import styles from './Home.module.css';

class Home extends Component {
  render() {
    return (
      <div className={styles.Home}>
        <h1>Home</h1>
        <p className={styles.Jumbotron}>
          Check on PC for better interaction not on Mobiles and Tablets
        </p>
        <p className={styles.Jumbotron}>
          This dummy app navigation works with react-router and don't act like general link(don't reload the page)<br/>
        </p>
        <p className={styles.Jumbotron}>
          When app goues to Firebase it shows Spinner Component while waiting for the response
        </p>
        <p className={styles.Jumbotron}>
          Login and Logout don't check anything but simply log in and log out and SET <code>authentication</code> in localStorage or remove <code>authentication</code> <br/>
          then App Component chech for the <code>authentication</code> in LocalStorage with function that dispatch action and keep Login or Logout depending on the value
        </p>
        <p className={styles.Jumbotron}>
          You can see ErrorPage Component if you type something like <code>/postsqwertynonexisttext</code> in browser serchbar
        </p>
        <p className={styles.Jumbotron}>
          The header info passed to the Header Component through <code>props</code> in Layout Component and depending on
          them<br/>
        </p>
        <p className={styles.Jumbotron}>
          Depending on authentication the Navigation Component will show different links and the App Component will
          render and allow/disallow to render different routes<br/>
        </p>
        <p className={styles.Jumbotron}>
          Footer text is hardcoded except copyright year value(is takes props in Layout Component)<br/>
        </p>
        <p className={styles.Jumbotron}>
          Posts page load Posts Componet that go to Firebase with Axios an get our created posts<br/>
        </p>
        <p className={styles.Jumbotron}>
          Posts Component take Axios result and renders it in a single Post Component passing a proper props to it<br/>
        </p>
        <p className={styles.Jumbotron}>
          FullPosts Component can Delete and Edit post info with Axios in the Firebase.
        </p>
        <p className={styles.Jumbotron}>
          All global states like <code>authentication, posts</code> managed by Redux.
        </p>
        <p className={styles.Jumbotron}>
          Custom tiny video player.
        </p>
        <p className={styles.Jumbotron}>
          Video Component plays video using <code>refs</code> to get <code>.play()</code> native browser function work.
        </p>
        <p className={styles.Jumbotron}>
          Video Component has controls (play/pause/fast-forward/fast-backward) and if you click on progressbar the movie progress will change accordingly to the place you clicked
        </p>
        <p className={styles.Jumbotron}>
          Sticky Widget Component can be show/hide with a special buttons that also show/hide<br/>
          But it's controlled by local state not Redux or Firebase or LocalStorage = so when you refresh page it will go to it's basic state.
        </p>
        <p className={styles.Jumbotron}>
          Sticky Widget Component inserts Video Component in itself and change view if the <code>this.prop.widgetized</code> on the Video Component is true.
        </p>
        <p className={styles.Jumbotron}>
          Sticky Widget Component is a Higher Order Component that can wrap any Component and have it's own property - text.
        </p>
      </div>
    );
  }
}

export default Home;