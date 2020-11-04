import React, { useState } from "react";

import { useComponents, useQueries } from "../hooks";
import { Archive } from "./Archive";

const SearchRender = ({
  className,
  children,
  edges,
  loading,
  filter,
  setFilter,
}) => {
  const { components } = useComponents();

  return (
    <components.PageWidth {...{ className }}>
      <components.SearchForm {...{ filter, setFilter }} />
      {!loading && edges.length === 0 && filter.length < 3 ? (
        <components.NoSearchResults />
      ) : (
        children
      )}
    </components.PageWidth>
  );
};

export const Search = ({ uri = "/search", title = "Search" }) => {
  const [filter, setFilter] = useState("");
  const { queries } = useQueries();

  const props = {
    uri,
    title,
    filter,
    setFilter,
    query: queries.QuerySearch,
    variables: { filter },
    skip: filter.length < 3,
  };

  return <Archive wrap={SearchRender} {...props} />;
};
