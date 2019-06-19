import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  Player,
  PlayerEvents,
  PlayerConfig,
  PlayerState,
  playerStateDefaults
} from '../player/player';
import { environment } from '../../../environments/environment';
import { TrackDetails } from '../track-display/track-display.component';
import { get } from 'lodash';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private player: Player;
  private playerConfig: PlayerConfig;
  private readonly token = environment.spotify.auth.token;
  playerState: PlayerState = playerStateDefaults;
  trackDetails: TrackDetails;
  windowRef: any = window;

  bgImage =
    'https://images.unsplash.com/photo-1556988271-ef7cb443eeb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=80';

  constructor(private changeDetector: ChangeDetectorRef) {
    this.onStateChange = this.onStateChange.bind(this);
    this.onTogglePlay = this.onTogglePlay.bind(this);
  }

  ngOnInit() {
    console.log('token', this.token);

    this.playerConfig = {
      token: this.token,
      name: 'Spot Player',
      windowRef: this.windowRef,
      onError: this.onError,
      onReady: this.onReady,
      onOffline: this.onOffline,
      onStateChange: this.onStateChange
    };
    this.player = new Player(this.playerConfig);
    this.playerState = playerStateDefaults;
    this.getTrackDetails();
  }

  onError(type: string, data: object) {
    console.error(type, data);
  }

  onReady(type: string, data: object) {
    console.log(type, data);
  }

  onOffline(type: string, data: object) {
    console.log(type, data);
  }

  onStateChange(type: string, playerState: PlayerState) {
    this.playerState = playerState || playerStateDefaults;
    console.log('this.playerState', this.playerState);
    this.updateViewer();
  }

  updateViewer(): void {
    this.getTrackDetails();
    this.changeDetector.detectChanges();
  }

  getTrackDetails(): void {
    this.trackDetails = {
      trackName: get(this.playerState, 'track_window.current_track.name'),
      artistName: get(
        this.playerState,
        'track_window.current_track.artists[0].name'
      ),
      album: {
        albumImageUrl: get(
          this.playerState,
          'track_window.current_track.album.images[2].url'
        ),
        name: get(this.playerState, 'track_window.current_track.album.name')
      }
    };
  }

  getBgImageStyle(): string {
    return `url('${this.bgImage}')`;
  }

  getWindowHeightPx(): string {
    return `${this.windowRef.window.innerHeight}px`;
  }

  getWindowWidthtPx(): string {
    return `${this.windowRef.window.innerWidth}px`;
  }

  onResize(): void {
    this.updateViewer();
  }

  onTogglePlay(): void {
    if (!this.player) {
      return;
    }

    this.player.togglePlay().then(() => {
      console.log('Toggled playback!');
    });
  }
}
