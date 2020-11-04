import { useQuery } from "@apollo/client";

import { useQueries } from "./useQueries";

export const useMenu = (props = {}) => {
  const { queries } = useQueries();

  const { location = "HEADER_MENU", parentId = 0, ...queryProps } = props;
  const variables = { location, parentId };

  const { data, loading, error } = useQuery(queries.QueryMenu, {
    variables,
    errorPolicy: "all",
    ...queryProps,
  });

  const menuItems = data ? data.menuItems?.nodes || [] : [];

  return {
    menuItems,
    loading,
    error,
  };
};
