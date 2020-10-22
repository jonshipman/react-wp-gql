import { useLocation } from "react-router-dom";

import { useArchive } from "./useArchive";
import { useQueries } from "./useQueries";

export const useCategory = () => {
  const { queries } = useQueries();

  const { pathname } = useLocation();
  const id = [...pathname.replace(/\/+$/, "").split("/")].pop();
  const variables = {
    filter: pathname,
    id,
  };

  const { data = {}, ...props } = useArchive({
    query: queries.QueryCategories,
    variables,
  });

  const { category = {} } = data;

  return { category: category === null ? {} : category, data, ...props };
};
