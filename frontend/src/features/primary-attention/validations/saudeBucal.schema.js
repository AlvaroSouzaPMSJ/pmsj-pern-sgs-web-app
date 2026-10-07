// frontend/src/features/primary-attention/validations/saudeBucal.schema.js
import { z } from "zod";
import { MESES_SB, YEAR_OPTIONS } from "../config/saudeBucal.config.js";
import { getIndicatorKeys } from "../utils/saudeBucal.utils.js";

function buildIndicatorSchema(unit) {
  return z.object(
    Object.fromEntries(
      getIndicatorKeys(unit).map((key) => [
        key,
        z.coerce.number().int().min(0, "Valor não pode ser negativo").default(0),
      ])
    )
  );
}

export function buildSaudeBucalSchema(unit) {
  return z.object({
    currentYear: z.enum(YEAR_OPTIONS, {
      message: "Selecione o ano de referência",
    }),
    month: z.enum(MESES_SB, { message: "Selecione o mês de referência" }),
    indicators: buildIndicatorSchema(unit),
  });
}