import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { Login } from "./Login";
import { Node } from "./node/Node";
import { Search } from "./Search";

export const WordPressRoutes = ({ category = "category", blog = "blog" }) => {
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
        <Node title="Blog" isArchive />
      </Route>

      <Route path={`/${category}/:slug`}>
        <Node title="Category" isArchive />
      </Route>

      <Route path="*">
        <Node />
      </Route>
    </Switch>
  );
};
