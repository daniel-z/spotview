import {
  ViewerBGImageChangeAction,
  ViewerActionType,
  ViewerActions
} from '../actions/viewer.actions';

import { InitialViewerState } from '../states/viewer.state';

export function ViewerReducer(
  state = InitialViewerState,
  action: ViewerActionType
) {
  switch (action.type) {
    case ViewerActions.VIEWER_BGIMAGE_CHANGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
