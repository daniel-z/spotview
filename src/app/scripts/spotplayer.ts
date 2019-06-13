export class SpotPlayer {
    private token: string;
    private spotify: any;
    private windowRef: any;
    private player: any;

    constructor(token: string, name: string, windowRef: any ) {
        this.token = token;
        this.windowRef = windowRef;
        this.waitForSpotifyToStart();
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
        this.player.addListener('initialization_error', this.logError);
        this.player.addListener('authentication_error', this.logError);
        this.player.addListener('account_error', this.logError);
        this.player.addListener('playback_error', this.logError);

        this.player.addListener('ready', ({ device_id }) => console.log('Ready with Device ID', device_id));
        this.player.addListener('not_ready', ({ device_id }) => this.logMessage({ message: `Device ID has gone offline, ${device_id}`}));
        this.player.addListener('player_state_changed', (state) => this.logMessage({ message: state }));
    }

}

