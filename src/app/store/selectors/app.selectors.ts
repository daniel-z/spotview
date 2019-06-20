import { createSelector } from '@ngrx/store';
import { PlayerStateInterface } from '../states/player.state';
import { AppStateInterface } from '../states/app.state';

export const selectPlayerState = (
  state: AppStateInterface
): PlayerStateInterface => state.player;
