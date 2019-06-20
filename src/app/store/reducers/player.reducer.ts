import { PlayerActionType, PlayerActions } from '../actions/player.actions';
import {
  PlayerStateInterface,
  InitialPlayerState
} from '../states/player.state';

export const PlayerReducer = (
  state = InitialPlayerState,
  action: PlayerActions
): PlayerStateInterface => {
  switch (action.type) {
    case PlayerActionType.TogglePlay:
      return {
        ...state,
        paused: !state.paused
      };
      break;
    default:
      return { ...state };
  }
};
