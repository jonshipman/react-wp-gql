import React, { useContext } from "react";

import { NodeContext } from "../Context";
import {
  useArchive,
  useArchiveCardRenderer,
  useArchiveRenderer,
} from "./useArchive";
import { useComponents } from "../hooks";

const Entries = ({ children }) => {
  return <div className="entries">{children}</div>;
};

const EntriesColumns = ({ children }) => {
  return (
    <div className="entries flex-ns items-center-ns flex-wrap-ns nl2 nr2 nt2 nb2">
      {children}
    </div>
  );
};

const TwoColumn = ({ children }) => {
  return <div className="w-100 pa2 w-50-ns">{children}</div>;
};

const ThreeColumn = ({ children }) => {
  return <div className="w-100 pa2 w-50-m w-third-l">{children}</div>;
};

const FourColumn = ({ children }) => {
  return <div className="w-100 pa2 w-50-m w-25-l">{children}</div>;
};

const FiveColumn = ({ children }) => {
  return <div className="w-100 pa2 w-50-m w-20-l">{children}</div>;
};

const CardRender = (props) => {
  const __typename = props?.__typename;

  const Render = useArchiveCardRenderer(__typename);
  return <Render {...props} />;
};

const ArchiveRender = ({
  card: cardProp,
  entriesComponent,
  columns = 1,
  loading,
  edges,
}) => {
  const EntriesWrap = entriesComponent
    ? entriesComponent
    : columns > 1
    ? EntriesColumns
    : Entries;

  let CardWrap = "div";

  switch (columns) {
    case 2:
      CardWrap = TwoColumn;
      break;
    case 3:
      CardWrap = ThreeColumn;
      break;
    case 4:
      CardWrap = FourColumn;
      break;
    case 5:
      CardWrap = FiveColumn;
    default:
      break;
  }

  const rows = columns * 5;

  const Card = cardProp ? cardProp : CardRender;

  return (
    <EntriesWrap>
      {loading ? (
        <React.Fragment>
          {Array.from(new Array(rows)).map((_, i) => (
            <CardWrap key={`card-loading-${i}`}>
              <Card />
            </CardWrap>
          ))}
        </React.Fragment>
      ) : (
        edges.map(({ node }) => (
          <CardWrap key={node.id}>
            <Card {...node} />
          </CardWrap>
        ))
      )}
    </EntriesWrap>
  );
};

export const Archive = ({
  uri = "/blog",
  title = "Blog",
  wrap: WrapProp,
  card,
  entries: entriesComponent,
  columns,
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
    title: titleData,
    seo: seoData,
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

  let seo = {};
  if (seoData) {
    seo = seoData;
  } else if (seoProp) {
    seo = seoProp;
  } else {
    seo.title = siteName ? `${title} - ${siteName}` : title;
    seo.canonical = uri;
  }

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

      <components.Title>{titleData || title}</components.Title>

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
            <ArchiveRender
              {...{ card, columns, entriesComponent, loading, edges }}
            />
            <components.Pagination {...PaginationProps} />
          </React.Fragment>
        )}
      </Wrapper>
    </React.Fragment>
  );
};
