// frontend/src/features/primary-attention/utils/tabagismo.utils.js
import { INDICADORES_TABAGISMO } from "../config/tabagismo.config.js";

export function seedIndicators() {
  return Object.fromEntries(INDICADORES_TABAGISMO.map(({ key }) => [key, 0]));
}

export function totalAtendidos(data) {
  return (Number(data.pacientesMasculino) || 0) + (Number(data.pacientesFeminino) || 0);
}