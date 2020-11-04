import { useContext, useMemo } from "react";
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

  const [edges, pageInfo, __typename] = useMemo(() => {
    let _e = [];
    let _p = {};
    let _t = "";

    if (data) {
      const _q = data[field];
      ({ edges: _e, pageInfo: _p } = _q || {});

      _t = _e?.length > 0 ? _e[0]?.node?.__typename : null;
    }

    return [_e, _p, _t];
  }, [data, field]);

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

  return useMemo(() => {
    let _r = components.ArchiveCard;
    if (__typename && components[`Archive${__typename}Card`]) {
      _r = components[`Archive${__typename}Card`];
    }

    return _r;
  }, [__typename, components]);
};

export const useArchiveRenderer = (__typename) => {
  const { components } = useComponents();

  return useMemo(() => {
    let _c = components.PageWidth;
    if (__typename && components[`Archive${__typename}Render`]) {
      _c = components[`Archive${__typename}Render`];
    }

    return _c;
  }, [__typename, components]);
};
