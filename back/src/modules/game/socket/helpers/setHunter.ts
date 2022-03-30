import { Socket } from 'socket.io';

export const setHunter = async function(client: Socket, selectedPlayer) {
    const { room } = client.handshake.query;

    if (!room) {
      return;
    }

    const game = await this.gameModel.findById(room);

    if (Boolean(game)) {
      const updatedPlayers = game.players.map((p) => ({
        ...p,
        hunter: p._id.toString() === selectedPlayer.toString() || undefined,
      }));

      game.players = updatedPlayers;

      await game.save();
      console.log("GAME HUNTER", game)

      this.server.in(room).emit('update_game', { game });
    }
}