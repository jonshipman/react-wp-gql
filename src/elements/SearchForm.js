import React, { useRef } from "react";

import { useComponents } from "../hooks/useComponents";

export const SearchForm = () => {
  const { components } = useComponents();

  return (
    <components.PageWidth className="gray tc">
      <div className="f4 f3-l mv4">
        This is where the search results will be. Use the form above to search.
      </div>
    </components.PageWidth>
  );
};

const SearchForm = ({ filter = "", setFilter = () => {} }) => {
  const { components } = useComponents();
  const inputRef = useRef();
  const { current } = inputRef;

  return (
    <components.PageWidth className="search flex-l items-center-l mb4">
      <component.FormGroup
        ref={inputRef}
        type="search"
        value={filter}
        placeholder="Search by name and content"
        onChange={(v) => setFilter(v)}
        onEnter={(v) => setFilter(v)}
      />
      <components.SearchIcon
        width={24}
        className="ml3 mb2 db pointer"
        onClick={() => {
          setFilter(current.value);
        }}
      />
    </components.PageWidth>
  );
};
