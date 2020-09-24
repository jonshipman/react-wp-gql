import React from "react";
import { Switch, Route } from "react-router-dom";

import { Login, Logout } from "./Login";
import { Search } from "./Search";
import { Archive } from "./Archive";
import { Category } from "./Category";
import { Preview } from "./Preview";
import { Single } from "./Single";

export const WordPressRoutes = ({ category = "category", blog = "blog" }) => {
  return (
    <Switch>
      <Route
        exact
        path={["/login", "/register", "/forgot-password", "/rp/:key/:login"]}
      >
        <Login />
      </Route>

      <Route exact path="/logout">
        <Logout />
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
