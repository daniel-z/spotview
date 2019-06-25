import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/store/states/app.state';
import { AuthStateInterface, InitialAuthState } from './auth.model';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  token = '';
  authData: AuthStateInterface = InitialAuthState;
  queryFragment = [];
  spotify = {
    scopes: [
      'streaming',
      'user-read-birthdate',
      'user-read-email',
      'user-read-private'
    ],
    SAuthorizeUrl: 'https://accounts.spotify.com/authorize',
    appAuthUrl: 'https://localhost:3000/auth'
  };

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit() {
    this.getAuthDataFromQString();
  }

  getAuthDataFromQString() {
    this.queryFragment =
      this.route.snapshot.fragment && this.route.snapshot.fragment.split('&');

    if (!this.queryFragment) {
      return;
    }

    this.queryFragment.forEach(str => {
      const [key, value] = str.split('=');
      this.authData[key] = value;
    });
    console.log(this.authData);
  }

  getSpotifyAutorization() {
    const qp = {
      redirect_uri: encodeURIComponent(this.spotify.appAuthUrl),
      scope: encodeURIComponent(this.spotify.scopes.join(' ')),
      response_type: 'token',
      state: 'dz'
    };

    let queryString = `?client_id=${encodeURIComponent(
      environment.spotify.auth.clientId
    )}`;

    Object.keys(qp).forEach(param => {
      queryString = queryString + `&${param}=${qp[param]}`;
    });

    window.location.href = `${this.spotify.SAuthorizeUrl}${queryString}`;
  }
}
