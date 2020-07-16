import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._video = createRef();
    this._videoPlayerSetTimeout = null;
  }

  componentDidMount() {
    const {film} = this.props;
    const {videoSource, image} = film;
    const video = this._video.current;

    if (video) {
      video.src = videoSource;
      video.poster = image;
      video.muted = true;
    }
  }

  componentWillUnmount() {
    const video = this._video.current;

    video.onplay = null;
    video.src = ``;
    video.poster = ``;
    video.muted = null;
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const video = this._video.current;

    if (isPlaying) {
      this._videoPlayerSetTimeout = setTimeout(() => {
        video.play();
      }, 1000);
    } else {
      if (this._videoPlayerSetTimeout) {
        clearTimeout(this._videoPlayerSetTimeout);
        this._videoPlayerSetTimeout = null;
        video.load();
      }
    }
  }

  render() {
    return (
      <video
        className="player__video"
        ref={this._video}
      />
    );
  }
}

VideoPlayer.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    videoSource: PropTypes.string.isRequired
  }).isRequired,
  isPlaying: PropTypes.bool.isRequired
};