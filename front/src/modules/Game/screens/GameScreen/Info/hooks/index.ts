import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import useApiRequest from "common/hooks/useApiRequest";
import { useSocketContext } from "contexts/Socket/SocketContext";

export const useExitGameRequest = () => {
  const history = useHistory();

  const { setHasGame, setPlayer, player = { _id: "" } } = useAppLayoutContext();
  const { setGame } = useSocketContext();

  const { request } = useApiRequest(
    { ...API.game.exitGame, uri: `${API.game.exitGame.uri}/${player._id}` },
    {
      onSuccess: ({ player }) => {
        console.log("player", player);
        setPlayer(player);
        setHasGame();
        setGame();

        history.push(ROUTES.game.menu);
      },
      onFailure: (resMessage) => {
        console.log("SOMETHING GOES WRONG", resMessage);
      },
    }
  );

  return {
    request,
  };
};
