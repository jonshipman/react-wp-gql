import React, { Suspense as Source, useState, useEffect } from "react";
import { Loading } from "./Loading";

export const Suspense = ({ fallback = <Loading />, ...props }) => {
  const [isFront, setIsFront] = useState(false);

  useEffect(() => {
    if (globalThis.window ?? false) {
      setIsFront(true);
    }
  }, []);

  if (!isFront) {
    return null;
  }

  return <Source {...{ fallback }} {...props} />;
};
