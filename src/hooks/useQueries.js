import { useContext } from "react";

import { NodeContext } from "../Context";
import * as DefaultQueries from "../gql/queries";
import * as DefaultFragments from "../gql/fragments";

const useFragments = () => {
  const { fragments } = useContext(NodeContext);

  if (!fragments) fragments = {};

  Object.keys(DefaultFragments).forEach((key) => {
    if (!fragments[key]) {
      fragments[key] = DefaultFragments[key];
    }
  });

  return { fragments };
};

export const useQueries = () => {
  const { queries } = useContext(NodeContext);
  const { fragments } = useFragments();

  if (!queries) queries = {};

  Object.keys(DefaultQueries).forEach((key) => {
    console.log(`Query Key ${key}`);
    if (!queries[key]) {
      console.log(`Query Key not Found.`);
      queries[key] = DefaultQueries[key];
    }
  });

  const executedQueries = {};

  Object.keys(queries).forEach((key) => {
    executedQueries[key] = queries[key](fragments);
  });

  return { queries: executedQueries, fragments };
};
