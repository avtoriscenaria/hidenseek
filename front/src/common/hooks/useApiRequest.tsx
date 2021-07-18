import { HOST, STATUSES } from "constants/api";
import LSData from "constants/LSData";
import { useAppLayoutContext } from "contexts/AppLayoutContext";

interface ApiRequestProps {
  (
    apiData: { uri: string; method: string; disableAuth?: boolean },
    actions?: {
      data?: any;
      onSuccess?: (data?: any) => void;
      onFailure?: (data?: any) => void;
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
  const { logout } = useAppLayoutContext();
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
      responseActions(res, onSuccess, onFailure, logout);
    }
  };

  return { request };
};

const responseActions = (
  res: responseActionsProps,
  onSuccess: (data?: any) => void,
  onFailure: (message?: string) => void,
  logout: () => void
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
      logout();
      break;
    default:
      break;
  }
};

export default useApiRequest;
