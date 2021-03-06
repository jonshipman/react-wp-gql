import { CreatePaginationQuery } from "./CreatePaginationQuery";

export const FragmentPost = `
  fragment PostFragment on Post {
    id
    databaseId
    uri
    title
    excerpt
    content
    date
    isRestricted
    isPreview
    categories(first: 5) {
      edges {
        node {
          id
          databaseId
          slug
          name
          uri
        }
      }
    }
  }
`;

export const FragmentPage = `
  fragment PageFragment on Page {
    id
    databaseId
    uri
    title
    content
  }
`;

export const FragmentContentType = `
  fragment ContentTypeFragment on ContentType {
    id
    title: label
    ${CreatePaginationQuery("contentNodes", "... on Post {...PostFragment}")}
  }
`;

export const FragmentUserArchive = `
  fragment UserArchiveFragment on User {
    id
    name
    ${CreatePaginationQuery("posts", "...PostFragment")}
  }
`;

export const FragmentCategory = `
  fragment CategoryFragment on Category {
    id
    databaseId
    slug
    name
    uri
    ${CreatePaginationQuery("posts", "...PostFragment")}
  }
`;

export const FragmentTag = `
  fragment TagFragment on Tag {
    id
    databaseId
    slug
    name
    uri
    ${CreatePaginationQuery("posts", "...PostFragment")}
  }
`;
