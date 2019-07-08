import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PlayerStateInterface } from '../player/player.model';
import { TrackDisplayInterface } from '../track-display/track-display.model';
import { ViewerStateInterface } from './viewer.model';
import { SpotifyPlayerService } from '../../services/spotify-player.service';
import { AppStateInterface } from 'src/app/store/states/app.state';
import {
  selectPlayerState,
  selectTrackDisplay,
  selectViewerState,
  selectAuthState
} from 'src/app/store/selectors';
import { ConfigBarStateInterface } from './config-bar/config-bar.model';
import { ViewerBGImagePoolLoadAction } from '../../store/actions/viewer.actions';
import { UnsplashApiService } from 'src/app/services/unsplash-api-service.service';
import { UnsplashImageInterface } from 'src/app/models/unsplash-image.model';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private token = '';
  windowRef: any = window;
  playerName = 'Vision Player';
  playerData: PlayerStateInterface;
  trackDisplayData$: Observable<TrackDisplayInterface>;
  viewer$: Observable<ViewerStateInterface>;
  bgImage: UnsplashImageInterface;
  bgImagePool: ViewerStateInterface['bgImagePool'];
  configBarState: ConfigBarStateInterface;
  UnsplashBgImageCollectionId = '5049158';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private spotifyPlayerService: SpotifyPlayerService,
    private unsplashApiService: UnsplashApiService,
    private store: Store<AppStateInterface>
  ) {
    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  ngOnInit() {
    this.store.dispatch(
      new ViewerBGImagePoolLoadAction(this.UnsplashBgImageCollectionId)
    );

    this.store.select(selectAuthState).subscribe(authData => {
      this.token = authData.access_token;
      this.createPlayer();
      this.getTrackDetails();
    });

    this.store.select(selectPlayerState).subscribe(playerData => {
      this.playerData = playerData;
    });

    this.store.select(selectViewerState).subscribe(vwstate => {
      this.bgImage = vwstate.bgImagePool[vwstate.bgImageIdx];
      this.bgImagePool = vwstate.bgImagePool;
      this.configBarState = vwstate.config;
    });

    this.trackDisplayData$ = this.store.select(selectTrackDisplay);
  }

  createPlayer() {
    this.spotifyPlayerService.initializePlayer({
      token: this.token,
      name: this.playerName,
      windowRef: this.windowRef
    });
  }

  getTrackDetails(): Observable<TrackDisplayInterface> {
    return this.trackDisplayData$;
  }

  getBgImageStyle(): string {
    const bgImageUrl =
      this.bgImage && this.bgImage.urls ? this.bgImage.urls.full : '';
    return `url('${bgImageUrl}')`;
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

  isConnected(): boolean {
    return this.spotifyPlayerService.isConnected();
  }

  onTogglePlay(): void {
    if (!this.isConnected()) {
      return;
    }

    this.spotifyPlayerService.togglePlay();
  }

  onNext(): void {
    if (!this.isConnected()) {
      return;
    }

    console.log('next');
  }

  onPrevious(): void {
    if (!this.isConnected()) {
      return;
    }

    console.log('previous');
  }
}
