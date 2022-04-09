export const playerLeaveGame = async function (playerModel, player_id) {
  await this.playerModel.update({ _id: player_id }, {}, { game_id: undefined });
};
