import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { localStorageHelper, verifyJWT } from "common/utils";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";
import { useAppDispatch } from "redux/hooks";
import { setOption, setPlayer } from "redux/reducers";

const useVerifyJWT = (
  connectSocket: (token: string, player_id: string, game_id?: string) => void
) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isLoad, setIsLoad] = useState(false);
  const { token } = localStorageHelper("get", LSData.authData) || {};

  useEffect(() => {
    verifyJWT(({ isVerified, player } = { isVerified: false }) => {
      dispatch(setOption({ isAuthorized: isVerified }));
      if (isVerified && player?._id) {
        dispatch(setPlayer(player));

        connectSocket(token, player._id, player.game_id);

        setIsLoad(true);
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
