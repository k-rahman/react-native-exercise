import { useState } from "react";

export default useApi = apiFunc => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    // console.log("1- Rendering ", data, error, loading);
    const response = await apiFunc(...args);
    setLoading(false);
    // console.log("2- Rendering ", data, error, loading);
    if (response.status !== 404) setError(!response.ok);
    setData(response.data);
    // console.log("3- Rendering ", data, error, loading);

    return response;
  };

  // console.log("Return values ", data, error, loading);
  return { data, error, loading, request };
};
