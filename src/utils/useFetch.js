import { useState, useEffect } from "react";

const useFetch = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { link = "" } = props;

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await fetch(link);
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [link]);

  return { data, loading, error };
};

export default useFetch;
