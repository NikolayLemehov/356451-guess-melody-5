import React, {PureComponent} from 'react';
import AudioPlayer from "../../components/audio-player/audio-player";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
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

      return <Component
        {...this.props}
        renderPlayer={(src, id) => {
          return (
            <AudioPlayer
              src={src}
              isPlaying={id === activePlayerId}
              id={id}
              onPlayButtonClick={this._onPlayButtonClick}
            />
          );
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
