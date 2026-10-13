// frontend/src/features/primary-attention/hooks/useSaudeCriancaForm.js
import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  saudeCriancaSchema,
  buildDefaultValues,
} from "../validations/saudeCrianca.schema.js";
import { totalGeral, totalPoli } from "../utils/saudeCrianca.utils.js";

export function useSaudeCriancaForm({ onSuccess } = {}) {
  const form = useForm({
    resolver: zodResolver(saudeCriancaSchema),
    defaultValues: buildDefaultValues(),
    mode: "onBlur",
  });

  const indicadores = useWatch({ control: form.control, name: "indicadores" });
  const indicadoresSeguro = indicadores ?? {};

  const totalG = totalGeral(indicadoresSeguro);
  const totalP = totalPoli(indicadoresSeguro);

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
    totalGeral: totalG,
    totalPoli: totalP,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}