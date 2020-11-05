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
    ...queryProps
  } = props || {};
  const { variables, goNext, goPrev } = usePagination(perPageProp || perPage);

  const { data, loading, error } = useQuery(QUERY, {
    variables: { ...variables, ...propVariables },
    errorPolicy: "all",
    ...queryProps,
  });

  let edges, pageInfo, __typename, title, seo;

  if (data && data.archive) {
    edges = data.archive.posts?.edges || [];
    pageInfo = data.archive.posts?.pageInfo || {};
    __typename = data.archive.posts?.edges[0]?.node?.__typename || null;
    title = data.archive.name;
    seo = data.archive.seo;
  } else {
    edges = data ? data.posts?.edges || [] : [];
    pageInfo = data ? data.posts?.pageInfo || {} : {};
    __typename = data ? data.posts?.edges[0]?.node?.__typename : null;
  }

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
    title,
    seo,
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
