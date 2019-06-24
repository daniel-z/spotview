import * as ViewerDisplay from '../../components/viewer/viewer.model';

export const InitialViewerState: ViewerDisplay.ViewerStateInterface = {
  ...ViewerDisplay.InitialViewerStateInterface
};

export function getInitialState(): ViewerDisplay.ViewerStateInterface {
  return InitialViewerState;
}

export { ViewerStateInterface } from '../../components/viewer/viewer.model';
