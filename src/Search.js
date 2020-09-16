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

  let Render = () => (
    <components.ArchiveRender {...{ edges, loading }} {...props} />
  );

  if (error || (!loading && edges.length < 1)) {
    Render = () => <components.ErrorRouting {...{ loading, error }} />;
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
      <components.SearchForm {...{ setFilter, filter }} />

      <Render />
    </React.Fragment>
  );
};
