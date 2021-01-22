import React from "react";
import { Link } from "react-router-dom";
import { useNodeContext } from "../Context";
import {
  Button,
  PostContent,
  SkullButton,
  SkullLine,
  SkullParagraph,
  SkullWord,
} from "../elements";
import { ClockIcon } from "../static/images";

export const ArchiveCard = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.ArchiveCard) return <Components.ArchiveCard {...props} />;

  const { databaseId = 0, uri, title, date, excerpt, content, loading } =
    props || {};

  const body = excerpt || content;

  return (
    <article className={`rwg--node-card post-${databaseId}`}>
      <h2 className="rwg--node-card-heading">
        <Link to={uri || "/"} className="rwg--node-card-heading-link">
          {title ? title : <SkullLine />}
        </Link>
        {loading || date ? (
          <div className="rwg--node-card-date">
            <ClockIcon className="v-mid mr2" width={12} height={12} />
            <span>{date ? date : <SkullWord />}</span>
          </div>
        ) : null}
      </h2>

      {body ? <PostContent trim>{body}</PostContent> : <SkullParagraph />}

      <div className="rwg--node-card-btn-wrap">
        {uri ? (
          <Button to={uri} type={3}>
            Read more
          </Button>
        ) : (
          <SkullButton />
        )}
      </div>
    </article>
  );
};
