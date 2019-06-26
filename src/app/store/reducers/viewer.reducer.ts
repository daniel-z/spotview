import { ViewerActionType, ViewerActions } from '../actions/viewer.actions';
import { InitialViewerState } from '../states/viewer.state';

export function ViewerReducer(
  state = InitialViewerState,
  action: ViewerActionType
) {
  const payload = action.payload || {};
  switch (action.type) {
    case ViewerActions.VIEWER_BGIMAGEPOOL_LOAD:
      return {
        ...state
      };
    case ViewerActions.VIEWER_BGIMAGEPOOL_LOAD_SUCCESS:
    case ViewerActions.VIEWER_BGIMAGE_CHANGE:
      return {
        ...state,
        ...payload
      };
    case ViewerActions.VIEWER_CONFIG_TOGGLEAART:
    case ViewerActions.VIEWER_CONFIG_TOGGLE_ALWAYS_VISIBLE_AART:
      const newState = {
        ...state,
        config: {
          ...state.config,
          ...payload
        }
      };
      return newState;
    default:
      return state;
  }
}
