// frontend/src/features/primary-attention/utils/saudeBucal.utils.js
import { INDICADORES_POR_UNIDADE } from "../config/saudeBucal.config.js";

export function getIndicatorKeys(unit) {
  return (INDICADORES_POR_UNIDADE[unit] || []).map((i) => i.key);
}

export function totalIndicadores(indicators) {
  return Object.values(indicators || {}).reduce(
    (acc, v) => acc + (Number(v) || 0),
    0
  );
}

export function seedIndicators(unit) {
  return Object.fromEntries(getIndicatorKeys(unit).map((k) => [k, 0]));
}