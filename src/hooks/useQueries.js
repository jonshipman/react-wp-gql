import { useContext } from "react";

import { NodeContext } from "../Context";

export const useQueries = () => {
  const { queries, fragments, mutations } = useContext(NodeContext);

  const executedQueries = {};

  Object.keys(queries).forEach((key) => {
    if (typeof queries[key] === "function") {
      executedQueries[key] = queries[key](fragments);
    }
  });

  const executedMutations = {};

  Object.keys(mutations).forEach((key) => {
    if (typeof mutations[key] === "function") {
      executedMutations[key] = mutations[key](fragments);
    }
  });

  return { queries: executedQueries, fragments, mutations: executedMutations };
};
