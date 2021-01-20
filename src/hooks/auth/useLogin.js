import { useEffect, useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useNodeContext } from "../../Context";
import {
  setRedirect,
  getRedirect,
  removeRedirect as DefaultRemoveRedirect,
} from "../../functions";
import { useQueries } from "../useQueries";
import { useIsLoggedIn } from "./useIsLoggedIn";

export const useLogin = ({ setMessage = () => {} }) => {
  const { isLoggedIn, loggedIn, loading: isLoggedInLoading } = useIsLoggedIn();
  const { mutations } = useQueries();
  const history = useHistory();
  const {
    loginRedirect = getRedirect(),
    removeRedirect = DefaultRemoveRedirect,
    onLoggedIn = () => {},
    permissions,
  } = useNodeContext();

  useEffect(() => {
    if (isLoggedIn) {
      if (loginRedirect) {
        removeRedirect();

        if (
          loginRedirect.includes("/wp-admin") ||
          loginRedirect.indexOf("/") !== 0
        ) {
          window.location.href = loginRedirect;
        } else {
          history.push(loginRedirect);
        }
      } else {
        history.push("/");
      }
    }
  }, [history, loginRedirect, removeRedirect, isLoggedIn]);

  useEffect(() => {
    if (error && error.message !== "Internal server error") {
      setMessage(error);
    }
  }, [error, setMessage]);

  const onCompleted = useCallback(
    (data) => {
      const status = data ? data.login?.status || false : false;
      const capabilities = data ? data.login?.viewer?.capabilities || [] : [];

      if (capabilities.includes("manage_options")) {
        setRedirect("/wp-admin/index.php");
      }

      if (status === "SUCCESS") {
        loggedIn();
      } else {
        setMessage(status || "Incorrect password");
      }

      // Run a refetch for all the permissions.
      permissions.current.refetch.forEach((s) => {
        if (typeof s === "function") {
          s();
        }
      });
    },
    [loggedIn, permissions],
  );

  const [mutation, { error, loading }] = useMutation(mutations.MutationLogin, {
    onCompleted: (...args) => {
      onLoggedIn(...args);
      onCompleted(...args);
    },
    errorPolicy: "all",
  });

  const clientMutationId = useMemo(() => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }, []);

  const login = (username, password) => {
    mutation({ variables: { username, password, clientMutationId } });
  };

  return {
    login,
    loading,
    isLoggedIn,
    isLoggedInLoading,
  };
};
