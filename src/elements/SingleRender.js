import React from "react";
import { Link } from "react-router-dom";

import { useComponents } from "../hooks/useComponents";

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

export const SingleRender = ({ node = {} }) => {
  const {
    seo = {},
    uri,
    databaseId,
    __typename,
    title,
    dateFormatted,
    categories = {},
    content,
  } = node;

  const { components } = useComponents();
  const loadPostMeta = __typename === "Post";

  return (
    <article className={`single post-${databaseId}`}>
      <components.Seo
        title={seo.title}
        description={seo.title}
        canonical={uri}
        breadcrumbs={seo.breadcrumbs}
      />
      <components.PageWidth className="mv4">
        {loadPostMeta && (
          <React.Fragment>
            <h1 className="f2 fw4 mb4">
              {title ? title : <components.SkullLine />}
            </h1>

            <div className="post-meta mv4">
              <div className="posted dib mr4">
                <components.ClockIcon
                  className="mr2 v-mid"
                  width={20}
                  height={20}
                />
                {dateFormatted ? (
                  <span>{dateFormatted}</span>
                ) : (
                  <components.SkullWord />
                )}
              </div>

              <div className="post-categories dib">
                <components.FolderIcon
                  className="mr2 v-mid"
                  width={20}
                  height={20}
                />
                <ul className="list pl0 dib">
                  {categories?.edges?.length > 0 ? (
                    categories.edges.map((category) => (
                      <components.SingleCategoryListItem
                        key={category.node.id}
                        {...category.node}
                      />
                    ))
                  ) : (
                    <React.Fragment>
                      <components.SingleCategoryListItem>
                        <components.SkullWord />
                      </components.SingleCategoryListItem>
                      <components.SingleCategoryListItem>
                        <components.SkullWord />
                      </components.SingleCategoryListItem>
                    </React.Fragment>
                  )}
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}

        {content ? (
          <components.PostContent>{content}</components.PostContent>
        ) : (
          <components.SkullPage />
        )}
      </components.PageWidth>
    </article>
  );
};
