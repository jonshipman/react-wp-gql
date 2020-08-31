import React from "react";

import { useComponents } from "../hooks/useComponents";

export const ErrorRouting = ({ loading, error }) => {
  const { components } = useComponents();

  if (loading)
    return (
      <components.PageWidth>
        <components.Loading />
      </components.PageWidth>
    );
  if (error)
    return (
      <components.PageWidth>
        <components.LoadingError error={error.message} />
      </components.PageWidth>
    );

  return <components.NotFound />;
};
