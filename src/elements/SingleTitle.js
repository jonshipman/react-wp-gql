import React from "react";

import { Title } from "./Title";
import { useComponents } from "../hooks/useComponents";

export const SingleTitle = ({
  title,
  __typename,
  categories = { edges: [] },
}) => {
  let { components } = useComponents();
  components = Object.assign({}, { Title }, components);

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
