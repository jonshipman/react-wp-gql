import { gql } from "@apollo/client";

export const LiteralPageInfo = `
  endCursor
  hasNextPage
  hasPreviousPage
  startCursor
`;

export const LiteralSeo = `
  title
  metaDesc
  breadcrumbs {
    url
    text
  }
`;

export const CreatePaginationQuery = (
  field,
  fragment,
  where = "status: PUBLISH, hasPassword: false",
) => {
  return `
    posts: ${field}(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { ${where} }
    ) {
      edges {
        node {
          ${fragment}
        }
      }
      pageInfo {
        ${LiteralPageInfo}
      }
    }
  `;
};

export const LiteralContentNode = `
  __typename
  ... on Post {
    ...PostFragment
  }
  ... on Page {
    ...PageFragment
  }
`;

// LiteralNode is joined with LiteralContentNode in Defaults.js
export const LiteralNode = `
  ... on Category {
    ...CategoryFragment
    ${CreatePaginationQuery("posts", "...PostFragment")}
  }
`;

export const FragmentCategory = gql`
  fragment CategoryFragment on Category {
    id
    databaseId
    slug
    name
    uri
    seo {
      ${LiteralSeo}
    }
  }
`;

export const FragmentPost = gql`
  fragment PostFragment on Post {
    id
    databaseId
    uri
    title
    excerpt
    content
    dateFormatted
    isRestricted
    isPreview
    seo {
      ${LiteralSeo}
    }
    categories(first: 5) {
      edges {
        node {
          ...CategoryFragment
        }
      }
    }
  }
`;

export const FragmentPage = gql`
  fragment PageFragment on Page {
    id
    databaseId
    uri
    title
    content
    pageTemplate
    seo {
      ${LiteralSeo}
    }
  }
`;

export const ContentNodeFragments = gql`
  ${FragmentCategory}
  ${FragmentPost}
  ${FragmentPage}
`;
