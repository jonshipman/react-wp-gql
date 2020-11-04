import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { useQueries } from "../hooks";
import { Archive } from "./Archive";

export const Category = () => {
  const { queries } = useQueries();
  const { pathname } = useLocation();

  const { data } = useQuery(queries.QueryCategory, {
    errorPolicy: "all",
    variables: { pathname },
  });

  const title = data ? data.category?.name : "Category";
  const seo = data ? data.category?.seo : null;

  const props = {
    query: queries.QueryCategoryPosts,
    variables: { pathname },
    uri: pathname,
    title,
    seo,
  };

  return <Archive {...props} />;
};
