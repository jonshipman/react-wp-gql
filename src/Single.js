import React from "react";

import { useComponents } from "./hooks/useComponents";
import { useSingle } from "./hooks/useSingle";

export const Single = () => {
  const { components } = useComponents();
  const { node, loading, error } = useSingle();

  return <components.SingleRender {...{ node, loading, error }} />;
};
