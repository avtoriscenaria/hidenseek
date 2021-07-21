import { useHistory } from "react-router-dom";

import ROUTES from "constants/routes";
import { API } from "constants/api";
import LSData from "constants/LSData";
import messages from "constants/messages";
import { useAppLayoutContext } from "contexts/AppLayoutContext";
import useApiRequest from "common/hooks/useApiRequest";
import { useState } from "react";
import useTranslations from "common/hooks/useTranslations";
import { useSocketContext } from "contexts/SocketContext";

export const useGameCreateRequest = () => {
  const history = useHistory();

  const {} = useSocketContext();

  const { request } = useApiRequest(API.game.createtGame, {
    onSuccess: (data) => {
      console.log(data);
    },
    onFailure: (resMessage) => {},
  });

  return {
    request,
  };
};
