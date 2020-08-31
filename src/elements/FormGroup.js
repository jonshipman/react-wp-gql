import React, { forwardRef } from "react";

// Simple placeholder.
let FormGroup = (
  { onEnter = () => {}, onChange = () => {}, ...props },
  ref,
) => {
  props.className = `w-100 db ${props.className || ""}`;

  return (
    <div>
      <input
        onChange={(e) => onChange(e.currentTarget.value)}
        ref={ref}
        {...props}
      />
    </div>
  );
};

FormGroup = forwardRef(FormGroup);

export { FormGroup };
