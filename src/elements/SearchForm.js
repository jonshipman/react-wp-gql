import React from "react";

import { useComponents } from "../hooks/useComponents";

export const SearchForm = ({ filter = "", setFilter = () => {} }) => {
  const { components } = useComponents();

  return (
    <components.PageWidth className="search flex-l items-center-l mv4">
      <components.FormGroup
        className="flex-auto-l mb0-l"
        type="search"
        value={filter}
        placeholder="Search by name and content"
        onChange={(v) => setFilter(v)}
        onEnter={(v) => setFilter(v)}
      />
      <components.SearchIcon width={24} className="ml3 mb2 db pointer" />
    </components.PageWidth>
  );
};
