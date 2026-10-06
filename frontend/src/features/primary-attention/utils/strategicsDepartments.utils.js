// frontend/src/features/primary-attention/utils/areasEstrategicas.utils.js
import { INDICADORES } from "../config/areasEstrategicas.config.js";

export function seedValores(blocoKey) {
  return Object.fromEntries(
    INDICADORES[blocoKey].map(({ key }) => [key, null])
  );
}

export function contarPreenchidos(valores) {
  return Object.values(valores ?? {}).filter(
    (v) => v !== null && v !== undefined && v !== ""
  ).length;
}