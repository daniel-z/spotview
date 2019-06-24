import { Action } from '@ngrx/store';
import { ViewerStateInterface } from '../../components/viewer/viewer.model';

export enum ViewerActions {
  VIEWER_BGIMAGE_CHANGE = 'VIEWER_BGIMAGE_CHANGE'
}

export class ViewerBGImageChangeAction implements Action {
  readonly type: string = ViewerActions.VIEWER_BGIMAGE_CHANGE;
  constructor(public payload: ViewerStateInterface) {}
}

export type ViewerActionType = ViewerBGImageChangeAction;
