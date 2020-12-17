import React from "react";

export const SkullLine = ({
  className: classNameProp = "",
  color = "light-gray",
}) => {
  const className = `skull ${classNameProp}`;
  return (
    <div {...{ className }}>
      <div className="relative z-1" aria-hidden="true">
        <div
          className={`bg-${color} z-2 absolute top-0 left-0 w-100`}
          style={{ lineHeight: 1 }}
        >
          <span className="o-0">Loading</span>
        </div>
        <div className="o-0">Loading</div>
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
    <div className={`dib ${className}`}>
      <div className="dib relative z-1" aria-hidden="true">
        <div
          className={`bg-${color} z-2 absolute top-0 left-0 w-100`}
          style={{ lineHeight: 1 }}
        >
          <span className="o-0">Loading</span>
        </div>
        <div className="o-0">Loading</div>
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
      <div
        className={`pointer link br2 ph4 pv2 white bg-${color} bn dib`}
        aria-hidden="true"
      >
        Loading
      </div>
    </div>
  );
};

export const SkullParagraph = ({
  className: classNameProp = "mb2",
  color = "light-gray",
}) => {
  const className = `skull ${classNameProp}`;
  return (
    <div {...{ className }}>
      <SkullLine {...{ color }} />
      <SkullLine {...{ color }} />
      <SkullLine {...{ color }} />
      <SkullLine className="mw4" {...{ color }} />
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
      <div
        className={`bg-${color} aspect-ratio aspect-ratio--4x3`}
        aria-hidden="true"
      />
    </div>
  );
};

export const SkullPage = ({ className: classNameProp = "" }) => {
  const className = `skull ${classNameProp}`;
  return (
    <div {...{ className }}>
      <SkullParagraph />

      <div className="f2 mv3 mw6 w-100">
        <SkullLine />
      </div>

      <div className="flex-l flex-auto-l mv4">
        <div className="pr4-l w-100 nt4-l">
          <SkullParagraph />
          <SkullParagraph />
        </div>
        <SkullImage className="mw5 w-100" />
      </div>

      <SkullParagraph />

      <div className="f2 mv3 mw5 w-100">
        <SkullLine />
      </div>
      <SkullParagraph />
    </div>
  );
};
