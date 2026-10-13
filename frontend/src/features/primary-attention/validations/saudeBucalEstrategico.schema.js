// frontend/src/features/primary-attention/validations/saudeBucalEstrategico.schema.js
import { z } from "zod";
import {
  MESES_SBE,
  ANO_MIN_SBE,
  ANO_MAX_SBE,
  ALL_INDICADOR_KEYS_SBE,
} from "../config/saudeBucalEstrategico.config.js";

const indicadorShape = Object.fromEntries(
  ALL_INDICADOR_KEYS_SBE.map((key) => [
    key,
    z.coerce.number().min(0, "Valor não pode ser negativo"),
  ])
);

export const saudeBucalEstrategicoSchema = z.object({
  mes: z.enum(MESES_SBE, { message: "Selecione o mês" }),
  ano: z.coerce
    .number()
    .int()
    .min(ANO_MIN_SBE, `Ano mínimo ${ANO_MIN_SBE}`)
    .max(ANO_MAX_SBE, `Ano máximo ${ANO_MAX_SBE}`),
  indicadores: z.object(indicadorShape),
});

export function buildDefaultValues() {
  return {
    mes: "",
    ano: new Date().getFullYear(),
    indicadores: Object.fromEntries(ALL_INDICADOR_KEYS_SBE.map((k) => [k, 0])),
  };
}