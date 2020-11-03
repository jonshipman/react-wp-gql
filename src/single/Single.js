import React from "react";

import { useComponents } from "../hooks/useComponents";
import { useSingle, useSingleRenderer } from "./useSingle";

const SingleTitle = ({
  name,
  title,
  __typename,
  categories = { edges: [] },
}) => {
  const { components } = useComponents();

  if (__typename === "Post") {
    return (
      <components.Title heading="div">
        {categories.edges[0]?.node?.name || "Blog"}
      </components.Title>
    );
  } else {
    return <components.Title>{title || name}</components.Title>;
  }
};

export const Single = () => {
  const { node, loading, error } = useSingle();

  const { components } = useComponents();

  const [uri, seo, RenderComponent] = useSingleRenderer(node);

  if (error || (!loading && !node?.id)) {
    return <components.ErrorRouting {...{ error, loading }} />;
  }

  return (
    <React.Fragment>
      <SingleTitle {...node} />

      <article className={`single post-${node?.databaseId || "0"}`}>
        <components.Seo {...{ uri }} {...seo} />

        <RenderComponent {...{ node, loading, error }} />
      </article>
    </React.Fragment>
  );
};
