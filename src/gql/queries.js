import { gql } from "@apollo/client";
import {
  FragmentMenuItem,
  FragmentMenuItemLevel2,
  FragmentMenuItemLevel3,
} from "./fragments";

export * from "../node/queries";

export const QueryMenu = (fragments) => gql`
  query MenuHook($location: MenuLocationEnum!, $parentId: ID!) {
    menuItems(first: 100, where: { location: $location, parentId: $parentId }) {
      nodes {
        ...MenuItemFragment
        ...MenuItemLevel2Fragment
      }
    }
  }
  ${fragments.FragmentMenuItem || FragmentMenuItem}
  ${fragments.FragmentMenuItemLevel2 || FragmentMenuItemLevel2}
  ${fragments.FragmentMenuItemLevel3 || FragmentMenuItemLevel3}
`;

export const QueryIsLoggedIn = gql`
  query IsLoggedIn {
    isLoggedIn
  }
`;
