import React, { useContext, createContext } from "react";

const InternalNodeContext = createContext({});
export function useInternalNodeContext() {
  return useContext(InternalNodeContext);
}

export function InternalNodeProvider({ children }) {
  return (
    <InternalNodeContext.Provider value={{ internal: true }}>
      {children}
    </InternalNodeContext.Provider>
  );
}

export default InternalNodeProvider;
