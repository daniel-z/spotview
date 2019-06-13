import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Player, PlayerEvents, PlayerConfig, PlayerState } from '../player/player';
import { environment } from '../../../environments/environment';
import { get } from 'lodash';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private player: Player;
  private playerConfig: PlayerConfig;
  private readonly token = environment.token;
  private playerState: PlayerState;
  bgImage: string;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.onStateChange = this.onStateChange.bind(this);
  }

  ngOnInit() {
    console.log('token', this.token);

    this.playerConfig = {
      token: this.token,
      name: 'Spot Player',
      windowRef: window,
      onError: this.onError,
      onReady: this.onReady,
      onOffline: this.onOffline,
      onStateChange: this.onStateChange
    };

    this.player = new Player(this.playerConfig);
  }

  onError(type: string, data: object) {
    console.log(type, data);
  }

  onReady(type: string, data: object) {
    console.log(type, data);
  }

  onOffline(type: string, data: object) {
    console.log(type, data);
  }

  onStateChange(type: string, playerState: PlayerState) {
    this.playerState = playerState;
    this.updateViewer();
  }

  updateViewer(): void {
    console.log('this.playerState', this.playerState);
    const images = get(this.playerState, 'track_window.current_track.album.images');
    this.bgImage = images && images[2] ? images[2].url : null;
    this.changeDetector.detectChanges();
    console.log(this.bgImage);
  }
}
