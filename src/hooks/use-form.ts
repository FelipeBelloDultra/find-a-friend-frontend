import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";

import type { Schema } from "zod";

type UseFormFunctions<FormDataType, FormReturnType> = {
  onSubmitFunction: (data: FormDataType) => Promise<FormReturnType>;
  onSuccess: (value: FormReturnType, data?: FormDataType) => void | Promise<void>;
  onError: (error: unknown) => void | Promise<void>;
};

export function useForm<FormDataType extends Record<string, unknown>, FormReturnType>(
  schema: Schema,
  { onSubmitFunction, onError, onSuccess }: UseFormFunctions<FormDataType, FormReturnType>,
) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useReactHookForm<FormDataType>({
    resolver: zodResolver(schema),
  });

  async function handlerFunction(data: FormDataType) {
    try {
      const result = await onSubmitFunction(data);

      await onSuccess(result, data);
    } catch (error) {
      await onError(error);
    }
  }

  return {
    formErrors: errors,
    isLoading: isSubmitting,
    setFormError: setError,
    register,
    handleSubmit: handleSubmit(handlerFunction),
  };
}
