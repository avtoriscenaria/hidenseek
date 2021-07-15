import { useHistory } from "react-router";
import { HOST, STATUSES } from "constants/api";
import LSData from "constants/LSData";
import ROUTES from "constants/routes";
import { History } from "history";

interface ApiRequestProps {
  (
    apiData: { uri: string; method: string; disableAuth?: boolean },
    actions?: {
      data?: any;
      onSuccess?: (data?: any) => void;
      onFailure?: () => void;
    }
  ): { request: (data?: any) => Promise<void> };
}

interface responseActionsProps {
  status: string;
  data?: any;
  message?: any;
}

const useApiRequest: ApiRequestProps = (
  { uri, method, disableAuth },
  { onSuccess = () => {}, onFailure = () => {} } = {}
) => {
  const history = useHistory();
  let Authorization: string;

  if (!disableAuth) {
    const authDataString = localStorage.getItem(LSData.authData);

    if (authDataString) {
      const { token } = JSON.parse(authDataString);

      Authorization = `Bearer ${token}`;
    }
  }

  const request = async (data?: any) => {
    const res = await fetch(`${HOST}${uri}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization,
      },
      body: data && method === "POST" ? JSON.stringify(data) : undefined,
    }).then((res) => {
      const { ok } = res;

      if (ok) {
        return res.json();
      } else {
        onFailure();
      }
    });

    if (res !== undefined) {
      responseActions(res, onSuccess, onFailure, history);
    }
  };

  return { request };
};

const responseActions = (
  res: responseActionsProps,
  onSuccess: (data?: any) => void,
  onFailure: (message?: string) => void,
  history: History<unknown> | string[]
) => {
  const { status, data, message } = res;

  switch (status) {
    case STATUSES.success:
      onSuccess(data);
      break;
    case STATUSES.failure:
      onFailure(message);
      break;
    case STATUSES.token_expiration:
      history.push(ROUTES.auth.base);
      //onFailure(message);
      break;
    default:
      break;
  }
};

export default useApiRequest;
