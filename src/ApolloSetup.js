import {
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
  cache: cacheProp,
  clientProps = {},
}) => {
  // Create the HttpLink for the ApolloClient
  const link = new HttpLink({
    uri: gqlUrl,
  });

  const cache = cacheProp ? cacheProp : new InMemoryCache();

  return new ApolloClient({
    link: from([authAfterware, ...links, link]),
    cache,
    ...clientProps,
  });
};
