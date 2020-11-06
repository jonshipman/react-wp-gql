import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "./Login";
import { Preview } from "./Preview";
import { Node } from "./node/Node";
import { useQueries } from "./hooks";
import { Search } from "./Search";

export const WordPressRoutes = ({ category = "category", blog = "blog" }) => {
  const { queries } = useQueries();

  return (
    <Switch>
      <Route
        exact
        path={[
          "/login",
          "/logout",
          "/register",
          "/forgot-password",
          "/rp/:key/:login",
        ]}
      >
        <Login />
      </Route>

      <Route exact path="/search">
        <Search />
      </Route>

      <Route exact path={`/${blog}`}>
        <Node query={queries.QueryArchive} title="Blog" isArchive />
      </Route>

      <Route path={`/${category}/:slug`}>
        <Node query={queries.QueryCategory} title="Category" isArchive />
      </Route>

      <Route path="/_preview/:parentId/:revisionId/:type/:status/:nonce">
        <Preview />
      </Route>

      <Route path="*">
        <Node />
      </Route>
    </Switch>
  );
};
