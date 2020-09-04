import { useQuery } from "@apollo/client";

import { useQueries } from "./useQueries";

export const useMenu = (props = {}) => {
  const { queries } = useQueries();

  const { ssr = false, location = "HEADER_MENU" } = props;
  const variables = { location };

  const { data, loading, error } = useQuery(queries.QueryMenu, {
    variables,
    errorPolicy: "all",
    ssr,
  });

  const menuItems = data?.menus?.nodes[0]?.menuItems?.nodes?.length
    ? data.menus.nodes[0].menuItems.nodes
    : [];

  return {
    menuItems,
    loading,
    error,
  };
};
