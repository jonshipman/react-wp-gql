import React from "react";

import { useComponents } from "../hooks";

export const SearchForm = ({ filter = "", setFilter = () => {} }) => {
  const { components } = useComponents();

  return (
    <div className="search flex mv4">
      <components.FormGroup
        className="flex-auto"
        type="search"
        value={filter}
        placeholder="Search by name and content"
        onChange={(v) => setFilter(v)}
        onEnter={(v) => setFilter(v)}
      />
      <div className="ml3">
        <components.SearchIcon width={24} className="db pointer" />
      </div>
    </div>
  );
};
