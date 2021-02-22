import React from "react";
import { useNodeContext } from "../Context";
import { Button } from "./Button";

export const Pagination = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.Pagination) return <Components.Pagination {...props} />;

  const { hasNextPage, hasPreviousPage, prev, next } = props;

  return (
    <div className="rwg--paged pagination">
      {hasPreviousPage && (
        <Button className="prev" onClick={prev}>
          Previous
        </Button>
      )}

      {hasNextPage && (
        <Button className="next" onClick={next}>
          Next
        </Button>
      )}
    </div>
  );
};
