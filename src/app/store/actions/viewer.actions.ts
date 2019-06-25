import { Action } from '@ngrx/store';
import { ViewerStateInterface } from '../../components/viewer/viewer.model';
import { ConfigBarStateInterface } from '../../components/viewer/config-bar/config-bar.model';

export enum ViewerActions {
  VIEWER_BGIMAGE_CHANGE = 'VIEWER_BGIMAGE_CHANGE',
  VIEWER_CONFIG_TOGGLEAART = 'VIEWER_CONFIG_TOGGLEAART',
  VIEWER_CONFIG_TOGGLE_ALWAYS_VISIBLE_AART = 'VIEWER_CONFIG_TOGGLE_ALWAYS_VISIBLE_AART'
}

export class ViewerBGImageChangeAction implements Action {
  readonly type: string = ViewerActions.VIEWER_BGIMAGE_CHANGE;
  constructor(public payload: ViewerStateInterface) {}
}

export class ViewerConfigBarToggleAArtAction implements Action {
  readonly type: string = ViewerActions.VIEWER_CONFIG_TOGGLEAART;
  constructor(public payload: { displayAlbumArt: boolean }) {}
}

export class ViewerConfigBarToggleAlwaysVisibleAArtAction implements Action {
  readonly type: string =
    ViewerActions.VIEWER_CONFIG_TOGGLE_ALWAYS_VISIBLE_AART;
  constructor(public payload: { albumArtAlwaysVisible: boolean }) {}
}

export type ViewerActionType =
  | ViewerBGImageChangeAction
  | ViewerConfigBarToggleAArtAction
  | ViewerConfigBarToggleAlwaysVisibleAArtAction;
