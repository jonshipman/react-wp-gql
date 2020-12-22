import { useNodeContext } from "../Context";

export const useComponents = () => {
  const { components = {} } = useNodeContext();
  return { components };
};
