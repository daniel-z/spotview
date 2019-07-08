import { Action } from '@ngrx/store';
import { PlayerStateInterface } from '../../components/player/player.model';

export enum PlayerActions {
  PLAYER_STATE_CHANGE = 'PLAYER_STATE_CHANGE',
  PLAYER_NEXT = 'PLAYER_NEXT',
  PLAYER_PREVIOUS = 'PLAYER_PREVIOUS'
}

export class PlayerStateChangeAction implements Action {
  readonly type: string = PlayerActions.PLAYER_STATE_CHANGE;
  constructor(public payload: PlayerStateInterface) {}
}

export class PlayerNextAction implements Action {
  readonly type: string = PlayerActions.PLAYER_NEXT;
  constructor(public payload?: PlayerStateInterface) {}
}

export class PlayerPreviousAction implements Action {
  readonly type: string = PlayerActions.PLAYER_PREVIOUS;
  constructor(public payload?: PlayerStateInterface) {}
}

export type PlayerActionType =
  | PlayerStateChangeAction
  | PlayerPreviousAction
  | PlayerNextAction;
