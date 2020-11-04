import { gql } from "@apollo/client";

export const QuerySingle = (fragments) => gql`
  query SingleHook($uri: String!) {
    nodeByUri(uri: $uri) {
      ${fragments.LiteralNode}
    }
  }
  ${fragments.FragmentPostSeo}
  ${fragments.FragmentTaxSeo}
  ${fragments.FragmentCategory}
  ${fragments.FragmentPost}
  ${fragments.FragmentPage}
`;

export const QuerySingleById = (fragments) => gql`
  query SingleByIdHook($databaseId: ID!) {
    contentNode(id: $databaseId, idType: DATABASE_ID) {
      ${fragments.LiteralContentNode}
    }
  }
  ${fragments.FragmentPostSeo}
  ${fragments.FragmentTaxSeo}
  ${fragments.FragmentCategory}
  ${fragments.FragmentPost}
  ${fragments.FragmentPage}
`;

export const QueryPreview = (fragments) => gql`
  query PreviewHook($databaseId: ID!) {
    contentNode(id: $databaseId, idType: DATABASE_ID, asPreview: true) {
      ${fragments.LiteralContentNode}
    }
  }
  ${fragments.FragmentPostSeo}
  ${fragments.FragmentTaxSeo}
  ${fragments.FragmentCategory}
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
  ${fragments.FragmentTaxSeo}
  ${fragments.FragmentCategory}
  ${fragments.FragmentPageInfo}
  ${fragments.FragmentPostSeo}
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

export const QueryCategory = (fragments) => gql`
  query Category($pathname: ID!) {
    category(id: $pathname, idType: URI) {
      ...categoryInfo
    }
  }
  ${fragments.FragmentTaxSeo}
  ${fragments.FragmentCategory}
`;

export const QueryCategoryPosts = (fragments) => gql`
  query CategoryPosts(
    $pathname: String!
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
      where: { categoryName: $pathname, status: PUBLISH, hasPassword: false }
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
  }
  ${fragments.FragmentPostSeo}
  ${fragments.FragmentPageInfo}
  ${fragments.FragmentTaxSeo}
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
  ${fragments.FragmentPostSeo}
  ${fragments.FragmentTaxSeo}
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

export const QueryMenu = (fragments) => gql`
  query MenuHook($location: MenuLocationEnum!, $parentId: ID!) {
    menuItems(first: 100, where: { location: $location, parentId: $parentId }) {
      nodes {
        ...menuItemInfo
        ...menuItemLevel2
      }
    }
  }
  ${fragments.FragmentMenuItem}
  ${fragments.FragmentMenuItemLevel2}
  ${fragments.FragmentMenuItemLevel3}
`;

export const QueryIsLoggedIn = () => gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;
