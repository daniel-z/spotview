import { Action } from '@ngrx/store';
import { PlayerStateInterface } from '../../components/player/player.model';

export enum PlayerActions {
  PLAYER_STATE_CHANGE = 'PLAYER_STATE_CHANGE',
  PLAYER_NEXT = 'PLAYER_NEXT',
  PLAYER_PREVIOUS = 'PLAYER_PREVIOUS'
}

export class PlayerStateChangeAction implements Action {
  readonly type: string = PlayerActions.PLAYER_STATE_CHANGE;
  constructor() {}
}

export class PlayerNextAction implements Action {
  readonly type: string = PlayerActions.PLAYER_NEXT;
}

export class PlayerPreviousAction implements Action {
  readonly type: string = PlayerActions.PLAYER_PREVIOUS;
}

export type PlayerActionType =
  | PlayerStateChangeAction
  | PlayerPreviousAction
  | PlayerNextAction;
