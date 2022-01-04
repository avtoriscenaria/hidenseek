import React from "react";

import ROUTES from "constants/routes";
import Route from "common/components/Route";
import Game from "modules/_Game";
import Account from "modules/Account";
import AppLayout from "common/containers/AppLayoutContainer";
import { SocketContextProvider } from "_SocketContext/SocketContext";

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
