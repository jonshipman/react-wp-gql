import React from "react";

import { useComponents } from "./hooks/useComponents";
import { useRenderer } from "./hooks/useRenderer";
import { useSingle } from "./hooks/useSingle";

export const Single = () => {
  const { components } = useComponents();
  const { node, loading, error } = useSingle();
  const Renderer = useRenderer(
    "single",
    node?.__typename,
    components.SingleRender,
  );

  return <Renderer {...{ node, loading, error }} />;
};
