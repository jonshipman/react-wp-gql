import React, { useContext, useState } from "react";
import { NodeContext } from "./Context";

import { useComponents, useQueries } from "./hooks";
import { Node } from "./node/Node";

const SearchRender = ({
  className,
  children,
  edges: edgesProp,
  loading,
  filter,
  setFilter,
}) => {
  const { components } = useComponents();
  const edges = edgesProp ? edgesProp || [] : [];

  return (
    <components.PageWidth {...{ className }}>
      <components.SearchForm {...{ filter, setFilter }} />
      {!loading && edges.length === 0 && (filter || "").length < 3 ? (
        <components.NoSearchResults />
      ) : (
        children
      )}
    </components.PageWidth>
  );
};

export const Search = ({ title = "Search" }) => {
  const [filter, setFilter] = useState();
  const { queries } = useQueries();
  const { search } = useContext(NodeContext);

  if (!!search?.current) {
    search.current.updateSearch = (value) => {
      setFilter(value);
    };
  }

  const props = {
    isArchive: true,
    title,
    query: queries.QuerySearch,
    variables: { filter: filter || "" },
    skip: (filter || "").length < 3,
    filter,
    setFilter,
  };

  return <Node wrap={SearchRender} {...props} />;
};
