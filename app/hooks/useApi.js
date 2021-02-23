import { useState } from "react";

export default useApi = apiFunc => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    setError(!response.ok);
    setResponse(response);

    return response;
  };

  return { response, error, loading, request };
};
