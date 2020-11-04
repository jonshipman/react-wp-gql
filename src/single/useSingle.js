import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useComponents, useQueries } from "../hooks";

export const useSingle = (props = {}) => {
  const { queries } = useQueries();

  const { databaseId, uri: passedUri, asPreview, ...queryProps } = props;
  const { pathname: uri } = useLocation();

  const query = !!databaseId
    ? asPreview
      ? queries.QueryPreview
      : queries.QuerySingleById
    : queries.QuerySingle;

  const key = !!databaseId ? "contentNode" : "nodeByUri";

  const variables = { databaseId };
  if (!!passedUri) {
    variables.uri =
      passedUri !== "/" ? passedUri.replace(/\/+$/, "") : passedUri;
  } else {
    variables.uri = uri !== "/" ? uri.replace(/\/+$/, "") : uri;
  }

  const { data, loading, error } = useQuery(query, {
    variables,
    errorPolicy: "all",
    ...queryProps,
  });

  const node = data ? data[key] || {} : {};

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

  const ret = [];
  ret.push(node?.uri ? node.uri : "");
  ret.push(node?.seo ? node.seo : {});

  ret.push(
    node.__typename && components[`Single${node.__typename}Render`]
      ? components[`Single${node.__typename}Render`]
      : SingleRender,
  );

  return ret;
};
