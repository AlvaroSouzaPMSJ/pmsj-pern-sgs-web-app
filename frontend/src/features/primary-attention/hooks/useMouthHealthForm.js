// frontend/src/features/primary-attention/hooks/useSaudeBucalForm.js
import { useCallback, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildSaudeBucalSchema } from "../validations/saudeBucal.schema.js";
import { seedIndicators, totalIndicadores } from "../utils/saudeBucal.utils.js";

export function useSaudeBucalForm({ unit, onSuccess }) {
  const schema = useMemo(() => buildSaudeBucalSchema(unit), [unit]);

  const defaultValues = useMemo(
    () => ({
      currentYear: new Date().getFullYear().toString(),
      month: "",
      indicators: seedIndicators(unit),
    }),
    [unit]
  );

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const { control, handleSubmit, reset, formState } = form;
  const indicators = useWatch({ control, name: "indicators" });
  const total = totalIndicadores(indicators);

  const onSubmit = handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        reset({
          currentYear: data.currentYear,
          month: "",
          indicators: seedIndicators(unit),
        });
      },
      [onSuccess, reset, unit]
    )
  );

  return {
    form,
    onSubmit,
    total,
    control,
    errors: formState.errors,
    isSubmitting: formState.isSubmitting,
    reset,
  };
}