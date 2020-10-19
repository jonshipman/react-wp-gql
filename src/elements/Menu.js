import React, { forwardRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useComponents } from "../hooks/useComponents";
import { useMenu } from "../hooks/useMenu";

export const LinkInner = ({ className = "link-inner", children }) => {
  return <span className={className}>{children}</span>;
};

export const MenuItem = (props) => {
  const { id, level = 1 } = props;
  const { className = "db relative z-1", children } = props;

  return (
    <li id={id} className={`menu-item level-${level} ${className}`}>
      {children}
    </li>
  );
};

// Exportable menu item container.
export const MenuItemAnchor = ({
  source = {},
  children,
  className = "",
  href,
  spanClassName = "",
  to,
  ...props
}) => {
  const { level = 1, onClick = () => {} } = props;
  const { components } = useComponents();

  const innerProps = {
    level,
    href,
    to,
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
export const MenuSkeleton = ({ error, ...props }) => {
  const { components } = useComponents();

  const skullMenuItem = {
    url: "/",
    label: error?.message ? error.message : <components.SkullWord />,
  };

  return Array.from(new Array(error?.message ? 1 : 5)).map(() => (
    <ChildItem key={Math.random()} menuItem={skullMenuItem} {...props} />
  ));
};

/**
 * Child item that loops to created the nested menu.
 */
const ChildItem = ({ menuItem = {}, level, location, ...props }) => {
  const { components } = useComponents();

  const {
    childItems = { nodes: [] },
    cssClasses = [],
    connectedNode: connection = { node: {} },
  } = menuItem;
  const { nodes: children = [] } = childItems;
  const { node: connectedNode } = connection;

  const { elements } = props;
  const hasChildren = children.length > 0;
  const localLevel = level ? level + 1 : 1;

  let menuItemProps = {
    className: "hide-child-l",
    location,
    source: menuItem,
  };

  let anchorProps = {
    spanClassName: cssClasses?.join(" ") || "",
    className: "color-inherit no-underline db",
    location,
    source: menuItem,
  };

  let subMenuProps = {
    className: "list pl0 child bg-white absolute-l z-1",
    location,
    source: menuItem,
  };

  if (localLevel === 1) {
    menuItemProps.className += " dib-l pv3-l hover-z-2 drop-last-child-pr";
    anchorProps.className += " pv2 ph3-l hover-secondary";
    subMenuProps.className +=
      " ba-l b--light-gray w5-l tl-l top-100-l left-50-l trans-x--50-l";
  } else {
    menuItemProps.className += " nowrap";
    anchorProps.className += " pa2 gray";
    subMenuProps.className += " left-100 top-0";
  }

  if (
    undefined === connectedNode.__typename ||
    connectedNode.__typename === "MenuItem"
  ) {
    anchorProps.href = menuItem.url;
  } else {
    anchorProps.to = menuItem.url;
  }

  if (hasChildren) {
    menuItemProps.className += " has-children";
  }

  let ComponentType = components.MenuItem;
  let AnchorType = components.MenuItemAnchor;
  let SubMenuType = components.SubMenu;

  if (elements && elements[localLevel]?.length > 0) {
    ComponentType = elements[localLevel][0].type;
    menuItemProps = { ...menuItemProps, ...elements[localLevel][0].props };

    if (elements[localLevel][1].type) {
      AnchorType = elements[localLevel][1].type;
      anchorProps = { ...anchorProps, ...elements[localLevel][1].props };
    }

    if (elements[localLevel][2].type) {
      SubMenuType = elements[localLevel][2].type;
      subMenuProps = { ...subMenuProps, ...elements[localLevel][2].props };
    }
  }

  return (
    <ComponentType
      key={menuItem.id}
      level={localLevel}
      id={`menu-item-${menuItem.databaseId}`}
      {...menuItemProps}
    >
      <AnchorType {...anchorProps}>{menuItem.label}</AnchorType>
      {children.length > 0 && (
        <SubMenuType {...subMenuProps}>
          {children.map((menuItem) => (
            <components.ChildItem
              key={m.id}
              {...{ level, menuItem }}
              {...props}
            />
          ))}
        </SubMenuType>
      )}
    </ComponentType>
  );
};

/**
 * Component that loads the UL and loops the child item from the menu query.
 */
export const MenuRender = ({
  forwardedRef,
  loading,
  append,
  prepend,
  className = "list pl0",
  menuItems,
  ...props
}) => {
  const { components } = useComponents();

  return (
    <ul
      ref={forwardedRef}
      id={`menu-${props.location.toLowerCase().replace("_", "-")}`}
      className={`nested-menu ${className}`}
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
      {append}
    </ul>
  );
};

/**
 * Builds a layered menu structure from passed props.
 * Each level has an array of 3 items - the li wrapper, anchor, and ul.
 */
const childLayoutBuilder = (children, elements, level = 1) => {
  if (children) {
    const levelArray = [];

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      const { children: elementChildren, ...childProps } = element.props || {};

      const levelObject = {};
      levelObject.type = element.type;
      levelObject.props = childProps;
      levelArray.push(levelObject);

      React.Children.forEach(elementChildren, (inner) => {
        if (!React.isValidElement(inner)) return;

        const { children: innerChildren, ...innerChildProps } =
          inner.props || {};

        const innerLevelObject = {};
        innerLevelObject.type = inner.type;
        innerLevelObject.props = innerChildProps;
        levelArray.push(innerLevelObject);

        childLayoutBuilder(innerChildren, elements, level + 1);
      });
    });

    elements[level] = levelArray;
  }
};

/**
 * Loading component that loads the skeleton, error,
 * or finished component based on results.
 */
let Menu = (
  { location = "HEADER_MENU", onLoad = () => {}, children, ...props },
  ref,
) => {
  const { components } = useComponents();

  const { menuItems, loading, error } = useMenu({ location });

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

  if (children) {
    const elements = {};
    childLayoutBuilder(children, elements);

    renderProps.elements = elements;
  }

  return <components.MenuRender {...renderProps} />;
};

Menu = forwardRef(Menu);

/**
 * Loads a flat menu without hover classes.
 */
let FlatMenu = (props, ref) => {
  return (
    <Menu {...{ ...props, ref }}>
      <MenuItem className="db">
        <MenuItemAnchor className="color-inherit no-underline" />
        <SubMenu className="db">
          <MenuItem className="db">
            <MenuItemAnchor className="color-inherit no-underline" />
            <SubMenu className="db">
              <MenuItem className="db">
                <MenuItemAnchor className="color-inherit no-underline" />
                <SubMenu className="db" />
              </MenuItem>
            </SubMenu>
          </MenuItem>
        </SubMenu>
      </MenuItem>
    </Menu>
  );
};

FlatMenu = forwardRef(FlatMenu);

export { Menu, FlatMenu };
