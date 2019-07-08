import { PlayerActionType, PlayerActions } from '../actions/player.actions';

import { InitialPlayerState } from '../states/player.state';

export function PlayerReducer(
  state = InitialPlayerState,
  action: PlayerActionType
) {
  switch (action.type) {
    case PlayerActions.PLAYER_STATE_CHANGE:
    case PlayerActions.PLAYER_NEXT:
    case PlayerActions.PLAYER_PREVIOUS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
