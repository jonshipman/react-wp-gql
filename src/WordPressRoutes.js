import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "./Login";
import { Node } from "./node/Node";
import { Search } from "./Search";

export const WordPressRoutes = ({
  category = "category",
  tag = "tag",
  blog = "blog",
  blogTitle = "Blog",
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
        <Login />
      </Route>

      <Route exact path="/search">
        <Search />
      </Route>

      <Route exact path={`/${blog}`}>
        <Node title={blogTitle} isArchive />
      </Route>

      <Route path={`/${tag}/:slug`}>
        <Node isArchive />
      </Route>

      <Route path={`/${category}/:slug`}>
        <Node isArchive />
      </Route>

      <Route path="*">
        <Node />
      </Route>
    </Switch>
  );
};
