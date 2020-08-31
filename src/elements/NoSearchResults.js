import React from "react";

import { useComponents } from "../hooks/useComponents";

export const NoSearchResults = () => {
  const { components } = useComponents();

  return (
    <components.PageWidth className="gray tc">
      <div className="f4 f3-l mv4">
        This is where the search results will be. Use the form above to search.
      </div>
    </components.PageWidth>
  );
};
