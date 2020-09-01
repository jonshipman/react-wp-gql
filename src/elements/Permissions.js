import { createElement, cloneElement } from "react";
import { useQuery } from "@apollo/client";

import { useQueries } from "../hooks/useQueries";

export const Permissions = ({
  cap,
  children,
  fallback = null,
  authorId,
  query: QUERY = DEFAULT_QUERY,
  ...props
}) => {
  const { queries } = useQueries();
  const { data } = useQuery(queries.QueryPermissions, { errorPolicy: "all" });

  if (data?.viewer?.capabilities?.length > 0) {
    if (data.viewer.capabilities.includes(cap)) {
      const others = cap.replace("_", "_others_");
      if (authorId) {
        if (
          data.viewer.databaseId === authorId ||
          data.viewer.capabilities.includes(others)
        ) {
          return cloneElement(children, props);
        }
      } else {
        return cloneElement(children, props);
      }
    }
  }

  if (null === fallback) {
    return null;
  }

  return createElement(fallback, props);
};
