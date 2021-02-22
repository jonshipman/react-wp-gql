import React, {
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { useNodeContext } from "./Context";
import { NoSearchResults, PageWidth, SearchForm } from "./elements";
import { useQueries } from "./hooks";
import { Node } from "./node/Node";

const SearchContext = createContext({});

const SearchRender = (props) => {
  const { components: Components } = useNodeContext();
  if (Components?.SearchRender) return <Components.SearchRender {...props} />;

  const { wrap: Wrap = PageWidth } = useContext(SearchContext);

  const {
    className,
    children,
    edges: edgesProp,
    loading,
    filter,
    setFilter,
  } = props;

  const edges = edgesProp ? edgesProp || [] : [];

  return (
    <Wrap {...{ className }}>
      <SearchForm {...{ filter, setFilter }} />
      {!loading && edges.length === 0 && (filter || "").length < 3 ? (
        <NoSearchResults />
      ) : (
        children
      )}
    </Wrap>
  );
};

export const Search = ({ nodeTitle = "Search", title, wrap }) => {
  const [filter, setFilter] = useState();
  const { queries } = useQueries();
  const { search } = useNodeContext();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => (isMounted.current = false);
  }, []);

  if (!!search?.current) {
    search.current.updateSearch = (value) => {
      if (isMounted.current) {
        setFilter(value);
      }
    };
  }

  const props = {
    isArchive: true,
    title,
    nodeTitle,
    query: queries.QuerySearch,
    variables: { filter: filter || "" },
    skip: (filter || "").length < 3,
    filter,
    setFilter,
  };

  return (
    <SearchContext.Provider value={{ wrap }}>
      <Node wrap={SearchRender} {...props} />
    </SearchContext.Provider>
  );
};
