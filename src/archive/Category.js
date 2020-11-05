import React from "react";
import { useLocation } from "react-router-dom";

import { useQueries } from "../hooks";
import { Archive } from "./Archive";

export const Category = () => {
  const { queries } = useQueries();
  const { pathname } = useLocation();

  const props = {
    query: queries.QueryCategory,
    variables: { pathname, id: pathname },
    title: "Category",
  };

  return <Archive {...props} />;
};
