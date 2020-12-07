import React, {
  forwardRef,
  useContext,
  createContext,
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useComponents } from "../hooks";

const CheckboxContext = createContext({});
const FormGroupContext = createContext({});

const keyGeneration = ({ loading = false }) => {
  return loading ? `loading` : `loaded`;
};

export const YesNoOptions = [
  { value: 1, label: "Yes" },
  { value: 0, label: "No" },
];

export const CheckboxGroup = ({
  className = "pl2 flex-l flex-wrap-1",
  children,
  ...props
}) => {
  return (
    <div {...{ className }} {...props}>
      {children}
    </div>
  );
};

export const CheckboxLabel = ({
  className = "db w-50-l pointer flex items-center",
  children,
  ...props
}) => {
  return (
    <label {...{ className }} {...props}>
      {children}
    </label>
  );
};

export const CheckboxField = ({
  className = "db w-50-l",
  children,
  ...props
}) => {
  return <input {...{ className }} {...props} />;
};

let Checkbox = (
  { id, options = [{ value: "1", label: "" }], value, ...props },
  ref,
) => {
  const CheckboxComponents = useContext(CheckboxContext);

  return (
    <CheckboxComponents.CheckboxGroup {...{ ref }}>
      {options.map(({ value: _oV, label: oLabel }) => {
        const oValue = `${_oV}`.replace(/[\W_]+/g, "").toLowerCase();
        return (
          <CheckboxComponents.CheckboxLabel
            htmlFor={`${id}-${oValue}`}
            key={`${id}-${oValue}`}
          >
            <span>
              <CheckboxComponents.CheckboxField
                name={id}
                id={`${id}-${oValue}`}
                value={`${_oV}`}
                checked={`${value}` === `${_oV}`}
                {...props}
              />
            </span>
            <span>{` ${oLabel}`}</span>
          </CheckboxComponents.CheckboxLabel>
        );
      })}
    </CheckboxComponents.CheckboxGroup>
  );
};
Checkbox = forwardRef(Checkbox);

export const Label = ({
  className = "w-100 fw7 ttu db mb2 pl2",
  children,
  ...props
}) => {
  return (
    <label {...{ className }} {...props}>
      {children}
      {": "}
    </label>
  );
};

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

let Input = (
  {
    width = 100,
    id,
    value,
    type = "text",
    onChange = () => {},
    onEnter = () => {},
    className = "b--light-silver br0 bb-1 bl-0 br-0 bt-0 pl2 pb2 flex-auto bg-transparent",
    onCheck,
    loading,
    options,
    idProp,
    ...props
  },
  ref,
) => {
  const previousValue = usePreviousValue(value);
  const { setIsValid, validProp } = useContext(FormGroupContext);
  let Type = "input";

  switch (type) {
    case "select":
    case "dropdown":
      Type = "select";

      props.children = (
        <React.Fragment>
          {props.placeholder && <option value="">{props.placeholder}</option>}
          {options &&
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </React.Fragment>
      );

      break;
    case "textarea":
      Type = "textarea";
      props.children = value;
      break;
    case "checkbox":
    case "radio":
      Type = Checkbox;
      width = "auto";
      props.options = options;
      props.type = type;
      break;
    default:
      props.type = type;
      break;
  }

  className = `${className} w-${width}`;

  const ValidityCheck = useCallback(
    (currentValue) => {
      let v;
      if (validProp instanceof Function) {
        v = validProp(currentValue);
      } else {
        v = validProp;
      }

      if (onCheck) {
        onCheck({ id: idProp, valid: v, value });
      }

      setIsValid(v);
    },
    [setIsValid, validProp, value, idProp],
  );

  useEffect(() => {
    if (previousValue !== value) {
      ValidityCheck(value);
    }
  }, [previousValue, value, ValidityCheck]);

  return (
    <Type
      {...{ ref, id, type, className }}
      value={value || ""}
      onKeyDown={(e) => e.key === "Enter" && onEnter()}
      onChange={(e) => onChange(e.currentTarget.value)}
      key={keyGeneration({ loading })}
      {...props}
    />
  );
};
Input = forwardRef(Input);

const InitHandlingComponent = ({ id, onInit }) => {
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!hasRun) {
      setHasRun(true);
      onInit({ id });
    }
  }, [onInit, id, hasRun]);

  return null;
};

const ErrorHandlingComponent = ({ onError, id, value }) => {
  useEffect(() => {
    if (onError) {
      onError({ id, value });
    }
  }, [onError, id, value]);

  return null;
};

let FormGroup = (
  {
    className = "",
    replaceClass,
    help,
    onError,
    onInit,
    valid: validProp = true,
    error = "Required.",
    label,
    children,
    id: idProp,
    ...props
  },
  ref,
) => {
  const [isValid, setIsValid] = useState(true);

  const { components } = useComponents();
  const id = useMemo(
    () => `${idProp}-${Math.random().toString(36).substr(2, 9)}`,
    [idProp],
  );

  const InputComponent = Input;
  let InputProps = { id, idProp, ...props };
  const LabelComponent = Label;
  let LabelProps = { htmlFor: id };

  const CheckboxComponents = { CheckboxGroup, CheckboxLabel, CheckboxField };

  if (children) {
    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;

      if (element.type === InputComponent) {
        InputProps = { ...InputProps, ...element.props };
      }

      if (element.type === LabelComponent) {
        LabelProps = { ...LabelProps, ...element.props };
      }

      if (element.type === CheckboxGroup) {
        CheckboxComponents.CheckboxGroup = (props) => (
          <element.type {...props} {...element.props} />
        );
      }

      if (element.type === CheckboxLabel) {
        CheckboxComponents.CheckboxLabel = (props) => (
          <element.type {...props} {...element.props} />
        );
      }

      if (element.type === CheckboxField) {
        CheckboxComponents.CheckboxField = (props) => (
          <element.type {...props} {...element.props} />
        );
      }
    });
  }

  const FormGroupProps = { className: "form-group overflow-hidden w-100 mb4" };
  if (replaceClass) {
    FormGroupProps.className = className;
  } else {
    FormGroupProps.className = `${FormGroupProps.className} ${className}`;
  }

  return (
    <FormGroupContext.Provider value={{ isValid, validProp, setIsValid }}>
      <CheckboxContext.Provider value={CheckboxComponents}>
        {!!onInit && <InitHandlingComponent {...{ onInit }} id={idProp} />}
        <div {...FormGroupProps}>
          {label && <LabelComponent {...LabelProps}>{label}</LabelComponent>}
          <InputComponent {...InputProps} {...{ ref }} />
          {!isValid && error ? (
            <div>
              <ErrorHandlingComponent {...{ onError, id: idProp, ...props }} />
              <components.FormError>{error}</components.FormError>
            </div>
          ) : null}
          <div>{help}</div>
        </div>
      </CheckboxContext.Provider>
    </FormGroupContext.Provider>
  );
};

FormGroup = forwardRef(FormGroup);
export { FormGroup, Input, Checkbox };
