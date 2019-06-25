import { AuthActionType, AuthActions } from '../actions/auth.actions';
import { AuthStateInterface, InitialAuthState } from '../states/auth.state';

export function AuthReducer(state = InitialAuthState, action: AuthActionType) {
  switch (action.type) {
    case AuthActions.AUTH_SET_CREDENTIALS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
