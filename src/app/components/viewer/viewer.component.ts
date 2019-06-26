import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get } from 'lodash';
import { Store, select } from '@ngrx/store';

import { PlayerStateInterface } from '../player/player.model';
import { Player } from '../player/player';
import { TrackDisplayInterface } from '../track-display/track-display.model';
import { ViewerStateInterface } from './viewer.model';
import { SpotifyPlayerService } from '../../services/spotify-player.service';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/store/states/app.state';
import {
  selectPlayerState,
  selectTrackDisplay,
  selectViewerState,
  selectAuthState
} from 'src/app/store/selectors';
import { ConfigBarStateInterface } from './config-bar/config-bar.model';
import { ViewerBGImageChangeAction } from '../../store/actions/viewer.actions';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { UnsplashApiService } from 'src/app/services/unsplash-api-service.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private token = '';
  private player: Player;
  windowRef: any = window;
  playerName = 'Vision Player';
  playerData: PlayerStateInterface;
  trackDisplayData$: Observable<TrackDisplayInterface>;
  viewer$: Observable<ViewerStateInterface>;
  bgImage: string;
  configBarState: ConfigBarStateInterface;
  isConnected = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private spotifyPlayerService: SpotifyPlayerService,
    private unsplashApiService: UnsplashApiService,
    private store: Store<AppStateInterface>
  ) {
    this.onTogglePlay = this.onTogglePlay.bind(this);
  }

  ngOnInit() {
    this.store.select(selectAuthState).subscribe(authData => {
      this.token = authData.access_token;
      this.createPlayer();
      this.getTrackDetails();
    });

    this.store.select(selectPlayerState).subscribe(playerData => {
      this.playerData = playerData;
      this.isConnected = this.spotifyPlayerService.isConnected();
    });

    this.store.select(selectViewerState).subscribe(vwstate => {
      this.bgImage = vwstate.bgImage;
      this.configBarState = vwstate.config;
    });

    this.trackDisplayData$ = this.store.select(selectTrackDisplay);
    this.unsplashApiService.getCollection().subscribe(data => {
      console.log(data);
    });
  }

  createPlayer() {
    this.player = this.spotifyPlayerService.initializePlayer({
      token: this.token,
      name: this.playerName,
      windowRef: this.windowRef
    });
  }

  getTrackDetails(): Observable<TrackDisplayInterface> {
    return this.trackDisplayData$;
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
    this.changeDetector.detectChanges();
  }

  onTogglePlay(): void {
    if (!this.player) {
      return;
    }

    this.player.togglePlay();
  }
}
