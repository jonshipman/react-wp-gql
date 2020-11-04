import React from "react";
import { Link } from "react-router-dom";

import { useComponents } from "../hooks/useComponents";

const SinglePostMeta = ({ node, skullColor, loading }) => {
  const { title, dateFormatted, categories = {} } = node;
  const { components } = useComponents();

  return (
    <React.Fragment>
      <h1 className="f2 fw4 mb4">
        {loading ? <components.SkullLine color={skullColor} /> : title}
      </h1>

      <div className="post-meta mv4">
        <div className="posted dib mr4">
          <components.ClockIcon className="mr2 v-mid" width={20} height={20} />
          {loading ? (
            <components.SkullWord color={skullColor} />
          ) : (
            <span>{dateFormatted}</span>
          )}
        </div>

        <div className="post-categories dib">
          {categories?.edges?.length > 0 && (
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
    </React.Fragment>
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

export const SinglePageRender = ({ node, className = "mv4", wrap }) => {
  const { content, title } = node;
  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;

  return (
    <div>
      <components.Title>{title}</components.Title>

      <RenderWrapper {...{ className }}>
        <components.PostContent>{content}</components.PostContent>
      </RenderWrapper>
    </div>
  );
};

export const SinglePostRender = ({ node, className = "mv4", wrap }) => {
  const { content, categories } = node;

  const { components } = useComponents();
  const RenderWrapper = wrap ? wrap : components.PageWidth;

  const CategoryName =
    categories && categories.edges ? categories.edges[0]?.node?.name : "Blog";

  return (
    <div>
      <components.Title heading="div">{CategoryName}</components.Title>

      <RenderWrapper {...{ className }}>
        <SinglePostMeta {...{ node }} />

        <components.PostContent>{content}</components.PostContent>
      </RenderWrapper>
    </div>
  );
};
