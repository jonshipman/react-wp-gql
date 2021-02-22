import React from "react";
import { Link } from "react-router-dom";
import { useNodeContext } from "../Context";
import {
  PostContent,
  SkullPage,
  Title,
  SkullLine,
  SkullWord,
} from "../elements";
import { ClockIcon, FolderIcon } from "../static/images";

export const SingleRender = (p) => {
  const { components: Components } = useNodeContext();
  if (Components?.SingleRender) return <Components.SingleRender {...p} />;

  const {
    node = {},
    loading,
    title: TitleComponent = Title,
    className = "rwg--node-render rwg--single",
    wrap,
    skullColor,
  } = p;

  const { content, title, name } = node;

  const RenderWrapper = wrap ? wrap : "div";

  return (
    <div>
      <TitleComponent {...{ wrap }}>{title || name}</TitleComponent>
      <RenderWrapper {...{ className }}>
        {!!loading && !node?.content ? (
          <SkullPage color={skullColor} />
        ) : (
          <PostContent>{content}</PostContent>
        )}
      </RenderWrapper>
    </div>
  );
};

export const SingleCategoryListItem = ({ uri, name, children }) => {
  const Wrap = uri ? Link : "span";
  return (
    <li className="category-item">
      <Wrap to={uri}>{name || children}</Wrap>
    </li>
  );
};

export const SinglePostRender = (p) => {
  const { components: Components } = useNodeContext();
  if (Components?.SinglePostRender)
    return <Components.SinglePostRender {...p} />;

  const {
    node = {},
    title: TitleComponent = Title,
    loading,
    className = "rwg--node-render rwg--single rwg--post",
    wrap,
    skullColor,
  } = p;

  const { databaseId, title, date, categories = {}, content } = node;

  const RenderWrapper = wrap ? wrap : "div";
  const pageTitle =
    categories?.edges?.length > 0 ? categories.edges[0].node.name : "Archives";

  return (
    <React.Fragment>
      <TitleComponent {...{ wrap }} notHeading>
        {pageTitle}
      </TitleComponent>
      <article className={`single post-${databaseId}`}>
        <RenderWrapper {...{ className }}>
          <h1 className="rwg--node-render-head">
            {loading ? <SkullLine color={skullColor} /> : title}
          </h1>

          <div className="post-meta">
            <div className="posted">
              <ClockIcon width={20} height={20} />
              {loading ? <SkullWord color={skullColor} /> : <span>{date}</span>}
            </div>

            <div className="post-categories">
              {(categories?.edges?.length > 0 || loading) && (
                <FolderIcon width={20} height={20} />
              )}

              {loading ? (
                <ul className="list">
                  <SingleCategoryListItem>
                    <SkullWord color={skullColor} />
                  </SingleCategoryListItem>
                  <SingleCategoryListItem>
                    <SkullWord color={skullColor} />
                  </SingleCategoryListItem>
                </ul>
              ) : (
                categories?.edges?.length > 0 && (
                  <ul className="list">
                    {categories.edges.map((category) => (
                      <SingleCategoryListItem
                        key={category.node.id}
                        {...category.node}
                      />
                    ))}
                  </ul>
                )
              )}
            </div>
          </div>

          {loading ? (
            <SkullPage color={skullColor} />
          ) : (
            <PostContent>{content}</PostContent>
          )}
        </RenderWrapper>
      </article>
    </React.Fragment>
  );
};
