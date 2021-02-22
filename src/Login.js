import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, Switch, Route, useHistory, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQueries } from "./hooks/useQueries";
import {
  LoggedInProvider,
  useIsLoggedIn,
  useLogin,
  useLogout,
} from "./hooks/auth";
import { generatePassword } from "./functions";
import { Button, PageWidth, Title } from "./elements";

export const Logout = () => {
  const history = useHistory();
  const onCompleted = useCallback(() => {
    history.push("/");
  }, [history]);

  const { logout } = useLogout({
    onCompleted,
  });

  useEffect(() => {
    logout();
  }, []);

  return null;
};

const Input = ({
  className: classNameProp = "",
  onChange: onChangeProp,
  onEnter,
  ...props
}) => {
  const onKeyDown = (e) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(e.target.value);
    }
  };

  const onChange = (e) => onChangeProp(e.target.value);

  const className = `rwg--ctrl ${classNameProp}`;

  return (
    <div {...{ className }}>
      <input className="rwg--input" {...{ onKeyDown, onChange }} {...props} />
    </div>
  );
};

export const LoginRender = ({ setMessage }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { login, loading, isLoggedIn, isLoggedInLoading } = useLogin({
    setMessage,
  });

  const { username, password } = state;

  if (!isLoggedIn && !isLoggedInLoading) {
    return (
      <div>
        <Input
          className="rwg--login-group"
          value={username}
          onChange={(username) => setState((p) => ({ ...p, username }))}
          onEnter={() => login(username, password)}
          placeholder="Username or Email Address"
        />

        <Input
          className="rwg--login-group"
          value={password}
          onChange={(password) => setState((p) => ({ ...p, password }))}
          onEnter={() => login(username, password)}
          type="password"
          placeholder="Password"
        />

        <div className="rwg--login-button">
          <Button {...{ loading }} onClick={() => login(username, password)}>
            Log In
          </Button>
        </div>

        <div className="rwg--login-links">
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password
          </Link>
          <Link to="/register" className="register-for-account">
            Sign up for an Account
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export const ForgotPasswordRender = ({ setMessage }) => {
  const clientMutationId = useMemo(() => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }, []);

  const { mutations } = useQueries();
  const [state, setState] = useState({
    username: "",
    clientMutationId,
  });

  const onCompleted = () => {
    const message = "Check your email for a password recovery email.";
    setMessage(message);
  };

  const [mutation, { error, loading }] = useMutation(
    mutations.MutationPassForgot,
    {
      onCompleted,
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
      <Input
        className="rwg--login-group"
        value={username}
        onChange={(username) => setState((p) => ({ ...p, username }))}
        onEnter={() => mutation({ variables: state })}
        placeholder="Username"
      />

      <div className="rwg--login-button">
        <Button {...{ loading }} onClick={() => mutation({ variables: state })}>
          Request New Password
        </Button>
      </div>

      <BackToLogin />
    </div>
  );
};

export const RegisterRender = ({ setMessage }) => {
  const clientMutationId = useMemo(() => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }, []);

  const { mutations } = useQueries();
  const [state, setState] = useState({
    username: "",
    email: "",
    clientMutationId,
  });

  const confirm = () => {
    const message = "Registered! Please check your email for confirmation.";
    setMessage(message);
  };

  const [mutate, { error, loading }] = useMutation(
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
      <Input
        className="rwg--login-group"
        value={username}
        onChange={(username) => setState((p) => ({ ...p, username }))}
        onEnter={() => mutate({ variables: state })}
        placeholder="Username"
      />

      <Input
        className="rwg--login-group"
        value={email}
        onChange={(email) => setState((p) => ({ ...p, email }))}
        onEnter={() => mutate({ variables: state })}
        type="email"
        placeholder="Email"
      />

      <div className="rwg--login-button">
        <Button {...{ loading }} onClick={() => mutate({ variables: state })}>
          Register
        </Button>
      </div>

      <BackToLogin />
    </div>
  );
};

export const ResetPasswordRender = ({ setMessage }) => {
  const { mutations } = useQueries();
  const { key, login } = useParams();

  const clientMutationId = useMemo(() => {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  }, []);

  const [state, setState] = useState({
    login,
    key,
    password: generatePassword(),
    clientMutationId,
  });

  const { login: loginMutate } = useLogin({ setMessage });

  const onCompleted = useCallback(() => {
    loginMutate(state.login, state.password);
  }, [loginMutate, state]);

  const [mutation, { error, loading }] = useMutation(
    mutations.MutationPassReset,
    {
      onCompleted,
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
      <div className="rwg--login-msg">Enter Your New Password:</div>

      <Input
        className="rwg--login-group"
        value={password}
        onChange={(password) => setState((p) => ({ ...p, password }))}
        onEnter={() => mutation({ variables: state })}
      />

      <div className="rwg--login-button">
        <Button {...{ loading }} onClick={() => mutation({ variables: state })}>
          Login
        </Button>
      </div>

      <BackToLogin />
    </div>
  );
};

export const BackToLogin = () => (
  <Link to="/login" className="rwg--login-back">
    &lt; Back to Login
  </Link>
);

export const LoginPage = ({
  title: TitleComponent = Title,
  wrap: Wrap = PageWidth,
}) => {
  const { loading } = useIsLoggedIn();
  const [message, setMessage] = useState("");

  if (loading) {
    return null;
  }

  return (
    <div>
      <TitleComponent>Login</TitleComponent>

      <Wrap>
        <div
          className="rwg--login-msg"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: message }}
        />

        <Switch>
          <Route exact path="/register">
            <RegisterRender {...{ setMessage }} />
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPasswordRender {...{ setMessage }} />
          </Route>
          <Route exact path="/rp/:key/:login">
            <ResetPasswordRender {...{ setMessage }} />
          </Route>
          <Route path="*">
            <LoginRender {...{ setMessage }} />
          </Route>
        </Switch>
      </Wrap>
    </div>
  );
};

export const Login = ({ wrap, title }) => {
  return (
    <div className="rwg--login">
      <LoggedInProvider>
        <Switch>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route>
            <LoginPage {...{ title, wrap }} />
          </Route>
        </Switch>
      </LoggedInProvider>
    </div>
  );
};
