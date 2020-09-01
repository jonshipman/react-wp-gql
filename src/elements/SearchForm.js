import React, { useRef } from "react";

import { FormGroup } from "./FormGroup";
import { PageWidth } from "./PageWidth";
import { ReactComponent as SearchIcon } from "../static/images/search.svg";
import { useComponents } from "../hooks/useComponents";

export const SearchForm = ({ filter = "", setFilter = () => {} }) => {
  let { components } = useComponents();
  components = Object.assign(
    {},
    { PageWidth, FormGroup, SearchIcon },
    components,
  );

  const inputRef = useRef();
  const { current } = inputRef;

  return (
    <components.PageWidth className="search flex-l items-center-l mv4">
      <components.FormGroup
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
