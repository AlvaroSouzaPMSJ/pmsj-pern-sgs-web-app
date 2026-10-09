import { useCallback, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tabagismoSchema } from "../validations/tabagismo.schema.js";
import { seedIndicators } from "../utils/tabagismo.utils.js";

function buildDefaultValues() {
  return { mes: "", ...seedIndicators() };
}

export function useTabagismoForm({ onSuccess } = {}) {
  const defaultValues = useMemo(buildDefaultValues, []);

  const form = useForm({
    resolver: zodResolver(tabagismoSchema),
    defaultValues,
    mode: "onBlur",
  });

  const watched = useWatch({ control: form.control });
  const totalPacientes =
    (Number(watched.pacientesMasculino) || 0) +
    (Number(watched.pacientesFeminino) || 0);

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
    totalPacientes,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}