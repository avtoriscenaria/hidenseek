import { useState } from "react";

const useApiRequest = (
  request: (Authorization: string, data: { [key: string]: any }) => any
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const requestFunction = async (
    Authorization: string,
    data: { [key: string]: any }
  ) => {
    const response = await request(Authorization, data).then(
      (res: Response) => {
        const { ok } = res;

        if (ok) {
          return res.json();
        } else {
          setError(true);
        }
      }
    );

    if (response.data) {
      setError(false);
      setData(response.data);
    } else {
      setError(true);
      setMessage(response.message);
    }
  };

  return { request: requestFunction, response: data, error, message };
};

export default useApiRequest;
