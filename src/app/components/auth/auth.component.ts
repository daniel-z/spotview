import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/states/app.state';
import { SpotifyAuthService } from 'src/app/services/spotify-auth.service';
import { selectAuthState } from 'src/app/store/selectors/index';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppStateInterface>,
    private spotifyAuthService: SpotifyAuthService
  ) {}

  ngOnInit() {
    this.getAuthDataFromQString();
    this.store.select(selectAuthState).subscribe(authData => {
      if (authData.access_token) {
        this.router.navigate(['/']);
      }
    });
  }

  getAuthDataFromQString() {
    if (!this.route.snapshot.fragment) {
      return;
    }
    this.spotifyAuthService.saveAuthDataFromQueryFragment(
      this.route.snapshot.fragment
    );
  }

  getSpotifyAutorization() {
    this.spotifyAuthService.requestSpotifyAccess();
  }
}
