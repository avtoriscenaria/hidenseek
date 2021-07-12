import { HOST, STATUSES } from "constants/api";

interface ApiRequestProps {
  (
    apiData: { uri: string; method: string },
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
  { uri, method },
  { onSuccess = () => {}, onFailure = () => {} } = {}
) => {
  const request = async (data?: any) => {
    const res = await fetch(`${HOST}${uri}`, {
      method,
      headers: {
        "Content-Type": "application/json",
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
      responseActions(res, onSuccess, onFailure);
    }
  };

  return { request };
};

const responseActions = (
  res: responseActionsProps,
  onSuccess: (data?: any) => void,
  onFailure: (message?: string) => void
) => {
  const { status, data, message } = res;

  switch (status) {
    case STATUSES.success:
      onSuccess(data);
      break;
    case STATUSES.failure:
      onFailure(message);
      break;
    default:
      break;
  }
};

export default useApiRequest;
