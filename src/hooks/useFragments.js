import { useContext } from "react";

import { NodeContext } from "../Context";
import {
  FragmentPageInfo,
  FragmentSeo,
  FragmentCategory,
  FragmentPost,
  FragmentPage,
  FragmentContentNode,
} from "../gql/fragments";

const DefaultFragments = {
  FragmentPageInfo,
  FragmentSeo,
  FragmentCategory,
  FragmentPost,
  FragmentPage,
  FragmentContentNode,
};

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
