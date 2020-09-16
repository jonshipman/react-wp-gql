import React, { useContext } from "react";

import { NodeContext } from "./Context";
import { usePreviousRoute } from "./hooks/useComponentHistory";
import { useComponents } from "./hooks/useComponents";
import { useSearch } from "./hooks/useSearch";

export const Search = ({ uri = "/search", title = "Search" }) => {
  const { components } = useComponents();
  const { siteName = "" } = useContext(NodeContext);
  usePreviousRoute("Search");

  const { edges, loading, error, filter, setFilter, ...props } = useSearch();

  let Render = () => <components.ArchiveRender edges={edges} {...props} />;

  if (loading || error || !edges.length) {
    Render = () => <components.ErrorRouting loading={loading} error={error} />;
  }

  if (filter.length < 3) {
    Render = () => <components.NoSearchResults />;
  }

  let seoTitle = title;
  if (siteName) {
    seoTitle = `${title} | ${siteName}`;
  }

  return (
    <React.Fragment>
      <components.Seo title={seoTitle} canonical={uri} />

      <components.Title>{title}</components.Title>
      <components.SearchForm filter={filter} setFilter={setFilter} />

      <Render />
    </React.Fragment>
  );
};
