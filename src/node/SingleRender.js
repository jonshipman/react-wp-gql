import React from "react";
import { Link } from "react-router-dom";
import { useComponents } from "../hooks";

export const SingleRender = ({
  node = {},
  loading,
  className = "rwg--node-render rwg--single",
  wrap,
  skullColor,
  ...props
}) => {
  const { content, title, name } = node;

  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;
  const ExtraWrapper = !!components.ExtraWrap
    ? components.ExtraWrap
    : React.Fragment;

  return (
    <div>
      <components.Title>{title || name}</components.Title>
      <RenderWrapper {...{ className }} {...props}>
        <ExtraWrapper>
          {!!loading && !node?.content ? (
            <components.SkullPage color={skullColor} />
          ) : (
            <components.PostContent>{content}</components.PostContent>
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

export const SinglePostRender = ({
  node = {},
  loading,
  className = "rwg--node-render rwg--single rwg--post",
  wrap,
  skullColor,
  ...props
}) => {
  const { databaseId, title, date, categories = {}, content } = node;

  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;
  const ExtraWrapper = !!components.ExtraWrap
    ? components.ExtraWrap
    : React.Fragment;
  const pageTitle =
    categories?.edges?.length > 0 ? categories.edges[0].node.name : "Blog";

  return (
    <React.Fragment>
      <components.Title wrap="div">{pageTitle}</components.Title>
      <article className={`single post-${databaseId}`}>
        <RenderWrapper {...{ className }} {...props}>
          <ExtraWrapper>
            <h1 className="rwg--node-render-head">
              {loading ? <components.SkullLine color={skullColor} /> : title}
            </h1>

            <div className="post-meta">
              <div className="posted">
                <components.ClockIcon width={20} height={20} />
                {loading ? (
                  <components.SkullWord color={skullColor} />
                ) : (
                  <span>{date}</span>
                )}
              </div>

              <div className="post-categories">
                {(categories?.edges?.length > 0 || loading) && (
                  <components.FolderIcon width={20} height={20} />
                )}

                {loading ? (
                  <ul className="list">
                    <components.SingleCategoryListItem>
                      <components.SkullWord color={skullColor} />
                    </components.SingleCategoryListItem>
                    <components.SingleCategoryListItem>
                      <components.SkullWord color={skullColor} />
                    </components.SingleCategoryListItem>
                  </ul>
                ) : (
                  categories?.edges?.length > 0 && (
                    <ul className="list">
                      {categories.edges.map((category) => (
                        <components.SingleCategoryListItem
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
              <components.SkullPage color={skullColor} />
            ) : (
              <components.PostContent>{content}</components.PostContent>
            )}
          </ExtraWrapper>
        </RenderWrapper>
      </article>
    </React.Fragment>
  );
};
