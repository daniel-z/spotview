import {
  PlayerConfigInterface,
  PlayerEvents,
  PlayerStateInterface
} from './player.model';

export class Player {
  private token: string;
  private spotifyLib: any;
  private windowRef: any;
  private player: any;
  private name: string;

  private onError: PlayerConfigInterface['onError'];
  private onReady: PlayerConfigInterface['onReady'];
  private onOffline: PlayerConfigInterface['onOffline'];
  private onStateChange: PlayerConfigInterface['onStateChange'];

  constructor(config: PlayerConfigInterface) {
    this.token = config.token;
    this.name = config.name || 'spotify cutom player';
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
    this.spotifyLib = this.windowRef.Spotify;
    this.player = new this.windowRef.Spotify.Player({
      name: this.name,
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
      (data: PlayerStateInterface) =>
        this.onStateChange(PlayerEvents.PLAYER_STATE_CHANGED, data)
    );
  }
}
