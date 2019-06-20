import { Action } from '@ngrx/store';

import { PlayerStateInterface } from '../../components/player/player.model';

export enum PlayerActionType {
  TogglePlay = '[Player] Toggle Play'
}

export class PlayerTogglePlayAction implements Action {
  public readonly type = PlayerActionType.TogglePlay;
}

export type PlayerActions = PlayerTogglePlayAction;
