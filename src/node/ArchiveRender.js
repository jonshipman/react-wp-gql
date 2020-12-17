import React from "react";
import { useCardRenderer } from "./useNode";

const Entries = ({ children }) => {
  return <div className="entries">{children}</div>;
};

const EntriesColumns = ({ children }) => {
  return <div className="rwg--node-ent-col">{children}</div>;
};

const TwoColumn = ({ children }) => {
  return <div className="rwg--node-2-col">{children}</div>;
};

const ThreeColumn = ({ children }) => {
  return <div className="rwg--node-3-col">{children}</div>;
};

const FourColumn = ({ children }) => {
  return <div className="rwg--node-4-col">{children}</div>;
};

const FiveColumn = ({ children }) => {
  return <div className="rwg--node-5-col">{children}</div>;
};

const CardRender = (props) => {
  const __typename = props?.__typename;

  const Render = useCardRenderer(__typename);
  return <Render {...props} />;
};

export const ArchiveRender = ({
  card,
  entries,
  columns = 1,
  loading,
  edges,
}) => {
  const EntriesWrap = entries
    ? entries
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

  const Card = card ? card : CardRender;

  return (
    <EntriesWrap>
      {loading ? (
        <React.Fragment>
          {Array.from(new Array(rows)).map((_, i) => (
            <CardWrap key={`card-loading-${i}`}>
              <Card {...{ loading }} />
            </CardWrap>
          ))}
        </React.Fragment>
      ) : !!edges ? (
        edges.map(({ node }) => (
          <CardWrap key={node.id}>
            <Card {...{ loading }} {...node} />
          </CardWrap>
        ))
      ) : null}
    </EntriesWrap>
  );
};
