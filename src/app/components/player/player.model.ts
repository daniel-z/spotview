export interface PlayerConfigInterface {
  token: string;
  windowRef: any;
  name?: string;
  onError?: (type: string, data: object) => void;
  onReady?: (type: string, data: object) => void;
  onOffline?: (type: string, data: object) => void;
  onStateChange?: (type: string, playerState: PlayerStateInterface) => void;
}

interface Image {
  url?: string;
}

export interface PlayerStateInterface {
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  shuffle: boolean;
  timestamp: number;
  track_window: {
    current_track: {
      name: string;
      album: {
        name: string;
        images: Image[];
      };
      artists: [
        {
          name?: string;
        }
      ];
    };
  };
}

export enum PlayerEvents {
  'INITIALIZATION_ERROR' = 'initialization_error',
  'AUTHENTICATION_ERROR' = 'authentication_error',
  'ACCOUNT_ERROR' = 'account_error',
  'PLAYBACK_ERROR' = 'playback_error',
  'READY' = 'ready',
  'NOT_READY' = 'not_ready',
  'PLAYER_STATE_CHANGED' = 'player_state_changed'
}

const defaultAlbumArtImage =
  'https://images.unsplash.com/photo-1526121548504-55f319b740ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

export const InitialPlayerState: PlayerStateInterface = {
  duration: 0,
  paused: true,
  position: 0,
  repeat_mode: 0,
  shuffle: false,
  timestamp: 0,
  track_window: {
    current_track: {
      name: 'No Name',
      album: {
        name: 'No Album',
        images: [{}, {}, { url: defaultAlbumArtImage }]
      },
      artists: [
        {
          name: 'No Artist'
        }
      ]
    }
  }
};
