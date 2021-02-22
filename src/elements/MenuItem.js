import React from "react";
import { useLocation } from "react-router-dom";
import Anchor from "./Anchor";
import Submenu from "./Submenu";

export function MenuItem({ index, hover, setHover, item, menuItems }) {
  const { pathname } = useLocation();

  const postType = item.connectedNode?.node?.__typename
    ? item.connectedNode.node.__typename.toLowerCase()
    : "post";

  const DivProps = {
    className: `menu-item menu-item-object-${postType} ${postType}-${item.databaseId} menu-item-${item.databaseId}`,
    id: `menu-item-${item.databaseId}`,
  };

  const AnchorProps = {
    className: "",
    onMouseEnter: () => setHover(item.id),
    onClick: () => setHover(item.id),
  };

  if (menuItems?.length > 0 && index === menuItems.length - 1) {
    DivProps.className += " menu-item-last";
  }

  if (item.childItems?.nodes) {
    DivProps.className += " menu-item-has-children";
  }

  const SpanProps = { className: "" };

  if (window.location.origin + pathname === item.url) {
    DivProps.className += " current-menu-item";
    AnchorProps["aria-current"] = postType;
  }

  if (hover === item.id) {
    DivProps.className += " hover-menu-item";
  }

  if (item.cssClasses?.length > 0) {
    SpanProps.className += " " + item.cssClasses.join(" ");
  }

  return (
    <div {...DivProps}>
      <Anchor href={item.url} {...AnchorProps}>
        <span {...SpanProps}>{item.label}</span>
      </Anchor>
      {item.childItems?.nodes && hover === item.id ? (
        <Submenu items={item.childItems.nodes} {...{ menuItems }} />
      ) : null}
    </div>
  );
}

export default MenuItem;
