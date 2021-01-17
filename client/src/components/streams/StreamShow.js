import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.id = this.props.match.params.id;
    this.props.fetchStream(this.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  // Remove the player once the component is unmounted
  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    // 1) If we don't have a stream (haven't feched it yet) or if we already have a player, return.
    if (this.player || !this.props.stream || !this.id) {
      return;
    }

    // 2) Otherwise, set up the video player
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${this.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <p>Loading...</p>;
    }

    const { title, description } = this.props.stream;

    return (
      <div className="">
        <video ref={this.videoRef} style={{ width: '100%' }} controls={true}></video>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
