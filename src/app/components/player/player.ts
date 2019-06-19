export interface PlayerConfig {
  token: string;
  windowRef: any;
  name?: string;
  onError: (type: string, data: object) => void;
  onReady: (type: string, data: object) => void;
  onOffline: (type: string, data: object) => void;
  onStateChange: (type: string, playerState: PlayerState) => void;
}

export interface PlayerState {
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
        images: [
          {
            url?: string;
          }
        ];
      };
      artists: [
        {
          name?: string;
        }
      ];
    };
  };
}

const defaultAlbumArtImage =
  'https://images.unsplash.com/photo-1526121548504-55f319b740ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80';

export const playerStateDefaults: PlayerState = {
  duration: 0,
  paused: true,
  position: 0,
  repeat_mode: 0,
  shuffle: false,
  timestamp: 0,
  track_window: {
    current_track: {
      name: '-No Name-',
      album: {
        name: '-No Album-',
        images: [{}, {}, { url: defaultAlbumArtImage }]
      },
      artists: [
        {
          name: '-No Artist-'
        }
      ]
    }
  }
};

export enum PlayerEvents {
  'INITIALIZATION_ERROR' = 'initialization_error',
  'AUTHENTICATION_ERROR' = 'authentication_error',
  'ACCOUNT_ERROR' = 'account_error',
  'PLAYBACK_ERROR' = 'playback_error',
  'READY' = 'ready',
  'NOT_READY' = 'not_ready',
  'PLAYER_STATE_CHANGED' = 'player_state_changed'
}

export class Player {
  private token: string;
  private spotify: any;
  private windowRef: any;
  private player: any;

  private onError: PlayerConfig['onError'];
  private onReady: PlayerConfig['onReady'];
  private onOffline: PlayerConfig['onOffline'];
  private onStateChange: PlayerConfig['onStateChange'];

  constructor(config: PlayerConfig) {
    this.token = config.token;
    this.windowRef = config.windowRef;
    this.waitForSpotifyToStart();
    this.onError = config.onError;
    this.onReady = config.onReady;
    this.onOffline = config.onOffline;
    this.onStateChange = config.onStateChange;
  }

  private waitForSpotifyToStart() {
    this.windowRef.onSpotifyWebPlaybackSDKReady = () => {
      this.initPlayer();
      this.initEvents();
      this.player.connect();
    };
  }

  private initPlayer() {
    this.spotify = this.windowRef.Spotify;
    this.player = new this.windowRef.Spotify.Player({
      name: 'SPOTVIEW',
      getOAuthToken: (cb: (token: string) => void) => {
        cb(this.token);
      }
    });
  }

  private connectPlayer() {
    this.player.connect();
  }

  // player basic operations
  public togglePlay(): Promise<PromiseConstructor> {
    return this.player.togglePlay();
  }

  private logMessage({ message }): void {
    console.log(message);
  }

  private logError({ message }): void {
    console.error(message);
  }

  private initEvents() {
    this.player.addListener(PlayerEvents.INITIALIZATION_ERROR, (data: object) =>
      this.onError(PlayerEvents.INITIALIZATION_ERROR, data)
    );

    this.player.addListener(PlayerEvents.AUTHENTICATION_ERROR, (data: object) =>
      this.onError(PlayerEvents.AUTHENTICATION_ERROR, data)
    );

    this.player.addListener(PlayerEvents.ACCOUNT_ERROR, (data: object) =>
      this.onError(PlayerEvents.ACCOUNT_ERROR, data)
    );

    this.player.addListener(PlayerEvents.PLAYBACK_ERROR, (data: object) =>
      this.onError(PlayerEvents.PLAYBACK_ERROR, data)
    );

    this.player.addListener(PlayerEvents.READY, (data: object) =>
      this.onReady(PlayerEvents.READY, data)
    );

    this.player.addListener(PlayerEvents.NOT_READY, (data: object) =>
      this.onOffline(PlayerEvents.NOT_READY, data)
    );

    this.player.addListener(
      PlayerEvents.PLAYER_STATE_CHANGED,
      (data: PlayerState) =>
        this.onStateChange(PlayerEvents.PLAYER_STATE_CHANGED, data)
    );
  }
}
