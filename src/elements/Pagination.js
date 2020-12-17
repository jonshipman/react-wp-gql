import React from "react";

import { useComponents } from "../hooks/useComponents";

export const Pagination = ({ hasNextPage, hasPreviousPage, prev, next }) => {
  const { components } = useComponents();

  return (
    <div className="rwg--paged pagination">
      {hasPreviousPage && (
        <components.Button className="prev" onClick={prev}>
          Previous
        </components.Button>
      )}

      {hasNextPage && (
        <components.Button className="next" onClick={next}>
          Next
        </components.Button>
      )}
    </div>
  );
};
