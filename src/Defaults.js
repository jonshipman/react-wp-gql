import * as DefaultFragments from "./gql/fragments";
import * as DefaultMutations from "./gql/mutations";
import * as DefaultQueries from "./gql/queries";

export const Populate = ({ fragments, queries, mutations }) => {
  const ret = {};
  ret.fragments = PopulateFragments(fragments);
  ret.queries = PopulateQueries(queries);
  ret.mutations = PopulateMutations(mutations);

  return ret;
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
