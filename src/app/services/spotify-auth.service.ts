import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  AuthStateInterface,
  InitialAuthState
} from 'src/app/components/auth/auth.model';
import { environment } from 'src/environments/environment';

import { AppStateInterface } from '../store/states/app.state';
import { AuthSetCredentialsAction } from '../store/actions/auth.actions';
import { selectAuthState } from 'src/app/store/selectors/index';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyAuthService {
  token = '';
  queryFragment = [];
  private prependLocalStorage = 'vision_auth';
  actualAuthData: AuthStateInterface = { ...InitialAuthState };

  private spotifyScopes = [
    'streaming',
    'user-read-birthdate',
    'user-read-email',
    'user-read-private'
  ];

  constructor(private store: Store<AppStateInterface>) {
    this.getAuthFromLocalStorage();
    this.store.select(selectAuthState).subscribe(authData => {
      this.actualAuthData = authData;
      if (authData.access_token) {
        this.saveToLocalStorage(authData);
      }
    });
  }

  private saveSpotifyAuthData(authData: AuthStateInterface) {
    this.store.dispatch(new AuthSetCredentialsAction(authData));
  }

  private saveToLocalStorage(authData: AuthStateInterface) {
    Object.keys(authData).forEach(key => {
      localStorage.setItem(`${this.prependLocalStorage}_${key}`, authData[key]);
    });
  }

  private getAuthFromLocalStorage() {
    const authData: AuthStateInterface = { ...InitialAuthState };
    Object.keys(authData).forEach(key => {
      authData[key] = localStorage.getItem(
        `${this.prependLocalStorage}_${key}`
      );
    });

    if (authData.access_token === null) {
      return;
    }

    if (this.isAccessExpired(authData)) {
      this.cleanAllAuthData();
      return;
    }

    this.saveSpotifyAuthData(authData);
  }

  private cleanAllAuthData() {
    this.cleanLSAuthData();
    this.store.dispatch(new AuthSetCredentialsAction({ ...InitialAuthState }));
  }

  private isAccessExpired(authData: AuthStateInterface) {
    const actualTimeStamp = new Date().getTime();
    const tokenTimeStamp =
      parseInt(authData.auth_timestamp, 10) +
      parseInt(authData.expires_in, 10) * 1000;
    return actualTimeStamp > tokenTimeStamp;
  }

  private cleanLSAuthData() {
    const authData: AuthStateInterface = { ...InitialAuthState };
    Object.keys(authData).forEach(key => {
      authData[key] = localStorage.removeItem(
        `${this.prependLocalStorage}_${key}`
      );
    });
  }

  isAuthorized() {
    return (
      this.actualAuthData.access_token &&
      !this.isAccessExpired(this.actualAuthData)
    );
  }

  saveAuthDataFromQueryFragment(queryFragment: string) {
    const authData: AuthStateInterface = { ...InitialAuthState };
    queryFragment.split('&').forEach(str => {
      const [key, value] = str.split('=');
      authData[key] = value;
    });
    authData.auth_timestamp = new Date().getTime().toString();
    this.saveSpotifyAuthData(authData);
  }

  requestSpotifyAccess() {
    const qp = {
      redirect_uri: encodeURIComponent(environment.spotify.auth.callbackUrl),
      scope: encodeURIComponent(this.spotifyScopes.join(' ')),
      response_type: 'token',
      state: 'dz'
    };

    let queryString = `?client_id=${encodeURIComponent(
      environment.spotify.auth.clientId
    )}`;

    Object.keys(qp).forEach(param => {
      queryString = queryString + `&${param}=${qp[param]}`;
    });

    window.location.href = `${
      environment.spotify.auth.authorizeUrl
    }${queryString}`;
  }
}
