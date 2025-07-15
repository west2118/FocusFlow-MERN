import axios from "axios";
import { useState } from "react";

const useFetchData = <T = any>() => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (
    method: string,
    url: string,
    token: string,
    data?: any
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(response?.data);
      return response?.data;
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, loading, error, items };
};

export default useFetchData;
