import React, { forwardRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNodeContext } from "../Context";
import { useNode, useMenu } from "../hooks";
import { SkullWord } from "./Skeleton";

const DefaultPreload = ({ uri }) => {
  useNode({ uri });

  return null;
};

export const LinkInner = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.LinkInner) return <Components.LinkInner {...props} />;
  const { className = "link-inner", children } = props;

  return <span className={className}>{children}</span>;
};

export const MenuItem = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.MenuItem) return <Components.MenuItem {...props} />;

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
  const { Preload } = useNodeContext();
  const [entered, setEntered] = useState(false);
  const { level = 1, onClick = () => {} } = props;
  const className = `menu-item-anchor ${classNameProp}`;

  const MenuPreload = !!Preload ? Preload : DefaultPreload;

  const innerProps = {
    level,
    href,
    to,
    location,
    source,
    className: `link-inner ${spanClassName}`,
  };

  const onMouseEnter = () => {
    setEntered(true);
  };

  const navLinkProps = {
    exact: true,
    to,
    onClick,
    className,
    activeClassName: "current-item",
    onMouseEnter,
  };

  return (
    <React.Fragment>
      {href && href !== "#no-link" && (
        <a href={href || "#"} rel="nofollow noopen" {...{ className }}>
          <LinkInner {...innerProps}>{children}</LinkInner>
        </a>
      )}

      {to && (
        <NavLink {...navLinkProps}>
          {entered && <MenuPreload uri={to} />}
          <LinkInner {...innerProps}>{children}</LinkInner>
        </NavLink>
      )}

      {((!href && !to) || href === "#no-link") && (
        <span {...{ className, onClick }}>
          <LinkInner {...innerProps}>{children}</LinkInner>
        </span>
      )}
    </React.Fragment>
  );
};

// Exportable submenu container.
export const SubMenu = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.SubMenu) return <Components.SubMenu {...props} />;

  const { className = "", children } = props;

  return <ul className={`sub-menu ${className}`}>{children}</ul>;
};

/**
 * The placeholder skeleton that shows before query loads.
 */
export const MenuSkeleton = (p) => {
  const { components: Components } = useNodeContext();
  if (Components?.MenuSkeleton) return <Components.MenuSkeleton {...p} />;

  const { error, skullColor: color, ...props } = p;
  const skullMenuItem = {
    url: "/",
    label: error?.message ? error.message : <SkullWord {...{ color }} />,
  };

  return Array.from(new Array(error?.message ? 1 : 5)).map(() => (
    <ChildItem key={Math.random()} menuItem={skullMenuItem} {...props} />
  ));
};

/**
 * Child item that loops to created the nested menu.
 */
const ChildItem = ({ menuItem, level, location, index, ...props }) => {
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
    index,
    className: "",
  };

  const anchorProps = {
    spanClassName: cssClasses?.join(" ") || "",
    location,
    source: menuItem,
    onClick: props.onClick,
    index,
  };

  const subMenuProps = {
    location,
    source: menuItem,
    index,
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
    <MenuItem
      key={menuItem.id}
      level={localLevel}
      id={`menu-item-${menuItem.databaseId}`}
      {...menuItemProps}
    >
      <MenuItemAnchor {...anchorProps}>{menuItem.label}</MenuItemAnchor>
      {children.length > 0 && (
        <SubMenu {...subMenuProps}>
          {children.map((menuItem) => (
            <ChildItem
              key={menuItem.id}
              {...{ menuItem }}
              level={localLevel}
              {...props}
            />
          ))}
        </SubMenu>
      )}
    </MenuItem>
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
      {(!!loading && (menuItems || []).length === 0) || props.error?.message ? (
        <MenuSkeleton {...props} />
      ) : (
        menuItems?.length > 0 &&
        menuItems.map((menuItem, index) => {
          return (
            <ChildItem key={menuItem.id} {...{ menuItem, index }} {...props} />
          );
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

  return <MenuRender {...renderProps} />;
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
