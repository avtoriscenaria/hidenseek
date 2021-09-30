import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import useApiRequest from "common/hooks/useApiRequest";
import { useSocketContext } from "contexts/Socket/SocketContext";
import { GAME_STATUSES } from "constants/gameConstants";

export const useFindGameRequest = () => {
  const history = useHistory();

  const { setHasGame } = useAppLayoutContext();
  const { setGame } = useSocketContext();

  const { request } = useApiRequest(API.game.findGame, {
    onSuccess: (res) => {
      const { game } = res;
      setHasGame(game._id);
      setGame(game);

      if (game.status === GAME_STATUSES.start) {
        history.push(ROUTES.game.config);
      } else if (game.status === GAME_STATUSES.in_process) {
        history.push(ROUTES.game.base);
      }
    },
    onFailure: (resMessage) => {
      console.log("SOMETHING GOES WRONG", resMessage);
    },
  });

  return {
    request,
  };
};
