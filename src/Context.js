import { createContext } from "react";

export const NodeContext = createContext({
  components: {},
  fragments: {},
  queries: {},
  mutations: {},
  FRONTEND_URL: "",
});
