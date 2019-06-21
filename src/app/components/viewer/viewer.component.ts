import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { get } from 'lodash';
import { Store, select } from '@ngrx/store';

import { PlayerStateInterface } from '../player/player.model';
import { Player } from '../player/player';
import { environment } from '../../../environments/environment';
import { TrackDisplayInterface } from '../track-display/track-display.model';
import { SpotifyPlayerService } from '../../services/spotify-player.service';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/store/states/app.state';
import {
  selectPlayerState,
  selectTrackDisplay
} from 'src/app/store/selectors/app.selectors';

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
  bgImage =
    'https://images.unsplash.com/photo-1556988271-ef7cb443eeb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=80';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private spotifyPlayerService: SpotifyPlayerService,
    private store: Store<AppStateInterface>
  ) {
    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.playerData$ = this.store.select(selectPlayerState);
    this.trackDisplayData$ = this.store.select(selectTrackDisplay);
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParams.token || this.token;
    this.createPlayer();
    this.getTrackDetails();
    this.playerData$.subscribe(data => {
      this.playerData = data;
    });
  }

  createPlayer() {
    this.player = this.spotifyPlayerService.initializePlayer({
      token: this.token,
      name: this.playerName,
      windowRef: this.windowRef
    });
  }

  updateViewer(): void {
    this.getTrackDetails();
    this.changeDetector.detectChanges();
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
    this.updateViewer();
  }

  onTogglePlay(): void {
    if (!this.player) {
      return;
    }

    this.player.togglePlay();
  }
}
