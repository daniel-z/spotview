import { Action } from '@ngrx/store';
import { AuthStateInterface } from '../states/auth.state';

export enum AuthActions {
  AUTH_SET_CREDENTIALS = 'AUTH_SET_CREDENTIALS'
}

export class AuthSetCredentialsAction implements Action {
  readonly type: string = AuthActions.AUTH_SET_CREDENTIALS;
  constructor(public payload: AuthStateInterface) {}
}

export type AuthActionType = AuthSetCredentialsAction;
