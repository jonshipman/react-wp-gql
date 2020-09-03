// localStorage key to persist the token
export const AUTH_TOKEN = "auth-token";
export const REDIRECT = "redirect";

export const getAuthToken = () => window.localStorage.getItem(AUTH_TOKEN);
export const setAuthToken = (token) =>
  window.localStorage.setItem(AUTH_TOKEN, token);
export const removeAuthToken = () => window.localStorage.removeItem(AUTH_TOKEN);
export const getRedirect = () => window.localStorage.getItem(REDIRECT);
export const setRedirect = (redirect) =>
  window.localStorage.setItem(REDIRECT, redirect);
export const removeRedirect = () => window.localStorage.removeItem(REDIRECT);
