import { gql } from "@apollo/client";

export const QuerySingle = (fragments) => gql`
  query SingleHook($uri: ID!) {
    contentNode(id: $uri, idType: URI) {
      ...contentInfo
      ... on Post {
        ...postInfo
      }
      ... on Page {
        ...pageInfo
      }
    }
  }
  ${fragments.FragmentSeo}
  ${fragments.FragmentCategory}
  ${fragments.FragmentContentNode}
  ${fragments.FragmentPost}
  ${fragments.FragmentPage}
`;

export const QuerySingleById = (fragments) => gql`
  query SingleByIdHook($databaseId: ID!) {
    contentNode(id: $databaseId, idType: DATABASE_ID) {
      ...contentInfo
      ... on Post {
        ...postInfo
      }
      ... on Page {
        ...pageInfo
      }
    }
  }
  ${fragments.FragmentSeo}
  ${fragments.FragmentCategory}
  ${fragments.FragmentContentNode}
  ${fragments.FragmentPost}
  ${fragments.FragmentPage}
`;

export const QuerySearch = (fragments) => gql`
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

export const QueryHeartbeat = () => gql`
  query HeartbeatQuery {
    viewer {
      id
      jwtAuthExpiration
      capabilities
    }
  }
`;

export const QueryCategories = (fragments) => gql`
  query CategoryHook(
    $filter: String!
    $id: ID!
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
      where: { categoryName: $filter, status: PUBLISH, hasPassword: false }
    ) {
      pageInfo {
        ...edgePageInfo
      }
      edges {
        node {
          ...postInfo
        }
      }
    }
    category(id: $id, idType: SLUG) {
      ...categoryInfo
    }
  }
  ${fragments.FragmentSeo}
  ${fragments.FragmentPageInfo}
  ${fragments.FragmentCategory}
  ${fragments.FragmentPost}
`;

export const QueryArchive = (fragments) => gql`
  query ArchiveHook($first: Int, $last: Int, $after: String, $before: String) {
    posts(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { status: PUBLISH, hasPassword: false }
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
  ${fragments.FragmentSeo}
  ${fragments.FragmentCategory}
  ${fragments.FragmentPageInfo}
  ${fragments.FragmentPost}
`;

export const QueryPermissions = () => gql`
  query PermissionsQuery {
    viewer {
      id
      databaseId
      capabilities
    }
  }
`;
