import { Action } from '@ngrx/store';
import { ViewerStateInterface } from '../../components/viewer/viewer.model';

export enum ViewerActions {
  VIEWER_BGIMAGE_CHANGE = 'VIEWER_BGIMAGE_CHANGE',
  VIEWER_BGIMAGEPOOL_LOAD = 'VIEWER_BGIMAGEPOOL_LOAD',
  VIEWER_BGIMAGEPOOL_LOAD_SUCCESS = 'VIEWER_BGIMAGEPOOL_LOAD_SUCCESS',
  VIEWER_CONFIG_TOGGLEAART = 'VIEWER_CONFIG_TOGGLEAART',
  VIEWER_CONFIG_TOGGLE_ALWAYS_VISIBLE_AART = 'VIEWER_CONFIG_TOGGLE_ALWAYS_VISIBLE_AART'
}

export class ViewerBGImageChangeAction implements Action {
  readonly type: string = ViewerActions.VIEWER_BGIMAGE_CHANGE;
  constructor(public payload: { bgImageIdx: number }) {}
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

export class ViewerBGImagePoolLoadAction implements Action {
  readonly type: string = ViewerActions.VIEWER_BGIMAGEPOOL_LOAD;
  constructor(public payload: string) {}
}

export class ViewerBGImagePoolLoadSuccessAction implements Action {
  readonly type: string = ViewerActions.VIEWER_BGIMAGEPOOL_LOAD_SUCCESS;
  constructor(
    public payload: { bgImagePool: ViewerStateInterface['bgImagePool'] }
  ) {}
}

export type ViewerActionType =
  | ViewerBGImageChangeAction
  | ViewerConfigBarToggleAArtAction
  | ViewerConfigBarToggleAlwaysVisibleAArtAction
  | ViewerBGImagePoolLoadAction
  | ViewerBGImagePoolLoadSuccessAction;
