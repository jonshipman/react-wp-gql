import { gql } from "@apollo/client";
import { CreatePaginationQuery } from "./CreatePaginationQuery";

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
      }
      ... on ContentType {
        ...ContentTypeFragment
      }
      ... on User {
        ...UserArchiveFragment
      }
    }
  }
  ${fragments.FragmentContentType}
  ${fragments.FragmentCategory}
  ${fragments.FragmentPage}
  ${fragments.FragmentPost}
  ${fragments.FragmentUserArchive}
`;

export const QueryContentNodeById = (fragments) => gql`
  query ContentNodeId($databaseId: ID!) {
    node: contentNode(id: $databaseId, idType: DATABASE_ID) {
      ${ContentNodes}
    }
  }
  ${fragments.FragmentPage}
  ${fragments.FragmentPost}
`;

export const QuerySearch = (fragments) => gql`
  query Search(
    $filter: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    ${CreatePaginationQuery(
      "contentNodes",
      ContentNodes,
      "status: PUBLISH, search: $filter",
    )}
  }
  ${fragments.FragmentPage}
  ${fragments.FragmentPost}
`;
