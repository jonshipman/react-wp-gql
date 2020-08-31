import React from "react";

// Simple placeholder.
export const FormGroup = ({ onEnter = () => {}, ...props }) => {
  return (
    <div>
      <input {...props} />
    </div>
  );
};
