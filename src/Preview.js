import React from "react";
import { useParams } from "react-router-dom";

import { NodeProvider } from "./Context";
import { useSingle } from "./hooks/useSingle";
import { useHeartbeat } from "./hooks/useHeartbeat";

export const Preview = ({
  ifRestricted = () => {},
  HeartbeatProps = {},
  components = {},
  ...props
}) => {
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
    <NodeProvider value={{ components, ...props }}>
      {loading || error || !node.id ? (
        <components.ErrorRouting loading={loading} error={error} />
      ) : (
        <React.Fragment>
          <components.SingleTitle {...node} />
          <components.SingleRender node={node} />
        </React.Fragment>
      )}
    </NodeProvider>
  );
};
