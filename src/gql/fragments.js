import { gql } from "@apollo/client";

export const FragmentPageInfo = gql`
  fragment edgePageInfo on WPPageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;

export const FragmentSeo = gql`
  fragment seoInfo on SEO {
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
      ...seoInfo
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
    seo {
      ...seoInfo
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
    title
    content
    pageTemplate
    seo {
      ...seoInfo
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

export const FragmentMenu = gql`
  fragment menuInfo on Menu {
    id
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
    childItems {
      nodes {
        id
        parentId
      }
    }
  }
`;
