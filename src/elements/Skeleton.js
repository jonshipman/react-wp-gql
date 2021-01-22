import React from "react";

export const SkullLine = ({
  className: classNameProp = "",
  color = "light-gray",
}) => {
  const className = `skull ${classNameProp}`;
  return (
    <div {...{ className }}>
      <div className="rwg--skull-line" aria-hidden="true">
        <div
          className={`bg-${color} rwg--skull-line-background`}
          style={{ lineHeight: 1 }}
        >
          <span className="rwg--skull-hidden">Loading</span>
        </div>
        <div className="rwg--skull-hidden">Loading</div>
      </div>
    </div>
  );
};

export const SkullWord = ({
  className: classNameProp = "",
  color = "light-gray",
}) => {
  const className = `skull ${classNameProp}`;
  return (
    <div className={`rwg--skull-word ${className}`}>
      <div className="rwg--skull-word-inner" aria-hidden="true">
        <div
          className={`bg-${color} rwg--skull-word-background`}
          style={{ lineHeight: 1 }}
        >
          <span className="rwg--skull-hidden">Loading</span>
        </div>
        <div className="rwg--skull-hidden">Loading</div>
      </div>
    </div>
  );
};

export const SkullButton = ({
  className: classNameProp = "",
  color = "light-gray",
}) => {
  const className = `skull ${classNameProp}`;
  return (
    <div {...{ className }}>
      <div className={`bg-${color} rwg--skull-button`} aria-hidden="true">
        Loading
      </div>
    </div>
  );
};

export const SkullParagraph = ({
  className: classNameProp = "mb2",
  color = "light-gray",
}) => {
  const className = `skull rwg--skull-p ${classNameProp}`;
  return (
    <div {...{ className }}>
      <SkullLine {...{ color }} />
      <SkullLine {...{ color }} />
      <SkullLine {...{ color }} />
      <SkullLine {...{ color }} />
    </div>
  );
};

export const SkullImage = ({
  className: classNameProp = "",
  color = "light-gray",
}) => {
  const className = `skull ${classNameProp}`;
  return (
    <div {...{ className }}>
      <div className={`bg-${color} rwg--skull-image`} aria-hidden="true" />
    </div>
  );
};

export const SkullPage = ({ className: classNameProp = "" }) => {
  const className = `skull rwg--skull-page ${classNameProp}`;
  return (
    <div {...{ className }}>
      <SkullParagraph className="paragraph-1" />

      <div className="heading-2">
        <SkullLine />
      </div>

      <div className="paragraph-2">
        <div>
          <SkullParagraph />
          <SkullParagraph />
        </div>
        <SkullImage />
      </div>

      <SkullParagraph />

      <div className="heading-3">
        <SkullLine />
      </div>
      <SkullParagraph />
    </div>
  );
};
