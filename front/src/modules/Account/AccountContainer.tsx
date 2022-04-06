import React from "react";
import { useDispatch } from "react-redux";

import { Button } from "common/components";
import useTranslations from "common/hooks/useTranslations";
import { localStorageHelper } from "common/utils";
import { setGame, setOption, setPlayer } from "redux/reducers";
import { useSocketContext } from "SocketContext";

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
