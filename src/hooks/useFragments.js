import { useContext } from "react";

import { NodeContext } from "../Context";
import * as DefaultFragments from "../gql/fragments";

export const useFragments = () => {
  const { fragments } = useContext(NodeContext);

  if (!fragments) fragments = {};

  Object.keys(DefaultFragments).forEach((key) => {
    if (!fragments[key]) {
      fragments[key] = DefaultFragments[key];
    }
  });

  return { fragments };
};
