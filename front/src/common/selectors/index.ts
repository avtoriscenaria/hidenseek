export const getIsAuthorised = (state: any) => state.options.isAuthorized;
export const getIsLoaded = (state: any) => state.options.isLoaded;
export const getGameStatus = (state: any) => state.game?.game?.status;
export const getMyGamePlayer = (state: any) =>
  state.game?.game?.players.find(
    (p: any) => p._id === state.player?.player?._id
  );
export const getTimer = (state: any) => state.options.timer;
export const getGameId = (state: any) => state.options.game_id;
export const getPlayerId = (state: any) => state.player;
export const getPlayer = (state: any) => state.player.player || {};
export const getGame = (state: any) => state.game.game;
export const getMessage = (state: any) => state.options.message;
