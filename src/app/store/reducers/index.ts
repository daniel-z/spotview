import { ActionReducerMap, createReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { AppStateInterface } from '../states/app.state';
import { PlayerReducer } from './player.reducer';

export const AppReducers: ActionReducerMap<AppStateInterface, any> = {
  router: routerReducer,
  player: PlayerReducer
};
