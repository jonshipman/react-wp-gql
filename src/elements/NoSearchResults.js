import React from "react";
import { useNodeContext } from "../Context";
import { PageWidth } from "./PageWidth";

export const NoSearchResults = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.NoSearchResults)
    return <Components.NoSearchResults {...props} />;

  return (
    <PageWidth className="rwg--no-sch-res">
      <div>
        This is where the search results will be. Use the form above to search.
      </div>
    </PageWidth>
  );
};
