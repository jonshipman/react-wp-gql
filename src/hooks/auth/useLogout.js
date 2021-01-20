import { useMutation } from "@apollo/client";
import { useNodeContext } from "../../Context";
import { useQueries } from "../useQueries";
import { useIsLoggedIn } from "./useIsLoggedIn";

export const useLogout = (props = {}) => {
  const { onCompleted: onCompletedProp = () => {} } = props;
  const { mutations } = useQueries();
  const { loggedOut } = useIsLoggedIn();
  const { onLoggedOut = () => {} } = useNodeContext();

  const onCompleted = (...args) => {
    // Changes the context of isLoggedIn.
    loggedOut();

    // Runs any context onLoggedOut passed from app.
    onLoggedOut(...args);

    // onCompleted prop passed to useLogout.
    onCompletedProp(...args);
  };

  const [mutate, { loading, error }] = useMutation(mutations.MutationLogout, {
    onCompleted,
  });

  const logout = () => {
    const clientMutationId =
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36);

    mutate({ variables: { clientMutationId } });
  };

  return {
    loading,
    error,
    logout,
  };
};
