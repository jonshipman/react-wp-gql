import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { useFragments } from "./useFragments";
import { usePagination, getPageInfo, useNavigation } from "./usePagination";

export const useSearch = () => {
  const { fragments } = useFragments();

  const QUERY = gql`
    query SearchHook(
      $filter: String!
      $first: Int
      $last: Int
      $after: String
      $before: String
    ) {
      posts(
        first: $first
        last: $last
        after: $after
        before: $before
        where: { search: $filter, status: PUBLISH, hasPassword: false }
      ) {
        edges {
          node {
            ...postInfo
          }
        }
        pageInfo {
          ...edgePageInfo
        }
      }
    }
    ${fragments.FragmentCategory}
    ${fragments.FragmentPageInfo}
    ${fragments.FragmentSeo}
    ${fragments.FragmentPost}
  `;

  const [filter, setFilter] = useState("");
  const { variables, goNext, goPrev } = usePagination();

  variables.filter = filter;

  const { data, loading, error } = useQuery(QUERY, {
    variables,
    errorPolicy: "all",
  });

  const edges = data?.posts?.edges?.length ? data.posts.edges : [];
  const { endCursor, hasNextPage, hasPreviousPage, startCursor } = getPageInfo(
    data?.posts?.pageInfo,
  );

  const { prev, next } = useNavigation({
    endCursor,
    startCursor,
    goNext,
    goPrev,
  });

  return {
    setFilter,
    filter,
    edges,
    loading,
    error,
    next,
    prev,
    hasNextPage,
    hasPreviousPage,
  };
};
