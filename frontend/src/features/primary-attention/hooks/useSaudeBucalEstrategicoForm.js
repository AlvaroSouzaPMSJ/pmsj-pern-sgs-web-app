// frontend/src/features/primary-attention/hooks/useSaudeBucalEstrategicoForm.js
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  saudeBucalEstrategicoSchema,
  buildDefaultValues,
} from "../validations/saudeBucalEstrategico.schema.js";

export function useSaudeBucalEstrategicoForm({ onSuccess } = {}) {
  const form = useForm({
    resolver: zodResolver(saudeBucalEstrategicoSchema),
    defaultValues: buildDefaultValues(),
    mode: "onBlur",
  });

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
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}