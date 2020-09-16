import React from "react";

import { useComponents } from "./hooks/useComponents";
import { useSingle } from "./hooks/useSingle";

export const Single = () => {
  const { components } = useComponents();
  const { node, loading, error } = useSingle();

  return (
    <React.Fragment>
      <components.SingleTitle {...node} />
      {error || (!loading && !node.id) ? (
        <components.ErrorRouting {...{ loading, error }} />
      ) : (
        <components.SingleRender {...{ node }} />
      )}
    </React.Fragment>
  );
};
