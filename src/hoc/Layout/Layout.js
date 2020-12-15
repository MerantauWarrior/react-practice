import React, { Component } from 'react';
import styles from './Layout.module.css';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import StikyWidget from '../StikyWidget/StikyWidget';
import Video from '../../containers/Video/Video';

class Layout extends Component {
  state = {
    showSticky: false
  };
  cancelRightMouseHandler = (event) => {
    // event.preventDefault();
  };
  stickyRemove = () => {
    this.setState({showSticky: false});
  };
  stickyShow = () => {
    this.setState({showSticky: true});
  };
  render() {
    let sticky = null;
    if(this.state.showSticky === true){
      sticky = (
        <StikyWidget clicked={this.stickyRemove} text="video component in widget component this text from property of widget component">
          <Video widgetized={true}/>
        </StikyWidget>
      );
    }
    return (
      <div className={styles.Layout} onContextMenu={(event) => this.cancelRightMouseHandler(event)}>
        {sticky}
        <Header
          logoText="dummy logo"
          email="mail@gmail.com"
          tel="+380634177161"
          showSticky={this.state.showSticky}
          clicked={this.stickyShow} />
        <Navigation isAuth={this.props.isAuth} />
        <main className={styles.Content}>
          <div className="container">
            <p style={{textAlign: 'center'}}>This text is not affected by React Router it will be on every Componets</p>
            {this.props.children}
          </div>
        </main>
        <Footer year="2018" />
      </div>
    );
  }
}

export default Layout;