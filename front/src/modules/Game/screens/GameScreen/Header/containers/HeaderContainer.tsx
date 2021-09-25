import React from "react";

import { useSocketContext } from "contexts/Socket/SocketContext";

import HeaderComponent from "../components/HeaderComponent";

const HeaderContainer: React.FC = () => {
  const { timer, myGamePlayer } = useSocketContext();

  return <HeaderComponent timer={timer} step={myGamePlayer?.step} />;
};

export default HeaderContainer;
