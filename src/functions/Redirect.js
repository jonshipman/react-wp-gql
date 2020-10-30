export const REDIRECT = "redirect";

export const getRedirect = () => window.localStorage.getItem(REDIRECT);
export const setRedirect = (redirect) =>
  window.localStorage.setItem(REDIRECT, redirect);
export const removeRedirect = () => window.localStorage.removeItem(REDIRECT);
