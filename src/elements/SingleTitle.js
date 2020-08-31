import React from "react";

import { useComponents } from "../hooks/useComponents";

export const SingleTitle = ({
  title,
  __typename,
  categories = { edges: [] },
}) => {
  const { components } = useComponents();

  if ("Post" === __typename) {
    return (
      <components.Title heading="div">
        {categories.edges[0]?.node?.name || "Blog"}
      </components.Title>
    );
  } else {
    return <components.Title>{title}</components.Title>;
  }
};
