import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, Switch, Route, useHistory, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { NodeContext } from "./Context";
import { useComponents } from "./hooks/useComponents";
import { useQueries } from "./hooks/useQueries";
import {
  getAuthToken,
  getRedirect,
  setAuthToken as DefaultSetAuthToken,
  removeRedirect as DefaultRemoveRedirect,
} from "./functions";
import { usePreviousRoute } from "./hooks/useComponentHistory";

export const generatePassword = (props) => {
  const { length = 12, specialChars = true, extraSpecialChars = false } =
    props || {};
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  if (specialChars) {
    chars += "!@#$%^&*()";
  }
  if (extraSpecialChars) {
    chars += "-_ []{}<>~`+=,.;:/?|";
  }

  const max = chars.length;
  const min = 0;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.substr(Math.floor(Math.random() * (max - min) + min), 1);
  }

  return password;
};

export const useLogin = ({ setMessage = () => true }) => {
  const { mutations } = useQueries();
  const history = useHistory();

  const {
    loginRedirect = getRedirect(),
    authToken = getAuthToken(),
    setAuthToken = DefaultSetAuthToken,
    removeRedirect = DefaultRemoveRedirect,
  } = useContext(NodeContext);

  useEffect(() => {
    if (authToken) {
      if (loginRedirect) {
        removeRedirect();
        history.push(loginRedirect);
      } else {
        history.push("/");
      }
    }
  }, [history, loginRedirect, authToken, removeRedirect]);

  const confirm = useCallback(
    (data) => {
      const { authToken: authTokenData } = data?.login || {};
      if (authTokenData) {
        setAuthToken(authTokenData);

        if (loginRedirect) {
          removeRedirect();
          history.push(loginRedirect);
        } else {
          history.push("/");
        }
      }
    },
    [history, loginRedirect, setAuthToken, removeRedirect],
  );

  const [mutation, { error, loading }] = useMutation(mutations.MutationLogin, {
    onCompleted: confirm,
    errorPolicy: "all",
  });

  useEffect(() => {
    if (error && error.message !== "Internal server error") {
      setMessage(error);
    }
  }, [error, setMessage]);

  const clientMutationId =
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36);

  return {
    login: (username, password) =>
      mutation({ variables: { username, password, clientMutationId } }),
    loading,
  };
};

export const LoginRender = ({ setMessage }) => {
  const { components } = useComponents();
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { login, loading } = useLogin({ setMessage });

  const { username, password } = state;

  return (
    <div>
      <components.FormGroup
        className="f4"
        value={username}
        onChange={(username) => setState((p) => ({ ...p, username }))}
        onEnter={() => login(username, password)}
        placeholder="Username or Email Address"
      />

      <components.FormGroup
        className="f4"
        value={password}
        onChange={(password) => setState((p) => ({ ...p, password }))}
        onEnter={() => login(username, password)}
        type="password"
        placeholder="Password"
      />

      <components.Button
        loading={loading}
        className="db tc"
        onClick={() => login(username, password)}
      >
        Log In
      </components.Button>

      <div className="mt3 tc tl-l flex-l justify-between-l">
        <Link to="/forgot-password" className="forgot-password">
          Forgot Password
        </Link>
        <Link to="/register" className="register-for-account db mt3 mt0-l">
          Sign up for an Account
        </Link>
      </div>
    </div>
  );
};

export const ForgotPasswordRender = ({ setMessage }) => {
  const { mutations } = useQueries();
  const { components } = useComponents();
  const [state, setState] = useState({
    username: "",
    clientMutationId:
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36),
  });

  const confirm = () => {
    const message = "Check your email for a password recovery email.";
    setMessage(message);
  };

  const [mutation, { error, loading }] = useMutation(
    mutations.MutationPassForgot,
    {
      onCompleted: confirm,
      errorPolicy: "all",
    },
  );

  useEffect(() => {
    if (error && error.message !== "Internal server error") {
      setMessage(error);
    }
  }, [error, setMessage]);

  const { username } = state;

  return (
    <div>
      <components.FormGroup
        className="f4"
        value={username}
        onChange={(username) => setState((p) => ({ ...p, username }))}
        onEnter={() => mutation({ variables: state })}
        placeholder="Username"
      />

      <components.Button
        loading={loading}
        className="db tc"
        onClick={() => mutation({ variables: state })}
      >
        Request New Password
      </components.Button>

      <components.BackToLogin />
    </div>
  );
};

