import { RouterReducerState } from '@ngrx/router-store';
import {
  InitialPlayerState,
  PlayerStateInterface
} from '../states/player.state';

import {
  InitialViewerState,
  ViewerStateInterface
} from '../states/viewer.state';
export interface AppStateInterface {
  router?: RouterReducerState;
  player: PlayerStateInterface;
  viewer: ViewerStateInterface;
}

export const InitialAppState: AppStateInterface = {
  player: InitialPlayerState,
  viewer: InitialViewerState
};

export function getInitialState(): AppStateInterface {
  return InitialAppState;
}
