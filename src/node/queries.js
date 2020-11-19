import { gql } from "@apollo/client";

export const QueryNodeByUri = (fragments) => gql`
  query Node(
    $uri: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    node: nodeByUri(uri: $uri) {
      ${fragments.LiteralNode}
    }
  }
  ${fragments.ContentNodeFragments}
`;

export const QueryContentNodeById = (fragments) => gql`
  query ContentNodeId($databaseId: ID!) {
    node: contentNode(id: $databaseId, idType: DATABASE_ID) {
      ${fragments.LiteralContentNode}
    }
  }
  ${fragments.ContentNodeFragments}
`;

export const QuerySearch = (fragments) => gql`
  query Search(
    $filter: String!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    posts: contentNodes(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { search: $filter, status: PUBLISH, hasPassword: false }
    ) {
      edges {
        node {
          ${fragments.LiteralContentNode}
        }
      }
      pageInfo {
        ${fragments.LiteralPageInfo}
      }
    }
  }
  ${fragments.ContentNodeFragments}
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
      posts(
        first: $first
        last: $last
        after: $after
        before: $before
        where: { status: PUBLISH, hasPassword: false }
      ) {
        edges {
          node {
            ...PostFragment
          }
        }
        pageInfo {
          ${fragments.LiteralPageInfo}
        }
      }
    }
  }
  ${fragments.FragmentCategory}
  ${fragments.FragmentPost}
`;

export const QueryArchive = (fragments) => gql`
  query Archive($first: Int, $last: Int, $after: String, $before: String) {
    posts(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { status: PUBLISH, hasPassword: false }
    ) {
      edges {
        node {
          ...PostFragment
        }
      }
      pageInfo {
        ${fragments.LiteralPageInfo}
      }
    }
  }
  ${fragments.FragmentCategory}
  ${fragments.FragmentPost}
`;
