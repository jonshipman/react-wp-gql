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
