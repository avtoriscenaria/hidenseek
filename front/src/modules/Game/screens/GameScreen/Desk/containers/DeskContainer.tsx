import useTranslations from "common/hooks/useTranslations";
import { useSocketContext } from "contexts/Socket/SocketContext";
import React from "react";
import DeskComponent from "../components/DeskComponent";

const DeskContainer: React.FC = () => {
  const { game } = useTranslations();
  const { myGamePlayer: { caught } = { caught: false } } = useSocketContext();

  return <DeskComponent caught={caught} caughtDescription={game.caught} />;
};

export default DeskContainer;
