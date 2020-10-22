import { useQuery } from "@apollo/client";

import { useQueries } from "./useQueries";

export const useMenu = (props = {}) => {
  const { queries } = useQueries();

  const { ssr = true, location = "HEADER_MENU", parentId = 0 } = props;
  const variables = { location, parentId };

  const { data = {}, loading, error } = useQuery(queries.QueryMenu, {
    variables,
    errorPolicy: "all",
    ssr,
  });

  const { menuItems: queryObject = {} } = data;
  const { nodes: menuItems = [] } = queryObject;

  return {
    menuItems: menuItems === null ? {} : menuItems,
    loading,
    error,
  };
};
