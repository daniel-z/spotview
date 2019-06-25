import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import {
  AuthStateInterface,
  InitialAuthState
} from 'src/app/components/auth/auth.model';
import { environment } from 'src/environments/environment';

import { AppStateInterface } from '../store/states/app.state';
import { AuthSetCredentialsAction } from '../store/actions/auth.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
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

  constructor(private store: Store<AppStateInterface>) {}

  saveAuthDataFromQueryFragment(queryFragment: string) {
    queryFragment.split('&').forEach(str => {
      const [key, value] = str.split('=');
      this.authData[key] = value;
    });
  }

  saveSpotifyAuthData() {
    this.store.dispatch(new AuthSetCredentialsAction(this.authData));
  }

  requestSpotifyAccess() {
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
