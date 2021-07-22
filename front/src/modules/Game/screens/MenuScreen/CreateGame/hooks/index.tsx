import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import useApiRequest from "common/hooks/useApiRequest";
import { useSocketContext } from "contexts/SocketContext";

export const useGameCreateRequest = () => {
  const history = useHistory();

  const { setHasGame } = useAppLayoutContext();
  const { setGame } = useSocketContext();

  const { request } = useApiRequest(API.game.createtGame, {
    onSuccess: ({ game }) => {
      setGame(game);
      setHasGame(game._id);
      history.push(ROUTES.game.base);
    },
    onFailure: (resMessage) => {
      console.log("SOMETHING GOES WRONG", resMessage);
    },
  });

  return {
    request,
  };
};
