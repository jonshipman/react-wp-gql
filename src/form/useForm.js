import { useEffect, useState, useCallback } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRecaptcha } from "./useRecaptcha";

const QUERY = gql`
  query LeadForm {
    formData {
      id
      wpNonce {
        id
        form
        wpNonce
      }
      recatchaSiteKey
    }
  }
`;

const DefaultMutation = gql`
  mutation DefaultForm($input: DefaultFormMutationInput!) {
    defaultFormMutation(input: $input) {
      clientMutationId
      success
      errorMessage
    }
  }
`;

export const useForm = ({
  name: formName,
  setForm,
  recaptchaTrigger: trigger,
  mutation = DefaultMutation,
  onCompleted,
}) => {
  const [nonce, setNonce] = useState("");

  const [
    mutate,
    { error: mutationError, loading: mutationLoading },
  ] = useMutation(mutation, {
    onCompleted,
    errorPolicy: "all",
  });

  const { data, loading: queryLoading, error: queryError } = useQuery(QUERY, {
    errorPolicy: "all",
    ssr: false,
    skip: !formName,
  });

  const { wpNonce = [], recatchaSiteKey: recaptchaSiteKey = "" } =
    data?.formData || {};

  const loading = queryLoading || mutationLoading;
  const error = queryError || mutationError;

  const [completed, setCompleted] = useState(false);
  const { token } = useRecaptcha({
    trigger,
    key: recaptchaSiteKey,
  });

  useEffect(() => {
    if (formName) {
      wpNonce.forEach((n) => {
        if (n.form === formName) {
          setNonce(n.wpNonce);
        }
      });
    }
  }, [wpNonce, formName, setNonce]);

  const onChange = (value, field) => {
    setForm((existing) => ({ ...existing, [field]: value }));
  };

  const check = (errors) => {
    setForm((form) => {
      Object.keys(errors).forEach((key) => {
        if (form[key] === undefined) {
          form[key] = "";
        }
      });

      return form;
    });

    return Object.values(errors).filter((x) => !x).length;
  };

  const submitted = useCallback(
    (form) => {
      const clientMutationId =
        Math.random().toString(36).substring(2) +
        new Date().getTime().toString(36);

      const input = {
        clientMutationId,
        gToken: token,
        wpNonce: nonce,
        ...form,
      };

      mutate({
        variables: {
          input,
        },
      });
    },
    [mutate, token, nonce],
  );

  return {
    submitted,
    check,
    nonce,
    recaptchaSiteKey,
    loading,
    error,
    onChange,
    token,
    completed,
    setCompleted,
    mutationLoading,
    mutationError,
    queryLoading,
    queryError,
  };
};

export const useLeadFormMutation = ({ token, nonce, onCompleted }) => {
  return {
    loading,
    error,
    submitted,
  };
};
