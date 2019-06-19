import * as PlayerModel from './player.model';

export class Player {
  private token: string;
  private spotify: any;
  private windowRef: any;
  private player: any;

  private onError: PlayerModel.PlayerConfig['onError'];
  private onReady: PlayerModel.PlayerConfig['onReady'];
  private onOffline: PlayerModel.PlayerConfig['onOffline'];
  private onStateChange: PlayerModel.PlayerConfig['onStateChange'];

  constructor(config: PlayerModel.PlayerConfig) {
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
    this.player.addListener(
      PlayerModel.PlayerEvents.INITIALIZATION_ERROR,
      (data: object) =>
        this.onError(PlayerModel.PlayerEvents.INITIALIZATION_ERROR, data)
    );

    this.player.addListener(
      PlayerModel.PlayerEvents.AUTHENTICATION_ERROR,
      (data: object) =>
        this.onError(PlayerModel.PlayerEvents.AUTHENTICATION_ERROR, data)
    );

    this.player.addListener(
      PlayerModel.PlayerEvents.ACCOUNT_ERROR,
      (data: object) =>
        this.onError(PlayerModel.PlayerEvents.ACCOUNT_ERROR, data)
    );

    this.player.addListener(
      PlayerModel.PlayerEvents.PLAYBACK_ERROR,
      (data: object) =>
        this.onError(PlayerModel.PlayerEvents.PLAYBACK_ERROR, data)
    );

    this.player.addListener(PlayerModel.PlayerEvents.READY, (data: object) =>
      this.onReady(PlayerModel.PlayerEvents.READY, data)
    );

    this.player.addListener(
      PlayerModel.PlayerEvents.NOT_READY,
      (data: object) => this.onOffline(PlayerModel.PlayerEvents.NOT_READY, data)
    );

    this.player.addListener(
      PlayerModel.PlayerEvents.PLAYER_STATE_CHANGED,
      (data: PlayerModel.PlayerState) =>
        this.onStateChange(PlayerModel.PlayerEvents.PLAYER_STATE_CHANGED, data)
    );
  }
}
