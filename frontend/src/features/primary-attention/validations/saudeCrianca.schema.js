// frontend/src/features/primary-attention/validations/saudeCrianca.schema.js
import { z } from "zod";
import {
  MESES_SC,
  ALL_INDICADOR_KEYS_SC,
} from "../config/saudeCrianca.config.js";

const indicadorShape = Object.fromEntries(
  ALL_INDICADOR_KEYS_SC.map((key) => [
    key,
    z.coerce.number().min(0, "Insira um valor numérico válido"),
  ])
);

export const saudeCriancaSchema = z.object({
  mes: z.enum(MESES_SC, { message: "Selecione um mês" }),
  sequencia: z.coerce
    .number()
    .int()
    .min(1, "Sequência deve ser maior que 0"),
  indicadores: z.object(indicadorShape),
});

export function buildDefaultValues() {
  return {
    mes: "",
    sequencia: 1,
    indicadores: Object.fromEntries(ALL_INDICADOR_KEYS_SC.map((k) => [k, 0])),
  };
}