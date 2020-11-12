import React, { useCallback, useState } from "react";
import { useForm } from "./useForm";
import { useComponents } from "../hooks";
import { Valid } from "./Valid";

export const LeadFormGroup = ({ id, onChange, form, ...props }) => {
  const { components } = useComponents();
  return (
    <components.FormGroup
      {...{ id }}
      value={form[id]}
      onChange={(value) => onChange(value, id)}
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
  formName = "default",
  mutation,
}) => {
  const { components } = useComponents();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();

  const onCompleted = (data) => {
    const { errorMessage, success } = data?.defaultFormMutation || {};

    if (success) {
      setCompleted(true);
      setMessage(null);
    } else {
      setMessage(errorMessage);
    }
  };

  const {
    check,
    onChange,
    completed,
    setCompleted,
    submitted,
    mutationLoading,
  } = useForm({
    name: formName,
    onCompleted,
    setForm,
    recaptchaTrigger: Valid.Email(form.email),
    mutation,
  });

  const loading = mutationLoading || loadingProp;

  const onCheck = useCallback(
    (validity, field, value, valid) => {
      setErrors((existing) => ({
        ...existing,
        [field]: value === undefined ? valid(value || "") : validity,
      }));
    },
    [setErrors],
  );

  const ButtonClick = () => {
    check(errors) === 0
      ? submitted(form)
      : setMessage("Check all required fields.");
  };

  const GroupProps = {
    onChange,
    form,
    children,
    onCheck,
  };

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
          id="yourName"
          placeholder="Your Name"
          valid={Valid.NotEmptyString}
          error="You must include a name."
          className={groupClassName}
          {...GroupProps}
        />
        <div className="nl2 nr2">
          <LeadFormGroup
            id="email"
            placeholder="Your Email"
            type="email"
            valid={Valid.Email}
            error="You must include a email."
            className={`${groupClassName || ""} w-50-l fl-l ph2`}
            {...GroupProps}
          />
          <LeadFormGroup
            id="phone"
            placeholder="Your Phone"
            type="tel"
            error="Invalid phone."
            valid={Valid.Phone}
            className={`${groupClassName || ""} w-50-l fl-l ph2`}
            {...GroupProps}
          />
        </div>
        <LeadFormGroup
          id="message"
          placeholder="Message"
          type="textarea"
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
          disabled={completed}
          className={buttonClassName}
          onClick={ButtonClick}
        >
          {buttonLabel}
        </components.Button>
      </div>
    </div>
  );
};
