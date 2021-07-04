import { HOST } from "constants/api";

const useApiRequest = () => {
  const api = async (uri: string, method: string, data?: any) => {
    return await fetch(`${HOST}${uri}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    }).then((res) => res.json());
  };

  return { api };
};

export default useApiRequest;
