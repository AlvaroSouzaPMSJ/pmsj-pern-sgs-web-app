
import { totalIndicadores } from "../utils/saudeBucal.utils.js";

export function toRegistro(values, unit) {
  return {
    id: crypto.randomUUID(),
    unit,
    month: values.month,
    currentYear: values.currentYear,
    indicators: values.indicators,
    total: totalIndicadores(values.indicators),
    criadoEm: new Date().toISOString(),
  };
}

export function toApiPayload(registro) {
  return {
    unit: registro.unit,
    month: registro.month,
    year: Number(registro.currentYear),
    indicators: registro.indicators,
  };
}