import React from "react";
import { Link } from "react-router-dom";

import { useComponents } from "../hooks";

export const ArchiveCard = (props) => {
  const { databaseId = 0, uri, title, date, excerpt, content, loading } =
    props || {};

  const { components } = useComponents();

  const body = excerpt || content;

  return (
    <article
      className={`content blog-entry b--near-white bb pb4 mv4 post-${databaseId}`}
    >
      <h2 className="mt0">
        <Link to={uri || "/"} className="primary no-underline">
          {title ? title : <components.SkullLine className="mw6 w-100" />}
        </Link>
        {loading || date ? (
          <div className="posted fr-ns mt2 mt0-ns f6">
            <components.ClockIcon
              className="v-mid mr2"
              width={12}
              height={12}
            />
            <span>{date ? date : <components.SkullWord />}</span>
          </div>
        ) : null}
      </h2>

      {body ? (
        <components.PostContent className="mv4" trim>
          {body}
        </components.PostContent>
      ) : (
        <components.SkullParagraph />
      )}

      <div className="tr">
        {uri ? (
          <components.Button to={uri} type={3}>
            Read more
          </components.Button>
        ) : (
          <components.SkullButton />
        )}
      </div>
    </article>
  );
};
