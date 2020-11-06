import React from "react";
import { useParams } from "react-router-dom";

import { useComponents } from "./hooks";
import { Node } from "./node/Node";

const PreviewFallback = () => {
  const { components } = useComponents();

  const error = {
    message: "The post you're trying to view is restricted.",
  };

  return <components.ErrorRouting {...{ error }} />;
};

export const Preview = ({
  ifRestricted = () => {},
  fallback: Fallback = PreviewFallback,
}) => {
  const { revisionId } = useParams();

  if (node.isRestricted) {
    ifRestricted(node);
    return <Fallback />;
  }

  return <Node databaseId={revisionId} />;
};
