// frontend/src/features/primary-attention/hooks/useSaudeMulherForm.js
import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  saudeMulherSchema,
  buildDefaultValues,
} from "../validations/saudeMulher.schema.js";
import { totalGeral } from "../utils/saudeMulher.utils.js";

export function useSaudeMulherForm({ onSuccess } = {}) {
  const form = useForm({
    resolver: zodResolver(saudeMulherSchema),
    defaultValues: buildDefaultValues(),
    mode: "onBlur",
  });

  const values = useWatch({ control: form.control });
  const total = totalGeral(values ?? {});

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess?.(data);
        form.reset(buildDefaultValues());
      },
      [form, onSuccess]
    )
  );

  return {
    form,
    handleSubmit,
    total,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}