import React, { Component } from 'react';
import styles from './Video.module.css';

class Video extends Component {
  state = {
    scr: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: null
  };

  playVideo = () => {
    this.refs.videoRef.play();
  };
  pauseVideo = () => {
    this.refs.videoRef.pause();
  };
  getDuration = () => {
    this.setState({duration:Math.floor(this.refs.videoRef.duration)});
  };
  loadedData = () => {
    console.log('loadedData');
  };
  timeUpdate = () => {
    this.updateProgressBar();
    console.log('timeUpdate');
  };
  progress = () => {
    console.log('progress');
  };
  onPlayingH = () => {
    console.log('onPlayingH');
  };
  onPlayH = () => {
    console.log('onPlayH');
  };
  onPauseH = () => {
    console.log('onPauseH');
  };
  onWaitingH = () => {
    console.log('onWaitingH');
  };
  onDurationChangeH = () => {
    this.getDuration();
    console.log('onDurationChangeH');
  };

  toHHMMSS = (senondsNumber) => {
    let sec_num = parseInt(senondsNumber, 10);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  };

  updateProgressBar = () => {
    let info = this.refs.infoRef;
    let percents = Math.floor((100/this.state.duration)*this.refs.videoRef.currentTime);
    if(info){
      info.innerHTML = percents + '% played ' + this.toHHMMSS(this.refs.videoRef.currentTime) + ' time played from ' +
        this.toHHMMSS(this.state.duration)+' total';
    }
    let pBarInner = this.refs.pBarInner;
    pBarInner.style.width = percents + '%';
  };

  setTimeHandler = (e) => {
    let progressWidth = parseInt(window.getComputedStyle(this.refs.progressBar, null).getPropertyValue("width"));
    let progressWant = parseInt(e.nativeEvent.offsetX);
    let percent = progressWant / progressWidth;
    this.refs.videoRef.currentTime = percent * this.refs.videoRef.duration;
  };

  forwardVideo = () => {
    this.refs.videoRef.currentTime = this.refs.videoRef.currentTime + parseInt(30);
  };
  backwardVideo = () => {
    this.refs.videoRef.currentTime = this.refs.videoRef.currentTime - parseInt(30);
  };

  render() {
    return (
      <div className={styles.Video}>
        {this.props.widgetized ? null :<h1>Video</h1>}

        <video
          ref="videoRef"
          className={styles.VideoItem}
          onLoadedData={this.loadedData}
          onTimeUpdate={this.timeUpdate}
          onProgress={this.progress}
          onPlay={this.onPlayH}
          onPlaying={this.onPlayingH}
          onPause={this.onPauseH}
          onWaiting={this.onWaitingH}
          onDurationChange={this.onDurationChangeH}
          src={this.state.scr}
          type="video/mp4"></video>

        <div className={styles.ProgressBar} ref="progressBar" onClick={(e) => this.setTimeHandler(e)}>
          <div className={styles.ProgressBarInner} ref="pBarInner"></div>
        </div>

        <button className={styles.Btn} onClick={this.playVideo}>play</button>
        <button className={styles.Btn} onClick={this.pauseVideo}>pause</button>
        <button className={styles.Btn} onClick={this.forwardVideo}>+ 30 seconds</button>
        <button className={styles.Btn} onClick={this.backwardVideo}>- 30 seconds</button>

        {this.props.widgetized
          ? null
          : <div>
              <p>{this.state.duration} seconds</p>
              <p ref="infoRef"></p>
            </div>}


      </div>
    );
  }
}

export default Video;