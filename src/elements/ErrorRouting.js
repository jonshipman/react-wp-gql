import React from "react";

import { useComponents } from "../hooks/useComponents";

export const ErrorRouting = ({ loading, error, wrap }) => {
  const { components } = useComponents();
  const Wrap = wrap ? wrap : components.PageWidth;

  if (loading) {
    return (
      <Wrap>
        <components.Loading />
      </Wrap>
    );
  }
  if (error) {
    return (
      <Wrap>
        <components.LoadingError error={error.message} />
      </Wrap>
    );
  }

  return (
    <Wrap>
      <components.NotFound />
    </Wrap>
  );
};
