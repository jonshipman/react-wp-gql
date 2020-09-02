import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { NodeContext } from "../Context";
import { usePagination, getPageInfo, useNavigation } from "./usePagination";
import { useQueries } from "./useQueries";

export const useArchive = (props = {}) => {
  const { perPage } = useContext(NodeContext);
  const { queries } = useQueries();

  const {
    QUERY = queries.QueryArchive,
    variables: propVariables = {},
    field = "posts",
  } = props;
  const { variables, goNext, goPrev } = usePagination(perPage);

  const { data = {}, loading, error } = useQuery(QUERY, {
    variables: { ...variables, ...propVariables },
    errorPolicy: "all",
  });

  const edges = data[field]?.edges?.length ? data[field].edges : [];
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    data[field]?.pageInfo,
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  return {
    edges,
    loading,
    error,
    next,
    prev,
    hasNextPage,
    hasPreviousPage,
    data,
  };
};
