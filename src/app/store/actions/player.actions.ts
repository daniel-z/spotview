import { Action } from '@ngrx/store';
import { PlayerStateInterface } from '../../components/player/player.model';

export enum PlayerActions {
  PLAYER_STATE_CHANGE = 'PLAYER_STATE_CHANGE'
}

export class PlayerStateChangeAction implements Action {
  readonly type: string = PlayerActions.PLAYER_STATE_CHANGE;
  constructor(public payload: PlayerStateInterface) {}
}

export type PlayerActionType = PlayerStateChangeAction;
