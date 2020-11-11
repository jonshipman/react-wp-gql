import React, { useState } from "react";
import { useRecaptcha } from "./useRecaptcha";
import { useFormData, useLeadFormMutation, useForm } from "./useForm";
import { isEmail, isPhone } from "./functions";
import { useComponents } from "../hooks";

const schema = {
  yourName: {
    valid: function (v) {
      return v !== "";
    },
    text: "You must include a name.",
  },
  email: {
    valid: function (v) {
      return isEmail(v);
    },
    text: "You must include a email.",
  },
  phone: {
    valid: function (v) {
      return isPhone(v);
    },
    text: "Invalid phone.",
  },
  message: {
    valid: function () {
      return true;
    },
  },
};

export const LeadFormGroup = ({ id, onChange, onError, form, ...props }) => {
  const { components } = useComponents();

  return (
    <components.FormGroup
      {...{ id }}
      value={form[id]}
      onChange={(value) => onChange(value, id)}
      help={onError(id)}
      {...props}
    />
  );
};

export const LeadForm = ({
  children,
  className,
  buttonClassName,
  groupClassName,
  submitionMessage = "Form submitted. Thank you for your submission.",
  buttonLabel = "Submit",
  loading: loadingProp,
  mutation,
}) => {
  const { components } = useComponents();

  const [form, setForm] = useState({});
  const [message, setMessage] = useState();
  const { recaptchaSiteKey, nonce } = useFormData("default");
  const [completed, setCompleted] = useState(false);
  const { token } = useRecaptcha({
    trigger: isEmail(form.email),
    key: recaptchaSiteKey,
  });

  const { submitted, loading: mutateLoading } = useLeadFormMutation({
    token,
    nonce,
    mutation,
    onCompleted: (data = {}) => {
      const { defaultFormMutation = {} } = data;
      const { errorMessage, success } = defaultFormMutation;

      if (success) {
        setCompleted(true);
      } else {
        setMessage(errorMessage);
      }
    },
  });

  const loading = mutateLoading || loadingProp;

  const { Check, onChange, onError } = useForm({
    form,
    setForm,
    schema,
    submitted,
  });

  const GroupProps = { onChange, onError, form, children };

  if (groupClassName) {
    GroupProps.replaceClass = true;
  }

  return (
    <div {...{ className }}>
      <div className="cf">
        {completed && (
          <div className="success-message primary fw7 f6 mb3">
            {submitionMessage}
          </div>
        )}
        {message && (
          <div className="error-message red fw7 f6 mb3">{message}</div>
        )}
        <LeadFormGroup
          placeholder="Your Name"
          id="yourName"
          className={groupClassName}
          {...GroupProps}
        />
        <div className="nl2 nr2">
          <LeadFormGroup
            type="email"
            className={`${groupClassName || ""} w-50-l fl-l ph2`}
            placeholder="Your Email"
            id="email"
            {...GroupProps}
          />
          <LeadFormGroup
            type="tel"
            placeholder="Your Phone"
            id="phone"
            className={`${groupClassName || ""} w-50-l fl-l ph2`}
            {...GroupProps}
          />
        </div>
        <LeadFormGroup
          placeholder="Message"
          type="textarea"
          id="message"
          className={groupClassName}
          {...GroupProps}
        />
      </div>
      <div
        className={`button-wrap tr ${groupClassName || ""}`}
        style={{ marginBottom: 0 }}
      >
        <components.Button
          {...{ loading }}
          className={buttonClassName}
          onClick={Check}
        >
          {buttonLabel}
        </components.Button>
      </div>
    </div>
  );
};
