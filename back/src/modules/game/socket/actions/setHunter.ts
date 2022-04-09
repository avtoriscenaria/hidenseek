export const setHunter = async function ({ selectedPlayer, game_id: room }) {
  const game = await this.gameModel.getById(room);

  if (Boolean(game)) {
    const updatedPlayers = game.players.map((p) => ({
      ...p,
      hunter: p._id.toString() === selectedPlayer.toString() || undefined,
    }));

    const gameData = { players: updatedPlayers };

    const updatedGame = await this.gameModel.update(
      { _id: game._id },
      gameData,
    );

    this.server.in(room).emit('update_game', { game: updatedGame });
  }
};
