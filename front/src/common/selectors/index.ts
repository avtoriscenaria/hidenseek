export const getIsAuthorised = (state: any) => state.options.isAuthorized;
export const getGameStatus = (state: any) => state.game?.game?.status;
export const getGameId = (state: any) => state.options.game_id;
export const getPlayerId = (state: any) => state.player;
export const getPlayer = (state: any) => state.player.player;
export const getGame = (state: any) => state.game.game;
