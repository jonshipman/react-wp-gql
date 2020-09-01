import React from "react";

import { useSearch } from "./hooks/useSearch";
import { useComponents } from "./hooks/useComponents";

export const Search = ({ uri = "/search", title = "Search" }) => {
  const { components } = useComponents();

  const { edges, loading, error, filter, setFilter, ...props } = useSearch();

  let Render = () => <components.ArchiveRender edges={edges} {...props} />;

  if (loading || error || !edges.length) {
    Render = () => <components.ErrorRouting loading={loading} error={error} />;
  }

  if (filter.length < 3) {
    Render = () => <components.NoSearchResults />;
  }

  return (
    <React.Fragment>
      <components.Seo title={title} canonical={uri} />

      <components.Title>{title}</components.Title>
      <components.SearchForm filter={filter} setFilter={setFilter} />

      <Render />
    </React.Fragment>
  );
};
