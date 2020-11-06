import { gql } from "@apollo/client";

export * from "../node/queries";

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
