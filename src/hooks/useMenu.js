import { useQuery } from "@apollo/client";
import { useQueries } from "./useQueries";

export const useMenu = (props = {}) => {
  const { queries } = useQueries();
  const { location = "HEADER_MENU", parentId = 0, ...queryProps } = props;
  const variables = { location, parentId };

  const MenuLocalStorage = useMemo(
    () =>
      window.localStorage
        ? window.localStorage.getItem(`useMenu_${location}`)
        : [],
    [location],
  );

  const { data, loading, error } = useQuery(queries.QueryMenu, {
    variables,
    errorPolicy: "all",
    ...queryProps,
  });

  const menuItems = useMemo(() => {
    if (data?.menuItems?.nodes) {
      if (window.localStorage) {
        window.localStorage.setItem(
          `useMenu_${location}`,
          JSON.stringify(data?.menuItems?.nodes),
        );
      }

      return data?.menuItems?.nodes || [];
    }

    if (MenuLocalStorage) {
      return JSON.parse(MenuLocalStorage);
    }

    return [];
  }, [data, MenuLocalStorage, location]);

  return {
    menuItems,
    loading,
    error,
  };
};
