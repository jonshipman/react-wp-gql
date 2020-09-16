import React from "react";
import { useParams } from "react-router-dom";

import { useHeartbeat } from "./hooks/useHeartbeat";
import { useSingle } from "./hooks/useSingle";
import { useComponents } from "./hooks/useComponents";
import { usePreviousRoute } from "./hooks/useComponentHistory";

export const Preview = ({ ifRestricted = () => {}, HeartbeatProps = {} }) => {
  const { components } = useComponents();
  usePreviousRoute("Preview");

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
      {loading || error || !node.id ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <React.Fragment>
          <components.SingleTitle {...node} />
          <components.SingleRender node={node} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
