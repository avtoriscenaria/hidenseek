export const playerLeaveGame = async function (playerModal, player_id) {
  const player = await playerModal.findById(player_id);
  player.game_id = undefined;
  await player.save();
};
