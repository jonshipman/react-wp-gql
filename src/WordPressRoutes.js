import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login } from "./Login";
import { Search, Archive, Category } from "./archive";
import { Single, Preview } from "./single";

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
        <Archive />
      </Route>
      <Route path={`/${category}/:slug`}>
        <Category />
      </Route>

      <Route path="/_preview/:parentId/:revisionId/:type/:status/:nonce">
        <Preview />
      </Route>

      <Route path="*">
        <Single />
      </Route>
    </Switch>
  );
};
