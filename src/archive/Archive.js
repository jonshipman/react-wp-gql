import React, { useContext, useMemo } from "react";

import { NodeContext } from "../Context";
import {
  useArchive,
  useArchiveCardRenderer,
  useArchiveRenderer,
} from "./useArchive";
import { useComponents } from "../hooks";

const CardRender = (props) => {
  const __typename = props?.__typename;

  const Render = useArchiveCardRenderer(__typename);
  return <Render {...props} />;
};

const ArchiveRender = ({ loading, edges }) => {
  return (
    <div className="entries">
      {loading ? (
        <React.Fragment>
          <CardRender />
          <CardRender />
          <CardRender />
          <CardRender />
        </React.Fragment>
      ) : (
        edges.map(({ node }) => <CardRender key={node.id} {...node} />)
      )}
    </div>
  );
};

export const Archive = ({
  uri = "/blog",
  title = "Blog",
  wrap: WrapProp,
  query,
  variables,
  skip,
  ssr,
  perPage,
  seo: seoProp,
  ...props
}) => {
  const { components } = useComponents();
  const { siteName = "" } = useContext(NodeContext);

  const {
    __typename,
    edges,
    loading,
    error,
    hasPreviousPage,
    hasNextPage,
    next,
    prev,
  } = useArchive({ query, variables, skip, ssr, perPage });

  const DefaultWrapper = useArchiveRenderer(__typename);
  const Wrapper = WrapProp || DefaultWrapper;

  let seoTitle = title;
  if (siteName) {
    seoTitle = `${title} - ${siteName}`;
  }

  const seo = useMemo(() => {
    let _s = {};

    if (seoProp) {
      _s = seoProp;
    } else {
      _s.title = title;
      if (siteName) {
        _s.title = `${title} - ${siteName}`;
      }
      _s.canonical = uri;
    }

    return _s;
  }, [siteName, title, uri, seoProp]);

  const PaginationProps = {
    hasPreviousPage,
    hasNextPage,
    next,
    prev,
  };

  return (
    <React.Fragment>
      <components.Seo {...seo}>
        <meta name="robots" content="noindex" />
      </components.Seo>

      <components.Title>{title}</components.Title>

      <Wrapper
        className="mv4 archive"
        {...{ edges, loading, error, __typename }}
        {...props}
      >
        {error ? (
          <components.ErrorRouting {...{ loading, error, wrap: "div" }} />
        ) : edges.length === 0 && !loading ? (
          <div className="archive-nothing-found">
            <div>Nothing found.</div>
            <div
              className="dn"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: `<!-- status-code-404 -->` }}
            />
          </div>
        ) : (
          <React.Fragment>
            <ArchiveRender {...{ loading, edges }} />
            <components.Pagination {...PaginationProps} />
          </React.Fragment>
        )}
      </Wrapper>
    </React.Fragment>
  );
};
