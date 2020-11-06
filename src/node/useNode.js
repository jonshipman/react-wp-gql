import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import {
  getPageInfo,
  useComponents,
  useNavigation,
  usePagination,
  useQueries,
} from "../hooks";
import { NodeContext } from "../Context";

export const useNode = (props) => {
  const { perPage } = useContext(NodeContext);
  const { queries } = useQueries();

  const {
    databaseId,
    uri: passedUri,
    perPage: perPageProp,
    query: queryProp,
    variables: varProp = {},
    skip,
    ssr,
  } = props || {};
  const { pathname: uri } = useLocation();

  const { variables: varPaged, goNext, goPrev } = usePagination(
    perPageProp || perPage,
  );

  const query = !!databaseId
    ? queries.QueryContentNodeById
    : queryProp
    ? queryProp
    : queries.QueryNodeByUri;

  const variables = { databaseId, ...varProp, ...varPaged };

  if (!!passedUri) {
    variables.uri =
      passedUri !== "/" ? passedUri.replace(/\/+$/, "") : passedUri;
  } else {
    variables.uri = uri !== "/" ? uri.replace(/\/+$/, "") : uri;
  }

  const { data, loading, error } = useQuery(query, {
    errorPolicy: "all",
    variables,
    skip,
    ssr,
  });

  const node = data ? data.node || {} : {};
  let __typename = node.__typename;
  let isArchive = !!node.posts;

  let edges, pageInfo, title, seo;

  if (node.posts) {
    edges = node.posts?.edges || [];
    pageInfo = node.posts?.pageInfo || {};
    __typename = node.posts?.edges[0]?.node?.__typename || null;
    title = node.name;
    seo = node.seo;
  } else if (data && data.posts) {
    edges = data ? data.posts?.edges || [] : [];
    pageInfo = data ? data.posts?.pageInfo || {} : {};
    __typename = data ? data.posts?.edges[0]?.node?.__typename : null;
    isArchive = true;
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
    data,
    edges,
    error,
    goNext,
    goPrev,
    hasNextPage,
    hasPreviousPage,
    isArchive,
    loading,
    next,
    node,
    pageInfo,
    prev,
  };
};

export const useNodeRenderer = (__typename, isArchive) => {
  const { components } = useComponents();

  if (isArchive) {
    return __typename && components[`Archive${__typename}Render`]
      ? components[`Archive${__typename}Render`]
      : components.ArchiveRender;
  }

  return __typename && components[`Single${__typename}Render`]
    ? components[`Single${__typename}Render`]
    : components.SingleRender;
};

export const useCardRenderer = (__typename) => {
  const { components } = useComponents();

  return __typename && components[`Archive${__typename}Card`]
    ? components[`Archive${__typename}Card`]
    : components.ArchiveCard;
};
