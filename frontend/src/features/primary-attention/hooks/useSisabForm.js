import { useCallback } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sisabSchema,
  buildDefaultValues,
} from "../validations/sisab.schema.js";
import {
  indicePonderado,
  metasAtingidas,
  preenchidos,
} from "../utils/sisab.utils.js";

export function useSisabForm({ onSuccess } = {}) {
  const form = useForm({
    resolver: zodResolver(sisabSchema),
    defaultValues: buildDefaultValues(),
    mode: "onBlur",
  });

  const valores = useWatch({ control: form.control, name: "valores" });
  const valoresSeguro = valores ?? {};

  const indice = indicePonderado(valoresSeguro);
  const atingidas = metasAtingidas(valoresSeguro);
  const preench = preenchidos(valoresSeguro);

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
    valores: valoresSeguro,
    indice,
    atingidas,
    preench,
  };
}