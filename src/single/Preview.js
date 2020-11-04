import React from "react";
import { useParams } from "react-router-dom";

import { useSingle, useSingleRenderer } from "./useSingle";
import { useComponents } from "../hooks/useComponents";

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
  const { node, loading, error } = useSingle({
    ssr: false,
    databaseId: revisionId,
    asPreview: true,
  });

  const { components } = useComponents();

  const [uri, seo, RenderComponent] = useSingleRenderer(node);

  if (error || (!loading && !node?.id)) {
    return <components.ErrorRouting {...{ error, loading }} />;
  }

  if (node.isRestricted) {
    ifRestricted(node);
    return <Fallback />;
  }

  return (
    <React.Fragment>
      <components.SingleTitle {...node} />

      <article className={`single post-${node?.databaseId || "0"}`}>
        <components.Seo {...{ uri }} {...seo} />

        <RenderComponent {...{ node, loading, error }} />
      </article>
    </React.Fragment>
  );
};
