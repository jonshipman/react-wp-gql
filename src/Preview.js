import React from "react";
import { useParams } from "react-router-dom";

import { useHeartbeat } from "./hooks/useHeartbeat";
import { useSingle } from "./hooks/useSingle";
import { useComponents } from "./hooks/useComponents";

export const Preview = ({ ifRestricted = () => {}, HeartbeatProps = {} }) => {
  const { components } = useComponents();
  useHeartbeat(HeartbeatProps);

  const { revisionId } = useParams();
  const { node, loading, error } = useSingle({
    ssr: false,
    databaseId: revisionId,
  });

  if (node.isRestricted) {
    ifRestricted(node);
  }

  return (
    <React.Fragment>
      {error || (!loading && !node.id) ? (
        <components.ErrorRouting {...{ loading, error }} />
      ) : (
        <React.Fragment>
          <components.SingleTitle {...node} />
          <components.SingleRender node={node} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
