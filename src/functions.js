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
