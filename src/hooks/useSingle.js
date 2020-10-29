import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useQueries } from "./useQueries";

export const useSingle = (props = {}) => {
  const { queries } = useQueries();

  const { databaseId, uri: passedUri, ...queryProps } = props;
  const { pathname: uri } = useLocation();
  const variables = {};
  let q = queries.QuerySingle;
  let key = "nodeByUri";

  if (databaseId) {
    key = "contentNode";
    variables.databaseId = databaseId;
    q = queries.QuerySingleById;
  } else {
    if (passedUri) {
      variables.uri =
        passedUri !== "/" ? passedUri.replace(/\/+$/, "") : passedUri;
    } else {
      variables.uri = uri !== "/" ? uri.replace(/\/+$/, "") : uri;
    }
  }

  const { data = {}, loading, error } = useQuery(q, {
    variables,
    errorPolicy: "all",
    ...queryProps,
  });

  const { [key]: node = {} } = data;

  return {
    node: node === null ? {} : node,
    loading,
    error,
    data,
  };
};
