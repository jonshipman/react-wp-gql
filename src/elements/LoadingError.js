import React from "react";

export const LoadingError = ({ error = "" }) => {
  return <React.Fragment>{`Error: ${error}`}</React.Fragment>;
};
