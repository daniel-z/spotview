import {
  InitialConfigBarStateInterface,
  ConfigBarStateInterface
} from './config-bar/config-bar.model';

export interface ViewerStateInterface {
  bgImage: string;
  config: ConfigBarStateInterface;
}

export const InitialViewerStateInterface: ViewerStateInterface = {
  bgImage:
    'https://images.unsplash.com/photo-1556988271-ef7cb443eeb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=80',
  config: InitialConfigBarStateInterface
};
