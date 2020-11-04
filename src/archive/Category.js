import React, { useMemo } from "react";
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

  const [title, seo] = useMemo(() => {
    let _r = [];

    if (data) {
      _r.push(data.category?.name);
      _r.push(data.category?.seo);
    } else {
      _r.push("Category");
    }

    return _r;
  }, [data]);

  const props = {
    query: queries.QueryCategoryPosts,
    variables: { pathname },
    uri: pathname,
    title,
    seo,
  };

  return <Archive {...props} />;
};
