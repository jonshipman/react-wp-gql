import React from "react";
import { Link } from "react-router-dom";

import { useComponents } from "../hooks/useComponents";

export const SingleRender = ({ node = {} }) => {
  const {
    seo = {},
    uri,
    databaseId,
    __typename,
    title,
    dateFormatted,
    categories = { edges: [] },
    content,
  } = node;

  const { components } = useComponents();

  return (
    <article className={`single post-${databaseId}`}>
      <components.Seo
        title={seo.title}
        description={seo.title}
        canonical={uri}
        breadcrumbs={seo.breadcrumbs}
      />
      <components.PageWidth className="mv4">
        {"Post" === __typename && (
          <React.Fragment>
            <h1 className="f2 fw4 mb4">{title}</h1>

            <div className="post-meta mv4">
              <div className="posted dib mr4">
                <components.ClockIcon
                  className="mr2 v-mid"
                  width={20}
                  height={20}
                />
                <span>{dateFormatted}</span>
              </div>

              {categories.edges.length > 0 && (
                <div className="post-categories dib">
                  <components.FolderIcon
                    className="mr2 v-mid"
                    width={20}
                    height={20}
                  />
                  <ul className="list pl0 dib">
                    {categories.edges.map((category) => (
                      <li
                        key={`cat-${category.node.databaseId}-post-cats`}
                        className="dib mr2 pr2 br b--near-white drop-last-br"
                      >
                        <Link
                          to={category.node.uri}
                          className="primary no-underline"
                        >
                          {category.node.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </React.Fragment>
        )}

        <components.PostContent>{content}</components.PostContent>
      </components.PageWidth>
    </article>
  );
};
