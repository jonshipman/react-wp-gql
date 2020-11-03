import React from "react";

import { useComponents } from "../hooks/useComponents";
import { useSingle, useSingleRenderer } from "./useSingle";

export const Single = () => {
  const { node, loading, error } = useSingle();
  const { components } = useComponents();

  const [uri, seo, RenderComponent] = useSingleRenderer(node);

  if (error || (!loading && !node?.id)) {
    return <components.ErrorRouting {...{ error, loading }} />;
  }

  return (
    <article className={`single post-${node?.databaseId || "0"}`}>
      <components.Seo {...{ uri }} {...seo} />

      <RenderComponent {...{ node, loading, error }} />
    </article>
  );
};
