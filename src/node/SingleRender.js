import React from "react";
import { Link } from "react-router-dom";
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

export const SingleCategoryListItem = ({ uri, name, children }) => {
  const Wrap = uri ? Link : "span";
  return (
    <li className="dib mr2 pr2 br b--near-white drop-last-br">
      <Wrap to={uri} className="primary no-underline">
        {name || children}
      </Wrap>
    </li>
  );
};

export const SinglePostRender = ({
  node = {},
  loading,
  className = "mv4",
  wrap,
  skullColor,
  ...props
}) => {
  const { databaseId, title, date, categories = {}, content } = node;

  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;
  const pageTitle =
    categories?.edges?.length > 0 ? categories.edges[0].node.name : "Blog";

  return (
    <React.Fragment>
      <components.Title wrap="div">{pageTitle}</components.Title>
      <article className={`single post-${databaseId}`}>
        <RenderWrapper {...{ className }} {...props}>
          <h1 className="f2 fw4 mb4">
            {loading ? <components.SkullLine color={skullColor} /> : title}
          </h1>

          <div className="post-meta mv4">
            <div className="posted dib mr4">
              <components.ClockIcon
                className="mr2 v-mid"
                width={20}
                height={20}
              />
              {loading ? (
                <components.SkullWord color={skullColor} />
              ) : (
                <span>{date}</span>
              )}
            </div>

            <div className="post-categories dib">
              {(categories?.edges?.length > 0 || loading) && (
                <components.FolderIcon
                  className="mr2 v-mid"
                  width={20}
                  height={20}
                />
              )}

              {loading ? (
                <ul className="list pl0 dib">
                  <components.SingleCategoryListItem>
                    <components.SkullWord color={skullColor} />
                  </components.SingleCategoryListItem>
                  <components.SingleCategoryListItem>
                    <components.SkullWord color={skullColor} />
                  </components.SingleCategoryListItem>
                </ul>
              ) : (
                categories?.edges?.length > 0 && (
                  <ul className="list pl0 dib">
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
        </RenderWrapper>
      </article>
    </React.Fragment>
  );
};
