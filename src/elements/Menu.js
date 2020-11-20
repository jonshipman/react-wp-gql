import React, { forwardRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useComponents } from "../hooks/useComponents";
import { useMenu } from "../hooks/useMenu";

export const LinkInner = ({ className = "link-inner", children }) => {
  return <span className={className}>{children}</span>;
};

export const MenuItem = (props) => {
  const {
    children,
    className = "",
    source,
    level,
    location,
    ..._props
  } = props;

  return (
    <li
      className={`menu-item level-${level || "1"} ${className || ""}`}
      {..._props}
    >
      {children}
    </li>
  );
};

// Exportable menu item container.
export const MenuItemAnchor = ({
  source = {},
  children,
  className: classNameProp = "",
  href,
  spanClassName = "",
  to,
  location,
  ...props
}) => {
  const { level = 1, onClick = () => {} } = props;
  const { components } = useComponents();
  const className = `menu-item-anchor ${classNameProp}`;

  const innerProps = {
    level,
    href,
    to,
    location,
    source,
    className: `link-inner ${spanClassName}`,
  };

  const navLinkProps = {
    exact: true,
    to,
    onClick,
    className,
    activeClassName: "current-item",
  };

  return (
    <React.Fragment>
      {href && href !== "#no-link" && (
        <a href={href || "#"} rel="nofollow noopen" {...{ className }}>
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
        <span {...{ className, onClick }}>
          <components.LinkInner {...innerProps}>
            {children}
          </components.LinkInner>
        </span>
      )}
    </React.Fragment>
  );
};

// Exportable submenu container.
export const SubMenu = ({ className = "", children }) => {
  return <ul className={`sub-menu ${className}`}>{children}</ul>;
};

/**
 * The placeholder skeleton that shows before query loads.
 */
export const MenuSkeleton = ({ error, skullColor: color, ...props }) => {
  const { components } = useComponents();

  const skullMenuItem = {
    url: "/",
    label: error?.message ? (
      error.message
    ) : (
      <components.SkullWord {...{ color }} />
    ),
  };

  return Array.from(new Array(error?.message ? 1 : 5)).map(() => (
    <ChildItem key={Math.random()} menuItem={skullMenuItem} {...props} />
  ));
};

/**
 * Child item that loops to created the nested menu.
 */
const ChildItem = ({ menuItem, level, location, ...props }) => {
  const { components } = useComponents();

  const { childItems, connectedNode: connection } = menuItem || {};
  let { cssClasses } = menuItem || {};
  let { nodes: children } = childItems || {};
  let { node: connectedNode } = connection || {};

  cssClasses = cssClasses || [];
  children = children || [];
  connectedNode = connectedNode || {};

  const hasChildren = children.length > 0;
  const localLevel = level ? level + 1 : 1;

  const menuItemProps = {
    location,
    source: menuItem,
  };

  const anchorProps = {
    spanClassName: cssClasses?.join(" ") || "",
    location,
    source: menuItem,
    onClick: props.onClick,
  };

  const subMenuProps = {
    location,
    source: menuItem,
  };

  if (
    undefined === connectedNode.__typename ||
    connectedNode.__typename === "MenuItem"
  ) {
    anchorProps.href = menuItem.url;
  } else {
    anchorProps.to = menuItem.url.replace(/^.*\/\/[^/]+/, "");
  }

  if (hasChildren) {
    menuItemProps.className += " has-children";
  }

  return (
    <components.MenuItem
      key={menuItem.id}
      level={localLevel}
      id={`menu-item-${menuItem.databaseId}`}
      {...menuItemProps}
    >
      <components.MenuItemAnchor {...anchorProps}>
        {menuItem.label}
      </components.MenuItemAnchor>
      {children.length > 0 && (
        <components.SubMenu {...subMenuProps}>
          {children.map((menuItem) => (
            <ChildItem
              key={menuItem.id}
              {...{ menuItem }}
              level={localLevel}
              {...props}
            />
          ))}
        </components.SubMenu>
      )}
    </components.MenuItem>
  );
};

/**
 * Component that loads the UL and loops the child item from the menu query.
 */
export const MenuRender = ({
  forwardedRef,
  loading,
  prepend,
  className: classNameProp = "",
  menuItems,
  children,
  ...props
}) => {
  const { components } = useComponents();

  let className = "";

  if (classNameProp.includes("flat-menu")) {
    className = classNameProp;
  } else {
    className = `nested-menu ${classNameProp}`;
  }

  return (
    <ul
      ref={forwardedRef}
      id={`menu-${props.location.toLowerCase().replace("_", "-")}`}
      {...{ className }}
      style={{ touchAction: "pan-y" }}
    >
      {prepend}
      {loading || props.error?.message ? (
        <components.MenuSkeleton {...props} />
      ) : (
        menuItems?.length > 0 &&
        menuItems.map((menuItem) => {
          return <ChildItem key={menuItem.id} {...{ menuItem }} {...props} />;
        })
      )}
      {children}
    </ul>
  );
};

/**
 * Loading component that loads the skeleton, error,
 * or finished component based on results.
 */
let Menu = (
  {
    location = "HEADER_MENU",
    onLoad = () => {},
    menuItems: menuItemsProp,
    loading: loadingProp,
    error: errorProp,
    ...props
  },
  ref,
) => {
  const { components } = useComponents();

  const {
    menuItems: menuItemsData,
    loading: loadingData,
    error: errorData,
  } = useMenu({
    location,
    skip: !!menuItemsProp,
  });

  const menuItems = menuItemsProp ? menuItemsProp : menuItemsData;
  const loading = loadingProp ? loadingProp : loadingData;
  const error = errorProp ? errorProp : errorData;

  const renderProps = {
    menuItems,
    forwardedRef: ref,
    loading,
    error,
    location,
    ...props,
  };

  useEffect(() => {
    if (menuItems.length > 0) {
      onLoad(menuItems);
    }
  }, [menuItems, onLoad]);

  return <components.MenuRender {...renderProps} />;
};

Menu = forwardRef(Menu);

/**
 * Loads a flat menu without hover classes.
 */
let FlatMenu = (props, ref) => {
  const { className = "", ...menuProps } = props;
  return (
    <Menu className={`flat-menu ${className}`} {...menuProps} {...{ ref }} />
  );
};

FlatMenu = forwardRef(FlatMenu);

export { Menu, FlatMenu };
