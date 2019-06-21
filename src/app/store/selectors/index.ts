import { PlayerStateInterface } from '../states/player.state';
import { TrackDisplayInterface } from '../states/track-display-state';
import { AppStateInterface } from '../states/app.state';
import { get } from 'lodash';

export const selectPlayerState = (
  state: AppStateInterface
): PlayerStateInterface => {
  return state.player;
};

export const selectTrackDisplay = (
  state: AppStateInterface
): TrackDisplayInterface => {
  const trackDisplayState = {
    trackName: get(state, 'player.track_window.current_track.name'),
    artistName: get(state, 'player.track_window.current_track.artists[0].name'),
    album: {
      albumImageUrl: get(
        state,
        'player.track_window.current_track.album.images[2].url'
      ),
      name: get(state, 'player.track_window.current_track.album.name')
    }
  };
  return trackDisplayState;
};