export const RegisterRender = ({ setMessage }) => {
  const { mutations } = useQueries();
  const { components } = useComponents();
  const [state, setState] = useState({
    username: "",
    email: "",
    clientMutationId:
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36),
  });

  const confirm = () => {
    const message = "Registered! Please check your email for confirmation.";
    setMessage(message);
  };

  const [mutation, { error, loading }] = useMutation(
    mutations.MutationRegistration,
    {
      onCompleted: confirm,
      errorPolicy: "all",
    },
  );

  useEffect(() => {
    if (error && error.message !== "Internal server error") {
      setMessage(error);
    }
  }, [error, setMessage]);

  const { username, email } = state;

  return (
    <div>
      <components.FormGroup
        className="f4"
        value={username}
        onChange={(username) => setState((p) => ({ ...p, username }))}
        onEnter={() => mutation({ variables: state })}
        placeholder="Username"
      />

      <components.FormGroup
        className="f4"
        value={email}
        onChange={(email) => setState((p) => ({ ...p, email }))}
        onEnter={() => mutation({ variables: state })}
        type="email"
        placeholder="Email"
      />

      <components.Button
        loading={loading}
        className="db tc"
        onClick={() => mutation({ variables: state })}
      >
        Register
      </components.Button>

      <components.BackToLogin />
    </div>
  );
};

export const ResetPasswordRender = ({ setMessage }) => {
  const { mutations } = useQueries();
  const { components } = useComponents();
  const { key, login } = useParams();

  const [state, setState] = useState({
    login,
    key,
    password: generatePassword(),
    clientMutationId:
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36),
  });

  const { login: loginMutation } = useLogin({ setMessage });

  const confirm = useCallback(() => {
    loginMutation(state.login, state.password);
  }, [loginMutation, state]);

  const [mutation, { error, loading }] = useMutation(
    mutations.MutationPassReset,
    {
      onCompleted: confirm,
      errorPolicy: "all",
    },
  );

  useEffect(() => {
    if (error && error.message !== "Internal server error") {
      setMessage(error);
    }
  }, [error, setMessage]);

  const { password } = state;

  return (
    <div>
      <div className="mb2">Enter Your New Password:</div>

      <components.FormGroup
        className="f4"
        value={password}
        onChange={(password) => setState((p) => ({ ...p, password }))}
        onEnter={() => mutation({ variables: state })}
      />

      <components.Button
        loading={loading}
        className="db tc"
        onClick={() => mutation({ variables: state })}
      >
        Login
      </components.Button>

      <components.BackToLogin />
    </div>
  );
};

export const BackToLogin = () => (
  <Link to="/login" className="db tr mt3">
    &lt; Back to Login
  </Link>
);

export const Login = () => {
  usePreviousRoute("Login");
  const { components } = useComponents();
  const [message, setMessage] = useState("");

  return (
    <components.PageWidth className="login">
      <div>
        <h1>Log in</h1>

        <div
          className="message mb3"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: message }}
        />

        <Switch>
          <Route exact path="/register">
            <components.RegisterRender setMessage={setMessage} />
          </Route>
          <Route exact path="/forgot-password">
            <components.ForgotPasswordRender setMessage={setMessage} />
          </Route>
          <Route exact path="/rp/:key/:login">
            <components.ResetPasswordRender setMessage={setMessage} />
          </Route>
          <Route path="*">
            <components.LoginRender setMessage={setMessage} />
          </Route>
        </Switch>
      </div>
    </components.PageWidth>
  );
};
