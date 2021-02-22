import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "./Login";
import { Node } from "./node/Node";
import { Search } from "./Search";

export const WordPressRoutes = ({
  category = "category",
  tag = "tag",
  blog = "blog",
  wrap,
  title,
}) => {
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
        <Login {...{ title, wrap }} />
      </Route>

      <Route exact path="/search">
        <Search {...{ title, wrap }} />
      </Route>

      <Route exact path={`/${blog}`}>
        <Node {...{ title, wrap }} isArchive />
      </Route>

      <Route path={`/${tag}/:slug`}>
        <Node {...{ title, wrap }} isArchive />
      </Route>

      <Route path={`/${category}/:slug`}>
        <Node {...{ title, wrap }} isArchive />
      </Route>

      <Route path="*">
        <Node {...{ title, wrap }} />
      </Route>
    </Switch>
  );
};
