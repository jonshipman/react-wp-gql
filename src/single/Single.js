import React from "react";

import { useComponents } from "../hooks/useComponents";
import { useSingle, useSingleRenderer } from "./useSingle";

export const Single = ({ wrap, query, variables, skip, ssr }) => {
  const { components } = useComponents();

  const { node, loading, error } = useSingle({
    query,
    variables,
    skip,
    ssr,
  });

  const [uri, seo, RenderComponent] = useSingleRenderer(node);

  if (error || (!loading && !node?.id)) {
    return <components.ErrorRouting {...{ error, loading }} />;
  }

  return (
    <article className={`single post-${node?.databaseId || "0"}`}>
      <components.Seo {...{ uri }} {...seo} />

      <RenderComponent {...{ wrap, node, loading, error }} />
    </article>
  );
};
