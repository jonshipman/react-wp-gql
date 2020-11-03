import { gql } from "@apollo/client";

export const FragmentPageInfo = gql`
  fragment edgePageInfo on WPPageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;

export const FragmentPostSeo = gql`
  fragment seoPostInfo on PostTypeSEO {
    title
    metaDesc
    breadcrumbs {
      url
      text
    }
  }
`;

export const FragmentTaxSeo = gql`
  fragment seoTaxInfo on TaxonomySEO {
    title
    metaDesc
    breadcrumbs {
      url
      text
    }
  }
`;

export const FragmentCategory = gql`
  fragment categoryInfo on Category {
    id
    databaseId
    slug
    name
    uri
    seo {
      ...seoTaxInfo
    }
  }
`;

export const FragmentPost = gql`
  fragment postInfo on Post {
    id
    databaseId
    title
    uri
    excerpt
    content
    dateFormatted
    isRestricted
    isPreview
    seo {
      ...seoPostInfo
    }
    categories(first: 5) {
      edges {
        node {
          ...categoryInfo
        }
      }
    }
  }
`;

export const FragmentPage = gql`
  fragment pageInfo on Page {
    id
    databaseId
    title
    content
    pageTemplate
    seo {
      ...seoPostInfo
    }
  }
`;

export const FragmentContentNode = gql`
  fragment contentInfo on ContentNode {
    id
    databaseId
    isRestricted
    isPreview
    slug
    __typename
    ... on Post {
      ...postInfo
    }
    ... on Page {
      ...pageInfo
    }
  }
`;

export const FragmentMenuItemLevel3 = gql`
  fragment menuItemLevel3 on MenuItem {
    childItems {
      nodes {
        ...menuItemInfo
      }
    }
  }
`;

export const FragmentMenuItemLevel2 = gql`
  fragment menuItemLevel2 on MenuItem {
    childItems {
      nodes {
        ...menuItemInfo
        ...menuItemLevel3
      }
    }
  }
`;

export const FragmentMenuItem = gql`
  fragment menuItemInfo on MenuItem {
    id
    databaseId
    parentId
    url
    label
    cssClasses
    connectedNode {
      node {
        __typename
      }
    }
  }
`;

export const LiteralContentNode = `
  __typename
  ... on Post {
    ...postInfo
  }
  ... on Page {
    ...pageInfo
  }
`;

export const LiteralNode = LiteralContentNode;
