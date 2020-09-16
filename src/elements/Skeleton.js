import React from "react";

export const SkullLine = ({ className = "", color = "light-gray" }) => {
  return (
    <div className={`bg-${color} ${className}`}>
      <div className="o-0 lh-solid" aria-hidden="true">
        Loading
      </div>
    </div>
  );
};

export const SkullWord = ({ className = "", color = "light-gray" }) => {
  return (
    <div className={`bg-${color} dib ${className}`}>
      <div className="o-0 lh-solid dib" aria-hidden="true">
        Loading
      </div>
    </div>
  );
};

export const SkullButton = ({ className, color = "light-gray" }) => {
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

export const SkullParagraph = () => {
  return (
    <div className="mv4">
      <SkullLine className="mv2" />
      <SkullLine className="mv2" />
      <SkullLine className="mv2" />
      <SkullLine className="mv2 mw4" />
    </div>
  );
};

export const SkullImage = ({ className, color = "light-gray" }) => {
  return (
    <div {...{ className }}>
      <div
        className={`bg-${color} aspect-ratio aspect-ratio--4x3`}
        aria-hidden="true"
      />
    </div>
  );
};

export const SkullPage = ({ className }) => {
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
