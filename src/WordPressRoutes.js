import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { Suspense } from "./elements";

const Login = lazy(() =>
  import("./Login").then((module) => ({ default: module.Login })),
);

const Search = lazy(() =>
  import("./Search").then((module) => ({ default: module.Search })),
);

const Archive = lazy(() =>
  import("./Archive").then((module) => ({ default: module.Archive })),
);

const Category = lazy(() =>
  import("./Category").then((module) => ({ default: module.Category })),
);

const Preview = lazy(() =>
  import("./single").then((module) => ({ default: module.Preview })),
);

const Single = lazy(() =>
  import("./single").then((module) => ({ default: module.Single })),
);

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
        <Suspense>
          <Login />
        </Suspense>
      </Route>

      <Route exact path="/search">
        <Suspense>
          <Search />
        </Suspense>
      </Route>
      <Route exact path={`/${blog}`}>
        <Suspense>
          <Archive />
        </Suspense>
      </Route>
      <Route path={`/${category}/:slug`}>
        <Suspense>
          <Category />
        </Suspense>
      </Route>

      <Route path="/_preview/:parentId/:revisionId/:type/:status/:nonce">
        <Suspense>
          <Preview />
        </Suspense>
      </Route>

      <Route path="*">
        <Suspense>
          <Single />
        </Suspense>
      </Route>
    </Switch>
  );
};
