import { gql } from "@apollo/client";

// Login Mutation.
export const MutationLogin = () => gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
    $clientMutationId: String!
  ) {
    login(
      input: {
        clientMutationId: $clientMutationId
        login: $username
        password: $password
      }
    ) {
      clientMutationId
      status
      viewer {
        capabilities
      }
    }
  }
`;

export const MutationLogout = () => gql`
  mutation LogoutMutation($clientMutationId: String!) {
    logout(input: { clientMutationId: $clientMutationId }) {
      clientMutationId
      status
    }
  }
`;

// Registration Mutation.
export const MutationRegistration = () => gql`
  mutation RegisterMutation(
    $clientMutationId: String!
    $username: String!
    $email: String!
  ) {
    registerUser(
      input: {
        clientMutationId: $clientMutationId
        username: $username
        email: $email
      }
    ) {
      user {
        id
        name
      }
    }
  }
`;

// Forgot Password Mutation.
export const MutationPassForgot = () => gql`
  mutation ForgotPasswordMutation(
    $clientMutationId: String!
    $username: String!
  ) {
    sendPasswordResetEmail(
      input: { clientMutationId: $clientMutationId, username: $username }
    ) {
      user {
        id
      }
    }
  }
`;

// Reset Password Mutation.
export const MutationPassReset = () => gql`
  mutation ForgotPasswordMutation(
    $clientMutationId: String!
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: {
        clientMutationId: $clientMutationId
        key: $key
        login: $login
        password: $password
      }
    ) {
      user {
        id
      }
    }
  }
`;
