import { useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNodeContext } from "../Context";

export const useCachedQuery = (key, ...props) => {
  const { cache } = useNodeContext();
  const { data: queryData, ...results } = useQuery(...props);

  const data = useMemo(
    () =>
      !!queryData
        ? queryData
        : cache && !!window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key))
        : queryData,
    [queryData, key, cache],
  );

  useEffect(() => {
    if (!!queryData && cache) {
      window.localStorage.setItem(key, JSON.stringify(queryData));
    }
  }, [queryData, key, cache]);

  return { data, ...results };
};
