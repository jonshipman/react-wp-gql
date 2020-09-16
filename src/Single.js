import React from "react";

import { useComponents } from "./hooks/useComponents";
import { usePreviousRoute } from "./hooks/useComponentHistory";
import { useSingle } from "./hooks/useSingle";

export const Single = () => {
  const { lastRoute } = usePreviousRoute("Single");
  const { components } = useComponents();
  const { node, loading, error } = useSingle();
  const postPreload = lastRoute === "Archive" || lastRoute === "Search";

  return (
    <React.Fragment>
      <components.SingleTitle {...node} />
      {error || (!loading && !node.id) ? (
        <components.ErrorRouting {...{ loading, error }} />
      ) : (
        <components.SingleRender {...{ node, postPreload }} />
      )}
    </React.Fragment>
  );
};
