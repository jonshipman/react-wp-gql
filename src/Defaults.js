import { ReactComponent as ClockIcon } from "./static/images/clock.svg";
import { ReactComponent as FolderIcon } from "./static/images/folder.svg";
import { ReactComponent as SearchIcon } from "./static/images/search.svg";
import * as DefaultFragments from "./gql/fragments";
import * as DefaultMutations from "./gql/mutations";
import * as DefaultQueries from "./gql/queries";
import * as Login from "./Login";
import * as Elements from "./elements";
import * as Nodes from "./node";
import { FormGroup, Button, FormError } from "./form";

export const DefaultComponents = {
  ...Nodes,
  ...Elements,
  ...Login,
  FormGroup,
  Button,
  FormError,
  ClockIcon,
  FolderIcon,
  SearchIcon,
};

export const Populate = ({ components, fragments, queries, mutations }) => {
  const ret = {};
  ret.components = PopulateComponents(components);
  ret.fragments = PopulateFragments(fragments);
  ret.queries = PopulateQueries(queries);
  ret.mutations = PopulateMutations(mutations);

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

  fragments.LiteralNode = `${fragments.LiteralContentNode} ${fragments.LiteralNode}`;

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

export const PopulateMutations = (passed = {}) => {
  let mutations = { ...passed };
  if (!mutations) mutations = {};

  Object.keys(DefaultMutations).forEach((key) => {
    if (!mutations[key]) {
      mutations[key] = DefaultMutations[key];
    }
  });

  return mutations;
};
