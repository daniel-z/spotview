import { Component, OnInit } from '@angular/core';
import { Player, PlayerEvents, PlayerConfig } from '../player/player';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private player: Player;
  private playerConfig: PlayerConfig;
  private readonly token = environment.token;

  constructor() { }

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

  onStateChange(type: string, data: object) {
    console.log(type, data);
  }
}
