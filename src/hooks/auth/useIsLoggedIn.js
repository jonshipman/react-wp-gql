import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQueries } from "../useQueries";

const LoggedInContext = createContext({});

export const LoggedInProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState();

  const { queries } = useQueries();
  const { data = { isLoggedIn }, loading } = useQuery(queries.QueryIsLoggedIn, {
    fetchPolicy: "network-only",
    skip: isLoggedIn !== undefined,
  });

  const loggedOut = () => {
    setIsLoggedIn(false);
  };

  const loggedIn = () => {
    setIsLoggedIn(true);
  };

  return (
    <LoggedInContext.Provider
      value={{
        setIsLoggedIn,
        isLoggedIn: data.isLoggedIn,
        isLoggedOut: !data.isLoggedIn,
        loggedIn,
        loggedOut,
        loading,
      }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  return useContext(LoggedInContext);
};
