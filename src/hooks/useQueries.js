import { useNodeContext } from "../Context";

export const useQueries = () => {
  const { queries, fragments, mutations } = useNodeContext();

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
