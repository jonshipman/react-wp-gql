import React, { useCallback } from "react";
import { useNodeContext } from "../Context";
import { SearchIcon } from "../static/images";

export const SearchForm = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.SearchForm) return <Components.SearchForm {...props} />;

  const { filter = "", setFilter = () => {} } = props;

  const updateSearch = useCallback(
    (value) => {
      setFilter(value);
    },
    [setFilter],
  );

  return (
    <div className="rwg--sch-frm search">
      <div className="rwg--sch-ctrl rwg--ctrl">
        <input
          className="rwg--input"
          type="search"
          value={filter}
          placeholder="Search by name and content"
          onChange={(e) => updateSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateSearch(e.target.value);
            }
          }}
        />
      </div>
      <div className="rwg--sch-ico">
        <SearchIcon width={24} />
      </div>
    </div>
  );
};
