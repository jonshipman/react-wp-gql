import { useState, useContext } from "react";

import { NodeContext } from "../Context";
import { useQueries } from "../hooks";
import { useArchive } from "./useArchive";

export const useSearch = () => {
  const { perPage } = useContext(NodeContext);
  const { queries } = useQueries();

  const [filter = "", setFilter] = useState("");
  const variables = { filter };
  const archiveProps = useArchive({
    query: queries.QuerySearch,
    perPage,
    variables,
    skip: filter.length < 3,
  });

  return {
    setFilter,
    filter,
    ...archiveProps,
  };
};
