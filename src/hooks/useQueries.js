import { useContext } from "react";

import { NodeContext } from "../Context";

const useFragments = () => {
  return useContext(NodeContext);
};

export const useQueries = () => {
  const { queries } = useContext(NodeContext);
  const { fragments } = useFragments();

  const executedQueries = {};

  Object.keys(queries).forEach((key) => {
    if (typeof queries[key] === "function") {
      executedQueries[key] = queries[key](fragments);
    }
  });

  return { queries: executedQueries, fragments };
};
