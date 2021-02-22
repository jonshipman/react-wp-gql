import React from "react";
import { useNodeContext } from "../Context";

export const NoSearchResults = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.NoSearchResults)
    return <Components.NoSearchResults {...props} />;

  return (
    <div className="rwg--no-sch-res">
      This is where the search results will be. Use the form above to search.
    </div>
  );
};
