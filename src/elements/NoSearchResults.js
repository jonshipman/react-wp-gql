import React from "react";

import { useComponents } from "../hooks";

export const NoSearchResults = () => {
  const { components } = useComponents();

  return (
    <components.PageWidth className="rwg--no-sch-res">
      <div>
        This is where the search results will be. Use the form above to search.
      </div>
    </components.PageWidth>
  );
};
