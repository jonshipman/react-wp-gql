import { gql } from "@apollo/client";

export * from "../node/fragments";

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
