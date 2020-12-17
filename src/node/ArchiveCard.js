import React from "react";
import { Link } from "react-router-dom";

import { useComponents } from "../hooks";

export const ArchiveCard = (props) => {
  const { databaseId = 0, uri, title, date, excerpt, content, loading } =
    props || {};

  const { components } = useComponents();

  const body = excerpt || content;

  return (
    <article className={`rwg--node-card post-${databaseId}`}>
      <h2 className="rwg--node-card-heading">
        <Link to={uri || "/"} className="rwg--node-card-heading-link">
          {title ? title : <components.SkullLine />}
        </Link>
        {loading || date ? (
          <div className="rwg--node-card-date">
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
        <components.PostContent trim>{body}</components.PostContent>
      ) : (
        <components.SkullParagraph />
      )}

      <div className="rwg--node-card-btn-wrap">
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
