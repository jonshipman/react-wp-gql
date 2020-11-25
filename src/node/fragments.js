export const FragmentCategory = `
  fragment CategoryFragment on Category {
    id
    databaseId
    slug
    name
    uri
  }
`;

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
          ...CategoryFragment
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
