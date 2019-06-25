import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get } from 'lodash';
import { Store, select } from '@ngrx/store';

import { PlayerStateInterface } from '../player/player.model';
import { Player } from '../player/player';
import { environment } from '../../../environments/environment';
import { TrackDisplayInterface } from '../track-display/track-display.model';
import { ViewerStateInterface } from './viewer.model';
import { SpotifyPlayerService } from '../../services/spotify-player.service';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/store/states/app.state';
import {
  selectPlayerState,
  selectTrackDisplay,
  selectViewerState
} from 'src/app/store/selectors';
import { ConfigBarStateInterface } from './config-bar/config-bar.model';
import { ViewerBGImageChangeAction } from '../../store/actions/viewer.actions';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private token = environment.spotify.auth.token;
  private player: Player;
  windowRef: any = window;
  playerName = 'SpotyPlayer';
  playerData$: Observable<PlayerStateInterface>;
  playerData: PlayerStateInterface;
  trackDisplayData$: Observable<TrackDisplayInterface>;
  viewer$: Observable<ViewerStateInterface>;
  bgImage: string;
  configBarState: ConfigBarStateInterface;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private spotifyPlayerService: SpotifyPlayerService,
    private store: Store<AppStateInterface>
  ) {
    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.playerData$ = this.store.select(selectPlayerState);
    this.trackDisplayData$ = this.store.select(selectTrackDisplay);
    this.viewer$ = this.store.select(selectViewerState);
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams.token || this.token;
    this.createPlayer();
    this.getTrackDetails();

    this.playerData$.subscribe(data => {
      this.playerData = data;
    });

    this.viewer$.subscribe(vwstate => {
      this.bgImage = vwstate.bgImage;
      this.configBarState = vwstate.config;
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
