import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { NodeContext } from "../Context";
import {
  usePagination,
  getPageInfo,
  useNavigation,
  useQueries,
} from "../hooks";

export const useArchive = (props = {}) => {
  const { perPage } = useContext(NodeContext);
  const { queries } = useQueries();

  const {
    query: QUERY = queries.QueryArchive,
    variables: propVariables = {},
    perPage: perPageProp,
    field = "posts",
    ...queryProps
  } = props;
  const { variables, goNext, goPrev } = usePagination(perPageProp || perPage);

  const { data = {}, loading, error } = useQuery(QUERY, {
    variables: { ...variables, ...propVariables },
    errorPolicy: "all",
    ...queryProps,
  });

  const queryObject = data[field] || {};

  const { edges = [], pageInfo = {} } = queryObject;
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    pageInfo,
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  const __typename = edges?.length > 0 ? edges[0]?.node?.__typename : null;

  return {
    __typename,
    edges: edges === null ? [] : edges,
    loading,
    error,
    next,
    prev,
    hasNextPage,
    hasPreviousPage,
    data,
  };
};
