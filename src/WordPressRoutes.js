import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { Loading, Suspense } from "./elements";

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
  import("./Preview").then((module) => ({ default: module.Preview })),
);

const Single = lazy(() =>
  import("./Single").then((module) => ({ default: module.Single })),
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
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      </Route>

      <Route exact path="/search">
        <Suspense fallback={<Loading />}>
          <Search />
        </Suspense>
      </Route>
      <Route exact path={`/${blog}`}>
        <Suspense fallback={<Loading />}>
          <Archive />
        </Suspense>
      </Route>
      <Route path={`/${category}/:slug`}>
        <Suspense fallback={<Loading />}>
          <Category />
        </Suspense>
      </Route>

      <Route path="/_preview/:parentId/:revisionId/:type/:status/:nonce">
        <Suspense fallback={<Loading />}>
          <Preview />
        </Suspense>
      </Route>

      <Route path="*">
        <Suspense fallback={<Loading />}>
          <Single />
        </Suspense>
      </Route>
    </Switch>
  );
};
