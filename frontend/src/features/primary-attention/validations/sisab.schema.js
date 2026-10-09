// frontend/src/features/primary-attention/validations/sisab.schema.js
import { z } from "zod";
import {
  QUADRIMESTRE_KEYS,
  SISAB_INDICADORES,
  ANO_MIN,
  ANO_MAX,
} from "../config/sisab.config.js";

/**
 * Per-indicator value: percentage 0–100, required.
 * Empty string is normalized to undefined so a blank field fails `required`
 * instead of silently coercing to 0.
 */
const valorIndicadorSchema = z.preprocess(
  (v) => (v === "" || v === null || v === undefined ? undefined : v),
  z.coerce
    .number({ message: "Informe o percentual" })
    .min(0, "Mínimo 0%")
    .max(100, "Máximo 100%")
);

/** valores shape built dynamically from the catalog. */
const valoresShape = Object.fromEntries(
  SISAB_INDICADORES.map(({ key }) => [key, valorIndicadorSchema])
);

export const sisabSchema = z.object({
  ano: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce
      .number({ message: "Informe o ano" })
      .int()
      .min(ANO_MIN, `Ano mínimo ${ANO_MIN}`)
      .max(ANO_MAX, `Ano máximo ${ANO_MAX}`)
  ),
  quadrimestre: z.enum(QUADRIMESTRE_KEYS, {
    message: "Selecione o quadrimestre",
  }),
  valores: z.object(valoresShape),
});

/** Default values factory — always returns a fresh object. */
export function buildDefaultValues() {
  return {
    ano: new Date().getFullYear(),
    quadrimestre: "",
    valores: Object.fromEntries(SISAB_INDICADORES.map(({ key }) => [key, ""])),
  };
}