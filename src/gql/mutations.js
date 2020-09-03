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
        username: $username
        password: $password
      }
    ) {
      authToken
      user {
        nickname
      }
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
