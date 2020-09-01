import React from "react";

import { Button } from "./Button";
import { useComponents } from "../hooks/useComponents";

export const Pagination = ({ hasNextPage, hasPreviousPage, prev, next }) => {
  let { components } = useComponents();
  components = Object.assign({}, { Button }, components);

  return (
    <div className="pagination cf mv4">
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
