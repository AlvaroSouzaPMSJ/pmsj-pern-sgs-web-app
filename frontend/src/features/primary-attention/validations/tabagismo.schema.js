// frontend/src/features/primary-attention/validations/tabagismo.schema.js
import { z } from "zod";
import {
  MESES_TABAGISMO,
  INDICADORES_TABAGISMO,
} from "../config/tabagismo.config.js";

const indicadorShape = Object.fromEntries(
  INDICADORES_TABAGISMO.map(({ key, tipo }) => [
    key,
    tipo === "percentual"
      ? z.coerce.number().min(0).max(100, "Máximo 100%")
      : z.coerce.number().int("Deve ser um número inteiro").min(0, "Valor não pode ser negativo"),
  ])
);

export const tabagismoSchema = z.object({
  mes: z.enum(MESES_TABAGISMO, {
    message: "Selecione um mês de referência",
  }),
  ...indicadorShape,
});