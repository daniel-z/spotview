import {
  ViewerBGImageChangeAction,
  ViewerConfigBarToggleAArtAction,
  ViewerActionType,
  ViewerActions
} from '../actions/viewer.actions';

import { InitialConfigBarStateInterface } from '../states/config-bar.state';
import { InitialViewerState } from '../states/viewer.state';

export function ViewerReducer(
  state = InitialViewerState,
  action: ViewerActionType
) {
  switch (action.type) {
    case ViewerActions.VIEWER_BGIMAGE_CHANGE:
      return { ...state, ...action.payload };
    case ViewerActions.VIEWER_CONFIG_TOGGLEAART:
      const newState = {
        ...state,
        config: {
          ...state.config,
          ...action.payload
        }
      };
      return newState;
    default:
      return state;
  }
}
