import { createContext, useContext } from "react";

export const NodeContext = createContext({
  components: {},
  fragments: {},
  queries: {},
  mutations: {},
});

export const useNodeContext = () => useContext(NodeContext);
