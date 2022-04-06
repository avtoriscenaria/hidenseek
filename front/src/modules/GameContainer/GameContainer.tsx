import React from "react";

import { Route } from "common/components";
import { AppLayout } from "common/containers";
import ROUTES from "constants/routes";
import Account from "modules/Account";
import Game from "modules/Game";
import { SocketContextProvider } from "SocketContext";

const GameContainer: React.FC = () => {
  return (
    <SocketContextProvider>
      <AppLayout>
        <Route path={ROUTES.game.base} component={Game} />
        <Route path={ROUTES.account.base} component={Account} />
      </AppLayout>
    </SocketContextProvider>
  );
};

export default GameContainer;
