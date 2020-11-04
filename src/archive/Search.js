import React, { useContext } from "react";

import { NodeContext } from "../Context";
import { useComponents } from "../hooks";
import { useSearch } from "./useSearch";

export const Search = ({ uri = "/search", title = "Search" }) => {
  const { components } = useComponents();
  const { siteName = "" } = useContext(NodeContext);

  const { edges, loading, error, filter, setFilter, ...props } = useSearch();

  let Render = () => (
    <components.ArchiveRender {...{ edges, loading, error }} {...props} />
  );

  if (!loading && edges.length < 1) {
    if (filter.length < 3) {
      Render = () => <components.NoSearchResults />;
    }
  }

  let seoTitle = title;
  if (siteName) {
    seoTitle = `${title} - ${siteName}`;
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
