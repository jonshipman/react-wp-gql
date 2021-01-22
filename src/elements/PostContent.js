import React from "react";
import { useNodeContext } from "../Context";

const trimString = (str) => {
  if (!str) return str;

  let _str = str.replace(/(<([^>]+)>)/gi, "");
  if (_str.length > 250) {
    _str = _str.substring(0, 250) + "&hellip;";
  }
  return _str;
};

export const PostContent = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.PostContent) return <Components.PostContent {...props} />;

  const { className, content, children, trim = false } = props;

  let text = content || children;
  if (trim) {
    text = trimString(text);
  }

  return (
    <div
      className={`post-content ${className || ""}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
