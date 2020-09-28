import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from "@apollo/client";
import { getAuthToken, removeAuthToken, setAuthToken } from "./functions";

/**
 * Authentication Middleware.
 * If there is an auth_token localStorage, pass it as an auth bearer for jwt.
 */
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = getAuthToken();
  const authHeader = token ? `Bearer ${token}` : null;

  if (authHeader) {
    operation.setContext({
      headers: {
        Authorization: authHeader,
      },
    });
  }

  return forward(operation);
});

/**
 * After we get the response, handle jwt actions.
 */
const authAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    // If we get an error, log the error.
    if (response?.errors?.length > 0) {
      console.error(response.errors);

      response.errors.forEach((error) => {
        if ("Internal server error" === error.message && getAuthToken()) {
          if (
            window.confirm(
              "We have detected an invalid login session. You will be logged out",
            )
          ) {
            removeAuthToken();
            window.location.reload();
          }
        }
      });
    }

    // Get the refresh token and update the localStorage.
    if (headers) {
      const refreshToken = headers.get("x-jwt-refresh");
      if (refreshToken) {
        setAuthToken(refreshToken);
      }
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
    credentials: "same-origin",
  });

  return new ApolloClient({
    link: from([authMiddleware, authAfterware, link, ...links]),
    cache: new InMemoryCache(cache).restore(window.__APOLLO_STATE__ || null),
    ...clientProps,
  });
};

export { ApolloProvider };
