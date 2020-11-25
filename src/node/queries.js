import { gql } from "@apollo/client";
import { CreatePaginationQuery } from "./CreatePaginationQuery";
import { FragmentCategory, FragmentPage, FragmentPost } from "./fragments";

const ContentNodes = `
  __typename
  ... on Post {
    ...PostFragment
  }
  ... on Page {
    ...PageFragment
  }
`;

export const QueryNodeByUri = (fragments) => gql`
  query Node(
    $uri: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    node: nodeByUri(uri: $uri) {
      ${ContentNodes}
      ... on Category {
        ...CategoryFragment
        ${CreatePaginationQuery("posts", "...PostFragment")}
      }
    }
  }
  ${fragments.FragmentCategory || FragmentCategory}
  ${fragments.FragmentPage || FragmentPage}
  ${fragments.FragmentPost || FragmentPost}
`;

export const QueryContentNodeById = (fragments) => gql`
  query ContentNodeId($databaseId: ID!) {
    node: contentNode(id: $databaseId, idType: DATABASE_ID) {
      ${ContentNodes}
    }
  }
  ${fragments.FragmentPage || FragmentPage}
  ${fragments.FragmentPost || FragmentPost}
`;

export const QuerySearch = (fragments) => gql`
  query Search(
    $filter: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    ${CreatePaginationQuery("contentNodes", ContentNodes)}
  }
  ${fragments.FragmentPage || FragmentPage}
  ${fragments.FragmentPost || FragmentPost}
`;

export const QueryCategory = (fragments) => gql`
  query CategoryPosts(
    $pathname: ID!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    node: category(id: $pathname, idType: URI) {
      ...CategoryFragment
      ${CreatePaginationQuery("posts", "...PostFragment")}
    }
  }
  ${fragments.FragmentCategory || FragmentCategory}
  ${fragments.FragmentPost || FragmentPost}
`;

export const QueryArchive = (fragments) => gql`
  query Archive($first: Int, $last: Int, $after: String, $before: String) {
    ${CreatePaginationQuery("posts", "...PostFragment")}
  }
  ${fragments.FragmentCategory || FragmentCategory}
  ${fragments.FragmentPost || FragmentPost}
`;
