import React from "react";

import { Loading } from "./Loading";
import { LoadingError } from "./LoadingError";
import { NotFound } from "./NotFound";
import { PageWidth } from "./PageWidth";
import { useComponents } from "../hooks/useComponents";

export const ErrorRouting = ({ loading, error }) => {
  let { components } = useComponents();
  components = Object.assign(
    {},
    { PageWidth, Loading, LoadingError, NotFound },
    components,
  );

  if (loading) {
    return (
      <components.PageWidth>
        <components.Loading />
      </components.PageWidth>
    );
  }
  if (error) {
    return (
      <components.PageWidth>
        <components.LoadingError error={error.message} />
      </components.PageWidth>
    );
  }

  return <components.NotFound />;
};
