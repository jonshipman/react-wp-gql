export * from "../node/fragments";

export const FragmentMenuItemLevel3 = `
  fragment MenuItemLevel3Fragment on MenuItem {
    childItems(first:25) {
      nodes {
        ...MenuItemFragment
      }
    }
  }
`;

export const FragmentMenuItemLevel2 = `
  fragment MenuItemLevel2Fragment on MenuItem {
    childItems(first: 50) {
      nodes {
        ...MenuItemFragment
        ...MenuItemLevel3Fragment
      }
    }
  }
`;

export const FragmentMenuItem = `
  fragment MenuItemFragment on MenuItem {
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
