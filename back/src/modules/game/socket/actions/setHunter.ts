export const setHunter = async function ({ selectedPlayer, game_id: room }) {
  const game = await this.gameModel.findById(room);

  if (Boolean(game)) {
    const updatedPlayers = game.players.map((p) => ({
      ...p,
      hunter: p._id.toString() === selectedPlayer.toString() || undefined,
    }));

    game.players = updatedPlayers;

    await game.save();

    this.server.in(room).emit('update_game', { game });
  }
};
