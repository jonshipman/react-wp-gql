import { useContext } from "react";
import { NodeContext } from "../Context";

export const useRenderer = (__key, __typename, __default) => {
  const { renders = {} } = useContext(NodeContext);
  const r = renders || {};
  const x = r[__key] || {};

  if (__typename && x[__typename]) {
    return x[__typename];
  }

  return __default;
};
