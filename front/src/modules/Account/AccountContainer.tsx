import React from "react";

import useTranslations from "common/hooks/useTranslations";
import { useDispatch } from "react-redux";
import Button from "common/components/Button";
import { useSocketContext } from "SocketContext/SocketContext";
import { setOption } from "redux/reducers/options";
import { setGame } from "redux/reducers/game";
import { setPlayer } from "redux/reducers/player";
import localStorageHelper from "common/utils/localStorageHelper";

const AccountContainer: React.FC = () => {
  const { disconnect } = useSocketContext();
  const { account: translations } = useTranslations();
  const dispatch = useDispatch();

  const logout = () => {
    disconnect();
    dispatch(
      setOption({
        game_id: "",
        isAuthorized: false,
        isLoaded: false,
        gameStatus: "",
      })
    );
    dispatch(setGame(null));
    dispatch(setPlayer(null));
    localStorageHelper("remove", "authData");
  };

  return (
    <div>
      <Button label={translations.logout} onClick={logout} />
    </div>
  );
};

export default AccountContainer;
