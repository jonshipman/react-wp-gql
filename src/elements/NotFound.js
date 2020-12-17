import React from "react";

export const NotFound = () => {
  return (
    <div className="rwg--no-fnd post-not-found">
      <h1 className="title">
        <span className="title-inner">404: Page Not Found</span>
      </h1>

      <div className="body">
        <h2>Sorry, this page could not be found.</h2>
        <p>
          The page you are looking for doesn't exist, no longer exists or has
          been moved.
        </p>
      </div>

      <div
        className="dn"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: `<!-- status-code-404 -->` }}
      />
    </div>
  );
};
