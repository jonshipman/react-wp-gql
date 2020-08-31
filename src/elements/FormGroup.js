import React, { forwardRef } from "react";

// Simple placeholder.
let FormGroup = ({ onEnter = () => {}, ...props }, ref) => {
  return (
    <div>
      <input ref={ref} {...props} />
    </div>
  );
};

FormGroup = forwardRef(FormGroup);

export { FormGroup };
