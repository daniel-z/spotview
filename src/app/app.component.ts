import { Component } from '@angular/core';
import { SpotifyAuthService } from './services/spotify-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spotyview';
  player: any;
  constructor(spotifyAuthService: SpotifyAuthService) {}
}
