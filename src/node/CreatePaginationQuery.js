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
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  `;
};
