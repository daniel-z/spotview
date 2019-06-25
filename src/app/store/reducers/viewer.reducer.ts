import { ViewerActionType, ViewerActions } from '../actions/viewer.actions';
import { InitialViewerState } from '../states/viewer.state';

export function ViewerReducer(
  state = InitialViewerState,
  action: ViewerActionType
) {
  switch (action.type) {
    case ViewerActions.VIEWER_BGIMAGE_CHANGE:
      return { ...state, ...action.payload };
    case ViewerActions.VIEWER_CONFIG_TOGGLEAART:
    case ViewerActions.VIEWER_CONFIG_TOGGLE_ALWAYS_VISIBLE_AART:
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
