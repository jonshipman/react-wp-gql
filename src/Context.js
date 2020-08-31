import { createContext } from "react";

const NodeContext = createContext({
  components: {},
  fragments: {},
  FRONTEND_URL: "",
});
const NodeProvider = NodeContext.Provider;

export { NodeProvider, NodeContext };
