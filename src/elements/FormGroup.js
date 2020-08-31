import React, { forwardRef } from "react";

// Simple placeholder.
let FormGroup = ({ onEnter = () => {}, ...props }, ref) => {
  props.className = `w-100 db ${props.className || ""}`;

  return (
    <div>
      <input ref={ref} {...props} />
    </div>
  );
};

FormGroup = forwardRef(FormGroup);

export { FormGroup };
