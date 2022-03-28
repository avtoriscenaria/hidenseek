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
  connectSocket: (token: string, player_id: string, game_id?: string) => void
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
      
        //if (player.game_id) {
          connectSocket(token, player._id, player.game_id);
        //} else {
          setIsLoad(true);
        //}
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
