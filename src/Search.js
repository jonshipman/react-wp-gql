import React, { useEffect, useRef, useState } from "react";
import { useNodeContext } from "./Context";
import { NoSearchResults, PageWidth, SearchForm } from "./elements";
import { useQueries } from "./hooks";
import { Node } from "./node/Node";

const SearchRender = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.SearchRender) return <Components.SearchRender {...props} />;

  const {
    className,
    children,
    edges: edgesProp,
    loading,
    filter,
    setFilter,
  } = props;

  const edges = edgesProp ? edgesProp || [] : [];

  return (
    <PageWidth {...{ className }}>
      <SearchForm {...{ filter, setFilter }} />
      {!loading && edges.length === 0 && (filter || "").length < 3 ? (
        <NoSearchResults />
      ) : (
        children
      )}
    </PageWidth>
  );
};

export const Search = ({ title = "Search" }) => {
  const [filter, setFilter] = useState();
  const { queries } = useQueries();
  const { search } = useNodeContext();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => (isMounted.current = false);
  }, []);

  if (!!search?.current) {
    search.current.updateSearch = (value) => {
      if (isMounted.current) {
        setFilter(value);
      }
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
