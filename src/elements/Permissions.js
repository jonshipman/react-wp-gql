import { createElement, cloneElement, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { useQueries } from "../hooks/useQueries";
import { useNodeContext } from "../Context";

export const Permissions = ({
  wait,
  cap,
  children,
  fallback = null,
  authorId,
  query: QUERY,
  ...props
}) => {
  const { permissions } = useNodeContext();

  const { queries } = useQueries();
  const { data, loading, refetch } = useQuery(
    QUERY || queries.QueryPermissions,
    {
      errorPolicy: "all",
      fetchPolicy: "network-only",
    },
  );

  useEffect(() => {
    const s = refetch;
    permissions.current.refetch.push(s);

    return () => {
      const index = permissions.current.refetch.indexOf(s);
      if (index > -1) {
        permissions.current.refetch.splice(index, 1);
      }
    };
  }, [permissions, refetch]);

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

  if (wait && loading) {
    return null;
  }

  if (fallback === null) {
    return null;
  }

  return createElement(fallback, props);
};
