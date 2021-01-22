import React from "react";
import { Loading } from "./Loading";
import { PageWidth } from "./PageWidth";
import { LoadingError } from "./LoadingError";
import { NotFound } from "./NotFound";
import { useNodeContext } from "../Context";

export const ErrorRouting = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.ErrorRouting) return <Components.ErrorRouting {...props} />;

  const { loading, error, wrap } = props;
  const Wrap = wrap ? wrap : PageWidth;

  if (loading) {
    return (
      <Wrap>
        <Loading />
      </Wrap>
    );
  }
  if (error) {
    return (
      <Wrap>
        <LoadingError error={error.message} />
      </Wrap>
    );
  }

  return (
    <Wrap>
      <NotFound />
    </Wrap>
  );
};
