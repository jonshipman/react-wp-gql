import React from "react";

import { useComponents } from "../hooks";

export const SearchForm = ({ filter = "", setFilter = () => {} }) => {
  const { components } = useComponents();

  return (
    <div className="rwg--sch-frm search">
      <div className="rwg--sch-ctrl rwg--ctrl">
        <input
          className="rwg--input"
          type="search"
          value={filter}
          placeholder="Search by name and content"
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilter(e.target.value);
            }
          }}
        />
      </div>
      <div className="rwg--sch-ico">
        <components.SearchIcon width={24} />
      </div>
    </div>
  );
};
