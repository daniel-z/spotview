import {
  InitialConfigBarStateInterface,
  ConfigBarStateInterface
} from './config-bar/config-bar.model';

export interface ViewerStateInterface {
  bgImage: string;
  config: ConfigBarStateInterface;
}

export const BgImagesPool = [
  'https://images.unsplash.com/photo-1556988271-ef7cb443eeb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=80',
  'https://images.unsplash.com/photo-1547865561-347ca089b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=60',
  'https://images.unsplash.com/photo-1560001748-ea906810531c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=60',
  'https://images.unsplash.com/photo-1557637255-077a2542314c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
];

export const InitialViewerStateInterface: ViewerStateInterface = {
  bgImage: BgImagesPool[0],
  config: InitialConfigBarStateInterface
};
