import React from "react";
import { Link } from "react-router-dom";
import { useNodeContext } from "../Context";
import {
  PostContent,
  SkullPage,
  Title,
  PageWidth,
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
    className = "rwg--node-render rwg--single",
    wrap,
    skullColor,
    ...props
  } = p;

  const { content, title, name } = node;

  const RenderWrapper = wrap ? wrap : PageWidth;
  const ExtraWrapper = !!Components?.ExtraWrap
    ? Components.ExtraWrap
    : React.Fragment;

  return (
    <div>
      <Title>{title || name}</Title>
      <RenderWrapper {...{ className }} {...props}>
        <ExtraWrapper>
          {!!loading && !node?.content ? (
            <SkullPage color={skullColor} />
          ) : (
            <PostContent>{content}</PostContent>
          )}
        </ExtraWrapper>
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
    loading,
    className = "rwg--node-render rwg--single rwg--post",
    wrap,
    skullColor,
    ...props
  } = p;

  const { databaseId, title, date, categories = {}, content } = node;

  const RenderWrapper = wrap ? wrap : PageWidth;
  const ExtraWrapper = !!Components?.ExtraWrap
    ? Components.ExtraWrap
    : React.Fragment;
  const pageTitle =
    categories?.edges?.length > 0 ? categories.edges[0].node.name : "Blog";

  return (
    <React.Fragment>
      <Title wrap="div">{pageTitle}</Title>
      <article className={`single post-${databaseId}`}>
        <RenderWrapper {...{ className }} {...props}>
          <ExtraWrapper>
            <h1 className="rwg--node-render-head">
              {loading ? <SkullLine color={skullColor} /> : title}
            </h1>

            <div className="post-meta">
              <div className="posted">
                <ClockIcon width={20} height={20} />
                {loading ? (
                  <SkullWord color={skullColor} />
                ) : (
                  <span>{date}</span>
                )}
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
          </ExtraWrapper>
        </RenderWrapper>
      </article>
    </React.Fragment>
  );
};
