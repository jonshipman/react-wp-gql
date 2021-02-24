import React from "react";
import { useLocation } from "react-router-dom";
import { useNodeContext } from "../Context";
import { ErrorRouting, Pagination, Seo, Title } from "../elements";
import { useNode, useNodeRenderer } from "./useNode";

export const Node = ({
  databaseId,
  isArchive: isArchiveProp,
  perPage,
  nodeTitle: titleProp,
  columns: columnsProp,
  title: TitleComponent = Title,
  wrap,
  card,
  entries,
  query,
  variables,
  skip,
  ssr,
  fetchPolicy,
  ...props
}) => {
  const { pathname } = useLocation();
  const { siteName, archiveColumns } = useNodeContext();

  const columns = columnsProp ? columnsProp : archiveColumns?.current || 1;

  const nodeUsed = useNode({
    query,
    variables,
    skip,
    ssr,
    fetchPolicy,
    perPage,
    databaseId,
  });

  const {
    __typename,
    data,
    edges,
    error,
    hasNextPage,
    hasPreviousPage,
    isArchive: isArchiveNode,
    loading,
    next,
    node,
    prev,
  } = nodeUsed;

  const isArchive = isArchiveProp ? isArchiveProp : isArchiveNode;

  const RenderComponent = useNodeRenderer({ __typename, isArchive, data });

  const title = !!titleProp ? titleProp : node.title || node.name;

  const seo = node.seo || {};

  if (title && !node.seo) {
    seo.title = title;
  }

  if (siteName && !node.seo) {
    seo.title = `${seo.title} - ${siteName}`;
  }

  if (!titleProp && loading && !node.seo) {
    seo.title = siteName ? `... - ${siteName}` : "...";
  }

  const uri = node.uri || pathname;

  if (isArchive) {
    const Wrapper = wrap ? wrap : "div";

    const PaginationProps = {
      hasPreviousPage,
      hasNextPage,
      next,
      prev,
    };

    return (
      <React.Fragment>
        <Seo {...{ uri }} {...seo}>
          <meta name="robots" content="noindex" />
        </Seo>

        {loading || title ? (
          <TitleComponent {...{ wrap }}>{title}</TitleComponent>
        ) : null}

        <Wrapper className="rwg--node-archive">
          {error ? (
            <ErrorRouting {...{ loading, error, wrap: "div" }} />
          ) : edges?.length === 0 && !loading ? (
            <div className="rwg--archive-nothing-found">
              <div>Nothing found.</div>
              <div
                className="rwg--node-no-show"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: `<!-- status-code-404 -->` }}
              />
            </div>
          ) : (
            <React.Fragment>
              <RenderComponent
                {...{
                  card,
                  entries,
                  columns,
                  loading,
                  edges,
                  node,
                  data,
                }}
              />
              <Pagination {...PaginationProps} />
            </React.Fragment>
          )}
        </Wrapper>
      </React.Fragment>
    );
  } else {
    if (!skip && (error || (!loading && !node?.id))) {
      return <ErrorRouting {...{ error, loading }} />;
    }

    return (
      <article
        className={`single ${__typename?.toLowerCase()}-${
          node?.databaseId || "0"
        }`}
      >
        <Seo {...{ uri }} {...seo} />

        <RenderComponent
          title={TitleComponent}
          {...{ wrap, node, data, loading, error }}
          {...props}
        />
      </article>
    );
  }
};
