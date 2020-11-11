import { isEmail, isPhone } from "./functions";

export const Valid = {
  NotEmptyString: function (v) {
    return v !== "";
  },

  Email: function (v) {
    return isEmail(v);
  },

  Phone: function (v) {
    return isPhone(v);
  },

  LessThan: function (amount) {
    return function (v) {
      return (v || "").length < amount;
    };
  },

  GreaterThan: function (amount) {
    return function (v) {
      return (v || "").length > amount;
    };
  },
};
