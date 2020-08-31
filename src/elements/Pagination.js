import React from "react";

import { useComponents } from "../hooks/useComponents";

export const Pagination = ({ hasNextPage, hasPreviousPage, prev, next }) => {
  const { components } = useComponents();

  return (
    <div className="pagination cf">
      {hasPreviousPage && (
        <components.Button className="fl" onClick={prev}>
          Previous
        </components.Button>
      )}

      {hasNextPage && (
        <components.Button className="fr" onClick={next}>
          Next
        </components.Button>
      )}
    </div>
  );
};
