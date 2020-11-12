import React, {
  forwardRef,
  useContext,
  createContext,
  useMemo,
  useEffect,
  useState,
  useRef,
} from "react";
import { useComponents } from "../hooks";

const CheckboxContext = createContext({});

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
      {options.map(({ value: oValue, label: oLabel }) => (
        <CheckboxComponents.CheckboxLabel
          htmlFor={`${id}-${oValue}`}
          key={`${id}-${oValue}`}
        >
          <span>
            <CheckboxComponents.CheckboxField
              id={`${id}-${oValue}`}
              value={`${oValue}`}
              checked={`${value}` === `${oValue}`}
              {...props}
            />
          </span>
          <span>{` ${oLabel}`}</span>
        </CheckboxComponents.CheckboxLabel>
      ))}
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

let Input = (
  {
    width = 100,
    id,
    value = "",
    type = "text",
    onChange = () => {},
    onEnter = () => {},
    className = "b--light-silver br0 bb-1 bl-0 br-0 bt-0 pl2 pb2 flex-auto bg-transparent",
    loading,
    options,
    ...props
  },
  ref,
) => {
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
      break;
    default:
      break;
  }

  className = `${className} w-${width}`;

  return (
    <Type
      {...{ ref, id, type, value, className }}
      onKeyDown={(e) => e.key === "Enter" && onEnter()}
      onChange={(e) => onChange(e.currentTarget.value)}
      key={keyGeneration({ loading })}
      {...props}
    />
  );
};
Input = forwardRef(Input);

/**
 * Uses a setTimeout debounce to avoid costly validity renders
 */
const useValidityDelay = ({ validProp, value, onCheck, idProp }) => {
  const valid = useMemo(() => {
    return validProp instanceof Function ? validProp : () => validProp;
  }, [validProp]);

  const [wait, setWait] = useState(false);
  const waitTimeout = useRef();
  useEffect(() => {
    clearTimeout(waitTimeout.current);

    setWait(true);
    waitTimeout.current = setTimeout(() => {
      setWait(false);
    }, 80);

    return () => {
      clearTimeout(waitTimeout.current);
    };
  }, [waitTimeout]);

  const isValid = useMemo(() => {
    if (wait) {
      return value === undefined || !validProp instanceof Function;
    }

    return value === undefined || valid(value);
  }, [validProp, valid, value, wait]);

  useEffect(() => {
    if (onCheck) {
      onCheck(isValid, idProp, value, valid);
    }
  }, [isValid, idProp, value, valid]);

  return isValid;
};

let FormGroup = (
  {
    className = "",
    replaceClass,
    help,
    valid: validProp = true,
    error = "Required.",
    onCheck,
    label,
    children,
    id: idProp,
    ...props
  },
  ref,
) => {
  const { components } = useComponents();
  const id = useMemo(
    () => `${idProp}-${Math.random().toString(36).substr(2, 9)}`,
    [idProp],
  );

  const isValid = useValidityDelay({
    validProp,
    value: props.value,
    onCheck,
    idProp,
  });

  const InputComponent = Input;
  let InputProps = { id, ...props };
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
    <CheckboxContext.Provider value={CheckboxComponents}>
      <div {...FormGroupProps}>
        {label && <LabelComponent {...LabelProps}>{label}</LabelComponent>}
        <InputComponent {...InputProps} {...{ ref }} />
        <div>
          {!isValid && error ? (
            <components.FormError>{error}</components.FormError>
          ) : null}
        </div>
        <div>{help}</div>
      </div>
    </CheckboxContext.Provider>
  );
};

FormGroup = forwardRef(FormGroup);
export { FormGroup, Input, Checkbox };
