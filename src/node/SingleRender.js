import React from "react";
import { useComponents } from "../hooks";

export const SingleRender = ({
  node = {},
  loading,
  className = "mv4",
  wrap,
  skullColor,
  ...props
}) => {
  const { content, title, name } = node;

  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;

  return (
    <div>
      <components.Title>{title || name}</components.Title>
      <RenderWrapper {...{ className }} {...props}>
        {loading ? (
          <components.SkullPage color={skullColor} />
        ) : (
          <components.PostContent>{content}</components.PostContent>
        )}
      </RenderWrapper>
    </div>
  );
};
