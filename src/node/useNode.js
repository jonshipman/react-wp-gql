import { useLocation } from "react-router-dom";
import {
  getPageInfo,
  useNavigation,
  usePagination,
  useQueries,
  useCachedQuery,
} from "../hooks";
import { useNodeContext } from "../Context";
import { useEffect, useMemo } from "react";
import { ArchiveRender } from "./ArchiveRender";
import { ArchiveCard } from "./ArchiveCard";
import { SinglePostRender, SingleRender } from "./SingleRender";

export const useNode = (props) => {
  const {
    perPage,
    node: nodeRef,
    edges: edgesRef,
    data: dataRef,
    nodeLoading,
    nodeError,
  } = useNodeContext();
  const { queries } = useQueries();

  const {
    databaseId: idProp,
    uri: passedUri,
    perPage: perPageProp,
    query: queryProp,
    variables: varProp = {},
    skip,
    ssr,
  } = props || {};

  const { pathname: uri, search } = useLocation();
  const previewId = new URLSearchParams(search).get("p");

  const databaseId = previewId || idProp;

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

  const key = `useNode_${JSON.stringify(variables)}`;

  const { data, loading, error } = useCachedQuery(key, query, {
    errorPolicy: "all",
    variables,
    skip,
    ssr,
  });

  const node = useMemo(() => (data ? data.node || {} : {}), [data]);

  const { __typename, isArchive, edges, pageInfo, title, seo } = useMemo(() => {
    const results = { __typename: node?.__typename, isArchive: !!node?.posts };

    if (!!node?.posts) {
      results.edges = node?.posts?.edges || [];
      results.pageInfo = node?.posts?.pageInfo || {};
      results.__typename = node?.posts?.edges[0]?.node?.__typename || null;
      results.title = node?.name;
      results.seo = node?.seo;
    } else if (!!data?.posts) {
      results.edges = data?.posts?.edges || [];
      results.pageInfo = data?.posts?.pageInfo || {};
      results.__typename = data?.posts?.edges[0]?.node?.__typename || null;
      results.isArchive = true;
    }

    return results;
  }, [data, node]);

  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    pageInfo,
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  nodeRef.current = node;
  edgesRef.current = edges;
  dataRef.current = data;
  nodeLoading.current = loading;
  nodeError.current = error;

  useEffect(() => {
    return () => {
      nodeRef.current = {};
      edgesRef.current = [];
      dataRef.current = null;
      nodeLoading.current = false;
      nodeError.current = null;
    };
  }, [nodeRef, edgesRef, dataRef, nodeLoading, nodeError]);

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
    seo,
    title,
  };
};

export const useNodeRenderer = ({ __typename, isArchive, data }) => {
  const { components: Components = {}, templates = {} } = useNodeContext();

  if (isArchive) {
    return __typename && Components[`Archive${__typename}Render`]
      ? Components[`Archive${__typename}Render`]
      : ArchiveRender;
  }

  const templateName = data?.node?.template?.templateName;

  if (!!templateName && !!templates[templateName]) {
    return templates[templateName];
  }

  return __typename && Components[`Single${__typename}Render`]
    ? Components[`Single${__typename}Render`]
    : __typename === "Post"
    ? SinglePostRender
    : SingleRender;
};

export const useCardRenderer = (__typename) => {
  const { components: Components = {} } = useNodeContext();

  return __typename && Components[`Archive${__typename}Card`]
    ? Components[`Archive${__typename}Card`]
    : ArchiveCard;
};
