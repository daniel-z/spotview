import { Action, createAction, props } from '@ngrx/store';

import { PlayerStateInterface } from '../../components/player/player.model';

export enum PlayerActionType {
  PLAYER_STATE_CHANGE = 'PLAYER_STATE_CHANGE'
}

export const PlayerStateChangeAction = createAction(
  PlayerActionType.PLAYER_STATE_CHANGE,
  props<PlayerStateInterface>()
);
