import { useMemo } from "react";
import { useCachedQuery } from "./useCachedQuery";
import { useQueries } from "./useQueries";

export const useMenu = (props = {}) => {
  const { queries } = useQueries();
  const { location = "HEADER_MENU", parentId = 0, ...queryProps } = props;
  const variables = { location, parentId };

  const { data, loading, error } = useCachedQuery(
    `useMenu_${location}`,
    queries.QueryMenu,
    {
      variables,
      errorPolicy: "all",
      ...queryProps,
    },
  );

  const menuItems = useMemo(() => (!!data ? data.menuItems?.nodes : []), [
    data,
  ]);

  return {
    menuItems,
    loading,
    error,
  };
};
