import React, {PureComponent} from 'react';
import AudioPlayer from "../../components/audio-player/audio-player";
import withAudio from "../with-audio/with-audio";

const AudioPlayerWrapper = withAudio(AudioPlayer);

const withAudioPlayer = (Component) => {
  class WithAudioPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    }

    _onPlayButtonClick(id) {
      const {activePlayerId} = this.state;
      this.setState({
        activePlayerId: activePlayerId === id ? -1 : id
      });
    }

    render() {
      const {activePlayerId} = this.state;

      return (
        <Component
          {...this.props}
          renderPlayer={(src, id) => {
            return (
              <AudioPlayerWrapper
                src={src}
                isPlaying={id === activePlayerId}
                id={id}
                onPlayButtonClick={this._onPlayButtonClick}
              />
            );
          }}
        />
      );
    }
  }

  WithAudioPlayer.propTypes = {};

  return WithAudioPlayer;
};

export default withAudioPlayer;
