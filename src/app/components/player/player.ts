
export interface PlayerConfig {
    token: string;
    windowRef: any;
    name?: string;
    onError: (type: string, data: object) => void;
    onReady: (type: string, data: object) => void;
    onOffline: (type: string, data: object) => void;
    onStateChange: (type: string, data: object) => void;
}

export enum PlayerEvents {
    'INITIALIZATION_ERROR' = 'initialization_error',
    'AUTHENTICATION_ERROR' = 'authentication_error',
    'ACCOUNT_ERROR' = 'account_error',
    'PLAYBACK_ERROR' = 'playback_error',
    'READY' = 'ready',
    'NOT_READY' = 'not_ready',
    'PLAYER_STATE_CHANGED' = 'player_state_changed',
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

    waitForSpotifyToStart() {
        this.windowRef.onSpotifyWebPlaybackSDKReady = () => {
            this.initPlayer();
            this.initEvents();
            this.player.connect();
        };
    }

    initPlayer() {
        this.spotify = this.windowRef.Spotify;
        this.player = new this.windowRef.Spotify.Player({
            name: 'SPOTVIEW',
            getOAuthToken: (cb) => {
                cb(this.token);
            }
        });
    }

    connectPlayer() {
        this.player.connect();
    }

    logMessage({ message }): void {
        console.log(message);
    }

    logError({ message }): void {
        console.error(message);
    }

    initEvents() {
        this.player.addListener(PlayerEvents.INITIALIZATION_ERROR, (data: object) => this.onError(PlayerEvents.INITIALIZATION_ERROR, data));
        this.player.addListener(PlayerEvents.AUTHENTICATION_ERROR, (data: object) => this.onError(PlayerEvents.AUTHENTICATION_ERROR, data));
        this.player.addListener(PlayerEvents.ACCOUNT_ERROR, (data: object) => this.onError(PlayerEvents.ACCOUNT_ERROR, data));
        this.player.addListener(PlayerEvents.PLAYBACK_ERROR, (data: object) => this.onError(PlayerEvents.PLAYBACK_ERROR, data));

        this.player.addListener(PlayerEvents.READY, (data: object) => this.onError(PlayerEvents.READY, data));
        this.player.addListener(PlayerEvents.NOT_READY, (data: object) => this.onError(PlayerEvents.NOT_READY, data));
        this.player.addListener(PlayerEvents.PLAYER_STATE_CHANGED, (data: object) => this.onError(PlayerEvents.PLAYER_STATE_CHANGED, data));
    }

}

