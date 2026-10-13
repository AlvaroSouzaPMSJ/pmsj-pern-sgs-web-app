// frontend/src/features/primary-attention/utils/saudeMulher.utils.js
import { ALL_INDICADOR_KEYS } from "../config/saudeMulher.config.js";

/** Summary metric: sum of the three main screening totals. */
export function totalGeral(indicadores) {
  return (
    (Number(indicadores?.gestantesPrimeiroTrimestre) || 0) +
    (Number(indicadores?.examesCitopatologicos) || 0) +
    (Number(indicadores?.examesMamografiaRastreamento) || 0)
  );
}

export function seedIndicators() {
  return Object.fromEntries(ALL_INDICADOR_KEYS.map((k) => [k, 0]));
}