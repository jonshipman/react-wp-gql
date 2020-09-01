import React from "react";

import { PageWidth } from "./PageWidth";
import { useComponents } from "../hooks/useComponents";

export const NoSearchResults = () => {
  let { components } = useComponents();
  components = Object.assign({}, { PageWidth }, components);

  return (
    <components.PageWidth className="gray tc">
      <div className="f4 f3-l mv4">
        This is where the search results will be. Use the form above to search.
      </div>
    </components.PageWidth>
  );
};
