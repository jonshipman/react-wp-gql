import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useComponents, useQueries } from "../hooks";

export const useSingle = (props = {}) => {
  const { queries } = useQueries();

  const { databaseId, uri: passedUri, asPreview, ...queryProps } = props;
  const { pathname: uri } = useLocation();

  const [query, key, variables] = useMemo(() => {
    let _q = queries.QuerySingle;
    let _k = "nodeByUri";
    const _v = {};

    if (databaseId) {
      _k = "contentNode";
      _v.databaseId = databaseId;

      if (asPreview) {
        _q = queries.QueryPreview;
      } else {
        _q = queries.QuerySingleById;
      }
    } else {
      if (passedUri) {
        _v.uri = passedUri !== "/" ? passedUri.replace(/\/+$/, "") : passedUri;
      } else {
        _v.uri = uri !== "/" ? uri.replace(/\/+$/, "") : uri;
      }
    }

    return [_q, _k, _v];
  }, [databaseId, passedUri, queries, asPreview]);

  const { data, loading, error } = useQuery(query, {
    variables,
    errorPolicy: "all",
    ...queryProps,
  });

  const node = useMemo(() => {
    return data ? data[key] || {} : {};
  }, [key, data]);

  return {
    node,
    loading,
    error,
    data,
  };
};

const SingleRender = ({
  node = {},
  loading,
  className = "mv4",
  wrap,
  skullColor,
}) => {
  const { content, title, name } = node;

  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;

  return (
    <div>
      <components.Title>{title || name}</components.Title>
      <RenderWrapper {...{ className }}>
        {loading ? (
          <components.SkullPage color={skullColor} />
        ) : (
          <components.PostContent>{content}</components.PostContent>
        )}
      </RenderWrapper>
    </div>
  );
};

export const useSingleRenderer = (node) => {
  const { components } = useComponents();

  return useMemo(() => {
    const ret = [];

    ret.push(node?.uri ? node.uri : "");
    ret.push(node?.seo ? node.seo : {});

    let _r = SingleRender;
    if (node.__typename && components[`Single${node.__typename}Render`]) {
      _r = components[`Single${node.__typename}Render`];
    }
    ret.push(_r);

    return ret;
  }, [node, components]);
};
