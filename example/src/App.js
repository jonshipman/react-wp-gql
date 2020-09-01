import React from "react";

import { NodeProvider, Single } from "react-boilerplate-nodes";

const App = () => {
  return (
    <NodeProvider>
      <Single />
    </NodeProvider>
  );
};

export default App;
