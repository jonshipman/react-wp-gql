import { ArchiveCard } from "./elements/ArchiveCard";
import { ArchiveRender } from "./elements/ArchiveRender";
import { Button } from "./elements/Button";
import { ErrorRouting } from "./elements/ErrorRouting";
import { FormGroup } from "./elements/FormGroup";
import { Loading } from "./elements/Loading";
import { LoadingError } from "./elements/LoadingError";
import { NoSearchResults } from "./elements/NoSearchResults";
import { NotFound } from "./elements/NotFound";
import { PageWidth } from "./elements/PageWidth";
import { Pagination } from "./elements/Pagination";
import { Permissions } from "./elements/Permissions";
import { PostContent } from "./elements/PostContent";
import { ReactComponent as ClockIcon } from "./static/images/clock.svg";
import { ReactComponent as FolderIcon } from "./static/images/folder.svg";
import { ReactComponent as SearchIcon } from "./static/images/search.svg";
import { SearchForm } from "./elements/SearchForm";
import { Seo } from "./elements/Seo";
import { SingleRender } from "./elements/SingleRender";
import { SingleTitle } from "./elements/SingleTitle";
import { Title } from "./elements/Title";
import * as DefaultFragments from "./gql/fragments";
import * as DefaultQueries from "./gql/queries";
import * as Menu from "./elements/Menu";

export const DefaultComponents = {
  ...Menu,
  ArchiveCard,
  ArchiveRender,
  Button,
  ClockIcon,
  ErrorRouting,
  FolderIcon,
  FormGroup,
  Loading,
  LoadingError,
  NoSearchResults,
  NotFound,
  PageWidth,
  Pagination,
  Permissions,
  PostContent,
  SearchForm,
  SearchIcon,
  Seo,
  SingleRender,
  SingleTitle,
  Title,
};

export const Populate = ({ components, fragments, queries }) => {
  const ret = {};
  ret.components = PopulateComponents(components);
  ret.fragments = PopulateFragments(fragments);
  ret.queries = PopulateQueries(queries);

  return ret;
};

export const PopulateComponents = (passed = {}) => {
  let components = { ...passed };
  if (!components) components = {};

  Object.keys(DefaultComponents).forEach((key) => {
    if (!components[key]) {
      components[key] = DefaultComponents[key];
    }
  });

  return components;
};

export const PopulateFragments = (passed = {}) => {
  let fragments = { ...passed };
  if (!fragments) fragments = {};

  Object.keys(DefaultFragments).forEach((key) => {
    if (!fragments[key]) {
      fragments[key] = DefaultFragments[key];
    }
  });

  return fragments;
};

export const PopulateQueries = (passed = {}) => {
  let queries = { ...passed };
  if (!queries) queries = {};

  Object.keys(DefaultQueries).forEach((key) => {
    if (!queries[key]) {
      queries[key] = DefaultQueries[key];
    }
  });

  return queries;
};
