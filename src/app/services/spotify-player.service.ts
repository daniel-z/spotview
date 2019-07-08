import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import * as PlayerModel from '../components/player/player.model';
import { Player } from '../components/player/player';
import { AppStateInterface } from '../store/states/app.state';
import { selectPlayerState } from '../store/selectors';
import {
  PlayerStateChangeAction,
  PlayerNextAction,
  PlayerPreviousAction
} from '../store/actions/player.actions';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlayerService {
  private player: Player;
  private playerConfig: PlayerModel.PlayerConfigInterface;

  playerState: PlayerModel.PlayerStateInterface = {
    ...PlayerModel.InitialPlayerState
  };

  constructor(private store: Store<AppStateInterface>) {
    this.store.select(selectPlayerState).subscribe(playerData => {
      this.playerState = playerData;
    });

    this.onReady = this.onReady.bind(this);
    this.onError = this.onError.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.onStateChange = this.onStateChange.bind(this);
  }

  initializePlayer(playerConfig: PlayerModel.PlayerConfigInterface): Player {
    this.playerConfig = playerConfig;
    return (this.player = new Player({
      ...this.playerConfig,
      onError: this.onError,
      onReady: this.onReady,
      onOffline: this.onOffline,
      onStateChange: this.onStateChange
    }));
  }

  isConnected() {
    return (
      this.playerState.timestamp !== PlayerModel.InitialPlayerState.timestamp
    );
  }
  onError(type: string, data: object) {
    console.error(type, data);
  }

  onReady(type: string, data: object) {
    // type: ready
    // data: {device_id: "5847bcbd5dcd9470099bada93fa8e7b932abab8a"}
    console.log(type, data);
  }

  onOffline(type: string, data: object) {
    console.log(type, data);
  }

  onStateChange(type: string, playerState: PlayerModel.PlayerStateInterface) {
    // type: player_state_changed
    this.store.dispatch(new PlayerStateChangeAction(playerState));
  }

  togglePlay(): void {
    this.player.togglePlay();
  }

  nextTrack(): void {
    this.player.nextTrack();
    this.store.dispatch(new PlayerNextAction());
  }

  previousTrack(): void {
    this.player.previousTrack();
    this.store.dispatch(new PlayerPreviousAction());
  }
}
