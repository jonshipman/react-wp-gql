import React from "react";
import { ApolloProvider } from "@apollo/client";

import { Populate } from "./Defaults";
import { NodeContext } from "./Context";
import { ApolloSetup } from "./ApolloSetup";

export const NodeProvider = ({
  children,
  components = {},
  fragments = {},
  queries = {},
  mutations = {},
  client: clientProp,
  gqlUrl,
  cache,
  links,
  ...props
}) => {
  const refactored = Populate({ components, fragments, queries, mutations });

  const client = clientProp
    ? clientProp
    : ApolloSetup({ gqlUrl, cache, links });

  return (
    <ApolloProvider {...{ client }}>
      <NodeContext.Provider
        value={{
          ...refactored,
          ...props,
        }}
      >
        {children}
      </NodeContext.Provider>
    </ApolloProvider>
  );
};
