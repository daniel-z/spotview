import * as PlayerModel from '../../components/player/player.model';

export const InitialPlayerState: PlayerModel.PlayerStateInterface = {
  ...PlayerModel.InitialPlayerState
};

export function getInitialState(): PlayerModel.PlayerStateInterface {
  return InitialPlayerState;
}

export { PlayerStateInterface } from '../../components/player/player.model';
