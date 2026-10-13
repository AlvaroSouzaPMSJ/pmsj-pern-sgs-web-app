// frontend/src/features/primary-attention/utils/saudeCrianca.utils.js
import {
  INDICADOR_KEYS_GERAIS,
  INDICADOR_KEYS_POLI,
  ALL_INDICADOR_KEYS_SC,
} from "../config/saudeCrianca.config.js";

export function sumIndicadores(indicadores, keys) {
  if (!indicadores) return 0;
  return keys.reduce((acc, key) => acc + (Number(indicadores[key]) || 0), 0);
}

export function totalGeral(indicadores) {
  return sumIndicadores(indicadores, INDICADOR_KEYS_GERAIS);
}

export function totalPoli(indicadores) {
  return sumIndicadores(indicadores, INDICADOR_KEYS_POLI);
}

export function preenchidosCount(indicadores) {
  if (!indicadores) return 0;
  return ALL_INDICADOR_KEYS_SC.filter((k) => Number(indicadores[k]) > 0).length;
}