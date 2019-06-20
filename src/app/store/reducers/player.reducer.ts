import { PlayerStateChangeAction } from '../actions/player.actions';
import { Action, createReducer, on } from '@ngrx/store';

import { InitialPlayerState } from '../states/player.state';

export const PlayerReducer = createReducer(
  InitialPlayerState,
  on(PlayerStateChangeAction, state => ({
    ...state
  }))
);
