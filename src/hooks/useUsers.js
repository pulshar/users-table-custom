import { useEffect, useState } from "react";
import { usersMapped } from "../helpers";
import { useLocalStorage } from "./useLocalStorage";

export const useUsers = (url) => {
  const [data, setData] = useLocalStorage("users", null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data) {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const data = usersMapped(json);
          // localStorage.setItem("users", JSON.stringify(data));
          setData(data);
        })
        .catch((error) => setError(error.message))
        .finally(() => setLoading(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
};
