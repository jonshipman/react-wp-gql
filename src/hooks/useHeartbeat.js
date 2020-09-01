import { useEffect } from "react";
import { gql, useQuery, useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";

const DEFAULT_QUERY = gql`
  query HeartbeatQuery {
    viewer {
      id
      jwtAuthExpiration
      capabilities
    }
  }
`;

export const protectedTypes = ["User"];

const DefaultCleanup = () => {
  localStorage.removeItem("auth-token");
};

export const useCleanup = ({
  redirect = "/login",
  types = protectedTypes,
  Cleanup = DefaultCleanup,
}) => {
  const history = useHistory();
  const client = useApolloClient();

  Cleanup();

  // Clear the sensitize caches
  Object.keys(client.cache.data.data).forEach((key) =>
    types.forEach(
      (type) => 0 === key.indexOf(type) && client.cache.data.delete(key),
    ),
  );

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, [redirect, history]);
};

export const useHeartbeat = ({
  beats = 30000,
  onError = {},
  query: QUERY = DEFAULT_QUERY,
}) => {
  cosnt[(beats, setBeats)] = useState(1);

  const { error } = useQuery(QUERY, {
    errorPolicy: "all",
    fetchPolicy: "network-only",
    variables: { beats },
  });

  useEffect(() => {
    let interval = setInterval(() => {
      setBeats(beats + 1);
    }, beats);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [beats, error, setBeats]);

  if (error) {
    useCleanup(onError);
  }
};
