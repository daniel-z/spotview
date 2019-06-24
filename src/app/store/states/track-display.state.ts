import * as TrackDisplay from '../../components/track-display/track-display.model';

export const InitialTrackDisplayState: TrackDisplay.TrackDisplayInterface = {
  ...TrackDisplay.InitialTrackDisplayState
};

export function getInitialState(): TrackDisplay.TrackDisplayInterface {
  return InitialTrackDisplayState;
}

export {
  TrackDisplayInterface
} from '../../components/track-display/track-display.model';
