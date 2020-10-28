import { useContext, useEffect, useCallback, useMemo } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { NodeContext } from "../../Context";
import {
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
  } = useContext(NodeContext);

  useEffect(() => {
    if (isLoggedIn) {
      if (loginRedirect) {
        removeRedirect();
        history.push(loginRedirect);
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
    (data = {}) => {
      const { loginCookies = {} } = data;
      const { status } = loginCookies;

      if (status === "SUCCESS") {
        loggedIn();
      }
    },
    [loggedIn],
  );

  const [mutation, { error, loading }] = useMutation(mutations.MutationLogin, {
    onCompleted,
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
