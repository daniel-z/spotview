import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get } from 'lodash';

import * as PlayerModel from '../player/player.model';
import { Player } from '../player/player';
import { environment } from '../../../environments/environment';
import { TrackDetailsInterface } from '../track-display/track-display.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private token = environment.spotify.auth.token;
  private player: Player;
  playerState: PlayerModel.PlayerStateInterface =
    PlayerModel.InitialPlayerState;
  trackDetails: TrackDetailsInterface;
  windowRef: any = window;
  playerName = 'SpotyPlayer';

  bgImage =
    'https://images.unsplash.com/photo-1556988271-ef7cb443eeb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=80';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.onStateChange = this.onStateChange.bind(this);
    this.onTogglePlay = this.onTogglePlay.bind(this);
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams.token || this.token;
    this.createPlayer();
    this.getTrackDetails();
  }

  createPlayer() {
    this.player = new Player({
      token: this.token,
      name: this.playerName,
      windowRef: this.windowRef,
      onError: this.onError,
      onReady: this.onReady,
      onOffline: this.onOffline,
      onStateChange: this.onStateChange
    });
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

  onStateChange(type: string, playerState: PlayerModel.PlayerStateInterface) {
    this.playerState = playerState || PlayerModel.InitialPlayerState;
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

    this.player.togglePlay();
  }
}
