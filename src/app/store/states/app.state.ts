import { RouterReducerState } from '@ngrx/router-store';
import {
  InitialPlayerState,
  PlayerStateInterface
} from '../states/player.state';

export interface AppStateInterface {
  router?: RouterReducerState;
  player: PlayerStateInterface;
}

export const InitialAppState: AppStateInterface = {
  player: InitialPlayerState
};

export function getInitialState(): AppStateInterface {
  return InitialAppState;
}
