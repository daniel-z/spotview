import { PlayerActionType, PlayerActions } from '../actions/player.actions';

import { InitialPlayerState } from '../states/player.state';

export function PlayerReducer(
  state = InitialPlayerState,
  action: PlayerActionType
) {
  switch (action.type) {
    case PlayerActions.PLAYER_STATE_CHANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
