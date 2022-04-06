import { useCallback, useState } from "react";

const useApiRequest = (
  request: (data: any) => Promise<Response>,
  onSuccess: (data: any) => void = () => {},
  onFailure: () => void = () => {}
) => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const requestFunction = useCallback(
    async (data: any) => {
      const response = await request(data).then((res: Response) => {
        const { ok } = res;

        if (ok) {
          return res.json();
        } else {
          setError(true);
          setData(null);
          onFailure();
        }
      });

      if (response.data) {
        setError(false);
        setMessage("");
        setStatus(response.status);
        setData(response.data);
        onSuccess(response.data);
      } else {
        setError(true);
        setMessage(response.message);
        setStatus(response.status);
        setData(null);
        onFailure();
      }
    },
    [onFailure, onSuccess, request]
  );

  return { request: requestFunction, response: data, status, error, message };
};

export default useApiRequest;
