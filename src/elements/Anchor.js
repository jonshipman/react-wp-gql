import React from "react";
import { Link } from "react-router-dom";

export const Anchor = (existing) => {
  const props = { ...existing };

  let origin = null;

  try {
    ({ origin } = new URL(props.href));
  } catch (error) {
    if (props.href.indexOf("/") === 0) {
      origin = window.location.origin;
      props.href = origin + props.href;
    }
  }

  if (origin.indexOf(window.location.origin) === 0) {
    return <Link to={props.href.replace(origin, "")} {...props} href={null} />;
  }

  if (!props.target && props.href.indexOf("tel") !== 0) {
    props.target = "_new";
  }

  if (!props.rel) {
    props.rel = "noopen nofollow";
  }

  // eslint-disable-next-line
  return <a {...props} />;
};

export default Anchor;
