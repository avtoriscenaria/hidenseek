import { HOST } from "constants/api";

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
        onSuccess(res.json());
      } else {
        onFailure();
      }
    });

    console.log(res);
  };

  return { request };
};

export default useApiRequest;
