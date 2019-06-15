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
  windowRef: any = window;
  // tslint:disable-next-line: max-line-length
  bgImage = 'https://images.unsplash.com/photo-1556988271-ef7cb443eeb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2857&q=80';

  constructor(private changeDetector: ChangeDetectorRef) {
    this.onStateChange = this.onStateChange.bind(this);
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
    this.playerState = playerState;
    this.updateViewer();
  }

  updateViewer(): void {
    console.log('this.playerState', this.playerState);
    this.changeDetector.detectChanges();
  }

  getBgImageStyle(): string {
    console.log(this.bgImage);
    return `url('${this.bgImage}')`;
  }

  getWindowHeightPx(): string {
    return `${this.windowRef.window.innerHeight}px`;
  }

  getAlbumImageUrl(): string {
    const images = get(this.playerState, 'track_window.current_track.album.images');
    // return images && images[2] ? `url('${images[2].url}')` : null;
    return 'url("https://i.scdn.co/image/58012c06f80ffec8f785d5feca212f3e4c135667")';
  }

  getWindowWidthtPx(): string {
    return `${this.windowRef.window.innerWidth}px`;
  }
}
