// frontend/src/features/primary-attention/validations/areasEstrategicas.schema.js
import { z } from "zod";
import { MESES, INDICADORES } from "../config/areasEstrategicas.config.js";

/** Blank ≠ 0: "", null, undefined, NaN → null. Never coerce empty to zero. */
function numeroNulo(inteiro) {
  const base = inteiro ? z.number().int() : z.number();
  return z.preprocess((v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }, base.min(0, "Valor não pode ser negativo").nullable());
}

function buildValoresShape(blocoKey) {
  return z.object(
    Object.fromEntries(
      INDICADORES[blocoKey].map(({ key, tipo }) => [
        key,
        numeroNulo(tipo === "contagem"),
      ])
    )
  );
}

export const documentoSchema = z.discriminatedUnion("bloco", [
  z.object({
    bloco: z.literal("consultas"),
    mes: z.enum(MESES, { message: "Selecione o mês de competência" }),
    ano: z.coerce.number().int(),
    valores: buildValoresShape("consultas"),
  }),
  z.object({
    bloco: z.literal("maternoInfantil"),
    mes: z.enum(MESES, { message: "Selecione o mês de competência" }),
    ano: z.coerce.number().int(),
    valores: buildValoresShape("maternoInfantil"),
  }),
]);