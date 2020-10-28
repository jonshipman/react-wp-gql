import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

/**
 * After we get the response, log our errors.
 */
const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    // If we get an error, log the error.
    if (response?.errors?.length > 0) {
      console.error(response.errors);
    }

    return response;
  });
});

/**
 * Apollo GraphQL client.
 */
export const ApolloSetup = ({
  gqlUrl,
  links = [],
  cache = {},
  clientProps = {},
}) => {
  // Create the HttpLink for the ApolloClient
  const link = new HttpLink({
    uri: gqlUrl,
    credentials: "include",
  });

  return new ApolloClient({
    link: from([authAfterware, link, ...links]),
    cache: new InMemoryCache(cache).restore(window.__APOLLO_STATE__ || null),
    ...clientProps,
  });
};

export { ApolloProvider };
