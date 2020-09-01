import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useQueries } from "./useQueries";

export const useSingle = (props = {}) => {
  const { queries } = useQueries();

  const { ssr = true, databaseId, uri: passedUri } = props;
  const { pathname: uri } = useLocation();
  const variables = {};
  let q = queries.QuerySingle;

  if (databaseId) {
    variables.databaseId = databaseId;
    q = queries.QuerySingleById;
  } else {
    if (passedUri) {
      variables.uri = passedUri.replace(/\/+$/, "");
    } else {
      variables.uri = uri.replace(/\/+$/, "");
    }
  }

  const { data, loading, error } = useQuery(q, {
    variables,
    errorPolicy: "all",
    ssr,
  });

  return {
    node: data?.contentNode || {},
    loading,
    error,
  };
};
