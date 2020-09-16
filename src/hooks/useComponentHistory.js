import { useContext, useEffect, useState } from "react";

import { NodeContext } from "../Context";

export const usePreviousRoute = (set) => {
  const [lastRoute, setLastRoute] = useState();
  const { prevComponentRoute, setPrevComponentRoute } = useContext(NodeContext);

  useEffect(() => {
    if (!lastRoute) {
      setLastRoute(prevComponentRoute);
    }
  }, [setLastRoute, lastRoute, prevComponentRoute]);

  useEffect(() => {
    if (set) {
      setPrevComponentRoute(set);
    }
  }, [setPrevComponentRoute, set]);

  return { lastRoute };
};
