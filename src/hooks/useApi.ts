import React, { useEffect, useState } from "react";
import axios from "../../axiosConfig";

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApi = async (url, body = {}, method) => {
    console.log(body);

    try {
      if (method === "GET") {
        const response = await axios.get(url);
        setData(response.data.data);
        setLoading(false);
        return;
      }
      if (method === "DELETE") {
        const response = await axios.delete(url);
        console.log(response);
        setLoading(false);
      }
      const response = await axios.post(url, body);
      setData(response.data.data);
      setLoading(false);
      return;
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  //   useEffect(() => {
  //     fetchApi();
  //   }, []);

  return { data, loading, error, fetchApi };
};

export default useApi;
