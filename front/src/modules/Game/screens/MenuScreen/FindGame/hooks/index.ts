import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import useApiRequest from "common/hooks/useApiRequest";
import { GAME_STATUSES } from "constants/gameConstants";
import { useDispatch } from "react-redux";
import { setOption } from "redux/reducers/options";
import { setGame } from "redux/reducers/game";
import { useAppSelector } from "redux/hooks";
import { getPlayer } from "common/selectors";
import { initiateSocket, gameConnect } from "contexts/Socket/helpers/SocketIo";
import localStorageHelper from "common/utils/localStorageHelper";
import LSData from "constants/LSData";
import { useSocketContext } from "SocketContext/SocketContext";

export const useFindGameRequest = () => {
  const { connect } = useSocketContext();
  const dispatch = useDispatch();
  const { _id: player_id } = useAppSelector(getPlayer);
  const { token } = localStorageHelper("get", LSData.authData) || {};
  // const { setHasGame } = useAppLayoutContext();
  // const { setGame } = useSocketContext();

  const { request } = useApiRequest(API.game.findGame, {
    onSuccess: (res) => {
      const { game } = res;

      connect(token, game._id, player_id);
      dispatch(setGame(game));
      dispatch(setOption({ game_id: game._id, gameStatus: game.status }));
    },
    onFailure: (resMessage) => {
      console.log("SOMETHING GOES WRONG", resMessage);
    },
  });

  return {
    request,
  };
};
