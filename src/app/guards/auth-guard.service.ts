import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    public spotifyAuthService: SpotifyAuthService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.spotifyAuthService.isAuthorized()) {
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
