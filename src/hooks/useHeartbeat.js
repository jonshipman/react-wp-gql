import { useEffect, useState } from "react";
import { useQuery, useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useQueries } from "./useQueries";

export const protectedTypes = ["User"];

const DefaultCleanup = () => {
  window.localStorage.removeItem("auth-token");
};

export const useCleanup = (props) => {
  const {
    redirect = "/login",
    types = protectedTypes,
    Cleanup = DefaultCleanup,
  } = props || {};

  const history = useHistory();
  const client = useApolloClient();
  const [skip, setSkip] = useState(true);

  useEffect(() => {
    if (props === null) {
      setSkip(true);
    } else {
      setSkip(false);
    }
  }, [props]);

  useEffect(() => {
    if (!skip) {
      Cleanup();
    }
  }, [skip, Cleanup]);

  useEffect(() => {
    if (!skip) {
      // Clear the sensitize caches
      Object.keys(client.cache.data.data).forEach((key) =>
        types.forEach(
          (type) => key.indexOf(type) === 0 && client.cache.data.delete(key),
        ),
      );
    }
  }, [client, skip, types]);

  useEffect(() => {
    if (!skip && redirect) {
      history.push(redirect);
    }
  }, [redirect, history, skip]);
};

export const useHeartbeat = ({ ibi = 30000, onError = {}, query }) => {
  const [beats, setBeats] = useState(1);
  const { queries } = useQueries();

  const { error } = useQuery(query || queries.QueryHeartbeat, {
    errorPolicy: "all",
    fetchPolicy: "network-only",
    variables: { beats },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setBeats(beats + 1);
    }, ibi);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [beats, error, setBeats, ibi]);

  const CleanupProps = error ? onError : null;
  useCleanup(CleanupProps);
};
