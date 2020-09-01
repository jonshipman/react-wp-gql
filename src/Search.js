import React from "react";

import { NodeProvider } from "./Context";
import { Populate } from "./Defaults";
import { useSearch } from "./hooks/useSearch";

export const Search = ({
  uri = "/search",
  title = "Search",
  fragments = {},
  components = {},
  ...props
}) => {
  Populate({ components, fragments });

  const {
    edges,
    loading,
    error,
    filter,
    setFilter,
    components = {},
    ...hookProps
  } = useSearch();

  let Render = () => <components.ArchiveRender edges={edges} {...hookProps} />;

  if (loading || error || !edges.length) {
    Render = () => <components.ErrorRouting loading={loading} error={error} />;
  }

  if (filter.length < 3) {
    Render = () => <components.NoSearchResults />;
  }

  return (
    <NodeProvider value={{ components, fragments, ...props }}>
      <components.Seo title={title} canonical={uri} />

      <components.Title>{title}</components.Title>
      <components.SearchForm filter={filter} setFilter={setFilter} />

      <Render />
    </NodeProvider>
  );
};
