import { RouterReducerState } from '@ngrx/router-store';
import {
  InitialPlayerState,
  PlayerStateInterface
} from '../states/player.state';

import {
  InitialViewerState,
  ViewerStateInterface
} from '../states/viewer.state';

import { InitialAuthState, AuthStateInterface } from '../states/auth.state';
export interface AppStateInterface {
  router?: RouterReducerState;
  player: PlayerStateInterface;
  viewer: ViewerStateInterface;
  auth: AuthStateInterface;
}

export const InitialAppState: AppStateInterface = {
  player: InitialPlayerState,
  viewer: InitialViewerState,
  auth: InitialAuthState
};

export function getInitialState(): AppStateInterface {
  return InitialAppState;
}
