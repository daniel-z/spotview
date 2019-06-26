import {
  InitialConfigBarStateInterface,
  ConfigBarStateInterface
} from './config-bar/config-bar.model';
import {
  UnsplashImageInterface,
  InitialUnsplashImageState
} from 'src/app/models/unsplash-image.model';

export interface ViewerStateInterface {
  bgImageIdx: number;
  bgImagePool: UnsplashImageInterface[];
  config: ConfigBarStateInterface;
}

export const InitialViewerStateInterface: ViewerStateInterface = {
  bgImageIdx: 0,
  bgImagePool: [InitialUnsplashImageState],
  config: InitialConfigBarStateInterface
};
