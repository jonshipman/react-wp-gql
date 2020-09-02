import { useState, useContext } from "react";
import { useQuery } from "@apollo/client";

import { NodeContext } from "../Context";
import { useQueries } from "./useQueries";
import { usePagination, getPageInfo, useNavigation } from "./usePagination";

export const useSearch = () => {
  const { perPage } = useContext(NodeContext);
  const { queries } = useQueries();

  const [filter, setFilter] = useState("");
  const { variables, goNext, goPrev } = usePagination(perPage || 10);

  variables.filter = filter;

  const { data, loading, error } = useQuery(queries.QuerySearch, {
    variables,
    errorPolicy: "all",
  });

  const edges = data?.posts?.edges?.length ? data.posts.edges : [];
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    data?.posts?.pageInfo,
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  return {
    setFilter,
    filter,
    edges,
    loading,
    error,
    next,
    prev,
    hasNextPage,
    hasPreviousPage,
  };
};
