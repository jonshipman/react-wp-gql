import React from "react";

import { NodeProvider } from "./Context";
import { PopulateComponents, PopulateFragments } from "./Defaults";
import { useSearch } from "./hooks/useSearch";

export const Search = ({ components = {}, fragments = {}, ...props }) => {
  const { edges, loading, error, filter, setFilter, ...hookProps } = useSearch();
  PopulateComponents(components);
  PopulateFragments(fragments);

  let Render = () => <components.ArchiveRender edges={edges} {...hookProps} />;

  if (loading || error || !edges.length) {
    Render = () => <components.ErrorRouting loading={loading} error={error} />
  }

  if (filter.length < 3) {
    Render = () => <components.NoSearchResults />
  }

  return (
    <NodeProvider value={{ components, fragments, uri = "/search", title="Search",...props }}>
      <components.Seo title={title} canonical={uri} />

      <components.Title>{title}</components.Title>
      <SearchForm filter={filter} setFilter={setFilter} />

      <Render />
    </NodeProvider>
  );
};
