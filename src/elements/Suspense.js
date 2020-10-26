import React, { Suspense as Source, useState, useEffect } from "react";

export const Suspense = (props) => {
  const [isFront, setIsFront] = useState(false);

  useEffect(() => {
    if (globalThis.window ?? false) {
      setIsFront(true);
    }
  }, []);

  if (!isFront) {
    return null;
  }

  return <Source {...props} />;
};
