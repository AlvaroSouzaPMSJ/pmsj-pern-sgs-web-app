// frontend/src/features/primary-attention/validations/saudeMulher.schema.js
import { z } from "zod";
import { MESES_SM, ALL_INDICADOR_KEYS } from "../config/saudeMulher.config.js";

/** Non-negative number. Coerces "" → 0 (matches original behavior). */
const numeroNaoNegativo = z.coerce.number().min(0, "Valor não pode ser negativo");

const indicadorShape = Object.fromEntries(
  ALL_INDICADOR_KEYS.map((key) => [key, numeroNaoNegativo])
);

export const saudeMulherSchema = z.object({
  mes: z.enum(MESES_SM, { message: "Selecione o mês de referência" }),
  ...indicadorShape,
});

export function buildDefaultValues() {
  return {
    mes: "",
    ...Object.fromEntries(ALL_INDICADOR_KEYS.map((k) => [k, 0])),
  };
}