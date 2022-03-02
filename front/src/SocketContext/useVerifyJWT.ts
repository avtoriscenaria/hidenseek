import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { setOption } from "redux/reducers/options";
import { useAppDispatch } from "redux/hooks";
import localStorageHelper from "common/utils/localStorageHelper";
import LSData from "constants/LSData";
import verifyJWT from "common/utils/verifyJWT";
import { setPlayer } from "redux/reducers/player";
import ROUTES from "constants/routes";

const useVerifyJWT = (
  connectSocket: (token: string, game_id: string, player_id: string) => void
) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const { token } = localStorageHelper("get", LSData.authData) || {};

  useEffect(() => {
    console.log("MOUNT");
    verifyJWT(({ isVerified, player } = { isVerified: false }) => {
      console.log("verifyJWT");
      dispatch(setOption({ isAuthorized: isVerified }));
      if (isVerified && player?._id) {
        dispatch(setPlayer(player));
        console.log(player);
        if (player.game_id) {
          connectSocket(token, player.game_id, player._id);
        } else {
          setIsLoad(true);
        }
      } else {
        localStorageHelper("remove", LSData.authData);
        history.push(ROUTES.auth.base);
      }
    });
  }, [connectSocket, dispatch, history, token]);

  return {
    isLoad,
  };
};

export default useVerifyJWT;
