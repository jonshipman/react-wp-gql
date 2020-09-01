import { createContext } from "react";

export const NodeContext = createContext({
  components: {},
  fragments: {},
  queries: {},
  FRONTEND_URL: "",
});
