import { useContext } from "react";
import { useQuery } from "@apollo/client";

import { NodeContext } from "../Context";
import {
  useComponents,
  usePagination,
  getPageInfo,
  useNavigation,
  useQueries,
} from "../hooks";

export const useArchive = (props) => {
  const { perPage } = useContext(NodeContext);
  const { queries } = useQueries();

  const {
    query: QUERY = queries.QueryArchive,
    variables: propVariables = {},
    perPage: perPageProp,
    field = "posts",
    ...queryProps
  } = props || {};
  const { variables, goNext, goPrev } = usePagination(perPageProp || perPage);

  const { data, loading, error } = useQuery(QUERY, {
    variables: { ...variables, ...propVariables },
    errorPolicy: "all",
    ...queryProps,
  });

  const edges = data ? data[field]?.edges || [] : [];
  const pageInfo = data ? data[field]?.pageInfo || {} : {};
  const __typename = data ? data[field]?.edges[0]?.node?.__typename : null;

  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    pageInfo,
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  return {
    __typename,
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

export const useArchiveCardRenderer = (__typename) => {
  const { components } = useComponents();

  return __typename && components[`Archive${__typename}Card`]
    ? components[`Archive${__typename}Card`]
    : components.ArchiveCard;
};

export const useArchiveRenderer = (__typename) => {
  const { components } = useComponents();

  return __typename && components[`Archive${__typename}Render`]
    ? components[`Archive${__typename}Render`]
    : components.PageWidth;
};
