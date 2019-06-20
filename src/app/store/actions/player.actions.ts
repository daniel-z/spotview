import { Action, createAction, props } from '@ngrx/store';

import { PlayerStateInterface } from '../../components/player/player.model';

export enum PlayerActionType {
  PLAYER_STATE_CHANGE = 'PLAYER_STATE_CHANGE'
  // TogglePlay = '[Player] Toggle Play',
  // TogglePlaySuccess = '[Player] Toggle Play Success'
}

// export class PlayerTogglePlayAction implements Action {
//   public readonly type = PlayerActionType.TogglePlay;
// }
// export class PlayerTogglePlaySuccessAction implements Action {
//   public readonly type = PlayerActionType.TogglePlaySuccess;
//   constructor(public payload: PlayerStateInterface) {}
// }

export const PlayerStateChangeAction = createAction(
  PlayerActionType.PLAYER_STATE_CHANGE,
  props<PlayerStateInterface>()
);
