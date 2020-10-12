import React, { forwardRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useComponents } from "../hooks/useComponents";
import { useMenu } from "../hooks/useMenu";

/**
 * Child item that loops to created the nested menu.
 */
export const ChildItem = ({
  menuItem,
  level,
  location,
  anchorOnClick = () => {},
  ...props
}) => {
  const { components } = useComponents();

  const { menuItems } = props;
  let hasChildren = menuItem?.childItems?.nodes?.length > 0;
  const localLevel = level ? level + 1 : 1;
  const newChildren = [];

  if (hasChildren) {
    menuItem.childItems.nodes.forEach((childItem) => {
      newChildren.push(menuItems.find((i) => i.id === childItem.id));
    });
  }

  hasChildren = newChildren.length > 0;

  const menuItemProps = {
    className: "",
    spanClassName: menuItem.cssClasses?.join(" ") || "",
    location,
  };

  if (
    undefined === menuItem?.connectedNode?.node?.__typename ||
    menuItem?.connectedNode?.node?.__typename === "MenuItem"
  ) {
    menuItemProps.href = menuItem.url;
  } else {
    menuItemProps.to = menuItem.url;
  }

  if (hasChildren) {
    menuItemProps.className += " has-children";
    menuItemProps.submenuChildren = newChildren;
  }

  return (
    <components.MenuItem
      onClick={anchorOnClick}
      key={menuItem.id}
      level={localLevel}
      id={`menu-item-${menuItem.databaseId}`}
      flat={props.flat}
      {...menuItemProps}
    >
      {menuItem.label}
    </components.MenuItem>
  );
};

export const LinkInner = ({ className = "link-inner", children }) => {
  return <span className={className}>{children}</span>;
};

export const MenuItem = (props) => {
  const { components } = useComponents();

  const { id, level = 1, flat = false } = props;
  let { className = "" } = props;

  let anchorClass = "";

  if (!flat) {
    anchorClass = "color-inherit no-underline db";
    className += " hide-child-l";

    if (level === 1) {
      className += " dib-l pv3-l hover-z-2 drop-last-child-pr";
      anchorClass += " ttu-l pv2 ph3-l hover-silver";
    } else {
      className += " nowrap";
      anchorClass += " pa2 gray hover-secondary";
    }
  } else {
    className += " pv2";
  }

  return (
    <li
      id={id}
      className={`menu-item level-${level} db relative z-1 ${className}`}
    >
      <components.MenuItemAnchor anchorClass={anchorClass} {...props} />
    </li>
  );
};

// Exportable menu item container.
export const MenuItemAnchor = ({
  submenuChildren = [],
  children,
  anchorClass = "",
  href,
  spanClassName = "",
  to,
  ...props
}) => {
  const { flat = false, level = 1, onClick = () => {} } = props;
  const { components } = useComponents();

  const innerProps = {
    flat,
    level,
    href,
    to,
    spanClassName,
    className: `link-inner ${spanClassName}`,
  };

  const navLinkProps = {
    exact: true,
    to,
    onClick,
    className: anchorClass,
    activeClassName: "current-item",
  };

  return (
    <React.Fragment>
      {href && href !== "#no-link" && (
        <a href={href || "#"} rel="nofollow noopen" className={anchorClass}>
          <components.LinkInner {...innerProps}>
            {children}
          </components.LinkInner>
        </a>
      )}

      {to && (
        <NavLink {...navLinkProps}>
          <components.LinkInner {...innerProps}>
            {children}
          </components.LinkInner>
        </NavLink>
      )}

      {((!href && !to) || href === "#no-link") && (
        <span className={anchorClass} onClick={onClick}>
          <components.LinkInner {...innerProps}>
            {children}
          </components.LinkInner>
        </span>
      )}

      {submenuChildren.length > 0 && (
        <components.SubMenu>
          {submenuChildren.map((m) => (
            <components.ChildItem
              key={m.id}
              menuItem={m}
              level={level}
              anchorOnClick={onClick}
              {...props}
            />
          ))}
        </components.SubMenu>
      )}
    </React.Fragment>
  );
};

// Exportable submenu container.
export const SubMenu = ({
  className = "",
  level = 1,
  flat = false,
  children,
}) => {
  if (!flat) {
    className += " child bg-white absolute-l z-1";
    if (level === 1) {
      className +=
        " ba-l b--light-gray w5-l tl-l top-100-l left-50-l trans-x--50-l";
    } else {
      className += " left-100 top-0";
    }
  } else {
    className += " dn";
  }

  return <ul className={`sub-menu list pl0 ${className}`}>{children}</ul>;
};

/**
 * The placeholder skeleton that shows before query loads.
 */
export const MenuSkeleton = ({ error, ...props }) => {
  let { components } = useComponents();
  components = { MenuItem, ...components };

  return Array.from(new Array(error?.message ? 1 : 5)).map(() => (
    <components.MenuItem key={Math.random()} href="/" {...props}>
      {error?.message ? error.message : <components.SkullWord />}
    </components.MenuItem>
  ));
};

/**
 * Component that loads the UL and loops the child item from the menu query.
 */
export const MenuRender = ({
  forwardedRef,
  loading,
  children,
  className = "",
  ...props
}) => {
  let { components } = useComponents();
  components = { MenuSkeleton, ChildItem, ...components };

  return (
    <ul
      ref={forwardedRef}
      id={`menu-${props.location.toLowerCase().replace("_", "-")}`}
      className={`nested-menu list pl0 ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {loading || props.error?.message ? (
        <components.MenuSkeleton {...props} />
      ) : (
        props?.menuItems?.length > 0 &&
        props.menuItems.map((menuItem) => {
          if (menuItem.parentId === null) {
            return (
              <components.ChildItem
                key={menuItem.id}
                menuItem={menuItem}
                {...props}
              />
            );
          } else {
            return null;
          }
        })
      )}
      {children}
    </ul>
  );
};

/**
 * Loads a flat menu without hover classes.
 */
let FlatMenu = (
  { location = "HEADER_MENU", onLoad = () => {}, ...props },
  ref,
) => {
  let { components } = useComponents();
  components = { MenuRender, ...components };

  const { menuItems, loading, error } = useMenu({ location, ssr: false });

  const renderProps = {
    flat: true,
    menuItems,
    forwardedRef: ref,
    loading,
    error,
    location,
    ...props,
  };

  useEffect(() => {
    menuItems.length > 0 && onLoad(menuItems);
  }, [menuItems, onLoad]);

  return <components.MenuRender {...renderProps} />;
};

FlatMenu = forwardRef(FlatMenu);

/**
 * Loading component that loads the skeleton, error,
 * or finished component based on results.
 */
let Menu = ({ location = "HEADER_MENU", onLoad = () => {}, ...props }, ref) => {
  let { components } = useComponents();
  components = { MenuRender, ...components };

  const { menuItems, loading, error } = useMenu({ location, ssr: false });

  const renderProps = {
    menuItems,
    forwardedRef: ref,
    loading,
    error,
    location,
    ...props,
  };

  useEffect(() => {
    menuItems.length > 0 && onLoad(menuItems);
  }, [menuItems, onLoad]);

  return <components.MenuRender {...renderProps} />;
};

Menu = forwardRef(Menu);

export { Menu, FlatMenu };
