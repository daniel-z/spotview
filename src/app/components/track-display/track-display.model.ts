export interface TrackDisplayInterface {
  displayAlbumArt: boolean;
  albumArtAlwaysVisible: boolean;
  trackName: string;
  artistName: string;
  album: {
    albumImageUrl: string;
    name: string;
  };
}

const InitialTrackBgImage =
  'https://images.unsplash.com/photo-1526121548504-55f319b740ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

export const InitialTrackDisplayState: TrackDisplayInterface = {
  displayAlbumArt: true,
  albumArtAlwaysVisible: false,
  trackName: '[No Track]',
  artistName: '[No Artist]',
  album: {
    albumImageUrl: InitialTrackBgImage,
    name: '[No Album]'
  }
};
