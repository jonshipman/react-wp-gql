import { useQuery } from "@apollo/client";
import { useMemo } from "react";

export const useCachedQuery = (key, ...props) => {
  const { data: queryData, ...results } = useQuery(...props);

  const data = useMemo(
    () =>
      !!queryData
        ? queryData
        : !!window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key))
        : queryData,
    [queryData],
  );

  useEffect(() => {
    if (!!queryData) {
      window.localStorage.setItem(key, JSON.stringify(queryData));
    }
  }, [queryData, key]);

  return { data, ...results };
};
