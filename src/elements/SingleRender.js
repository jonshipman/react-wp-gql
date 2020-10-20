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

export const SingleRender = ({ node = {}, loading }) => {
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
              {loading ? <components.SkullLine /> : title}
            </h1>

            <div className="post-meta mv4">
              <div className="posted dib mr4">
                <components.ClockIcon
                  className="mr2 v-mid"
                  width={20}
                  height={20}
                />
                {loading ? (
                  <components.SkullWord />
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
                      <components.SkullWord />
                    </components.SingleCategoryListItem>
                    <components.SingleCategoryListItem>
                      <components.SkullWord />
                    </components.SingleCategoryListItem>
                  </ul>
                ) : (
                  categories?.edges?.length > 0 &&
                  categories.edges.map((category) => (
                    <ul className="list pl0 dib">
                      <components.SingleCategoryListItem
                        key={category.node.id}
                        {...category.node}
                      />
                    </ul>
                  ))
                )}
              </div>
            </div>
          </React.Fragment>
        )}

        {loading ? (
          <components.SkullPage />
        ) : (
          <components.PostContent>{content}</components.PostContent>
        )}
      </components.PageWidth>
    </article>
  );
};
