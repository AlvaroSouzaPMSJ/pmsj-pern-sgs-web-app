// frontend/src/features/primary-attention/mappers/areasEstrategicas.mapper.js
import { INDICADORES } from "../config/areasEstrategicas.config.js";

/**
 * Form values → in-memory documento (used for session list display).
 * Whitelist: only catalog keys of the current block reach `valores`.
 */
export function toDocumento(values) {
  const catalogo = INDICADORES[values.bloco];
  const valores = Object.fromEntries(
    catalogo.map(({ key }) => [key, values.valores?.[key] ?? null])
  );
  return {
    id: crypto.randomUUID(),
    bloco: values.bloco,
    competencia: { mes: values.mes, ano: values.ano },
    valores,
    criadoEm: new Date().toISOString(),
  };
}

/**
 * Documento → API payload shape.
 * Adjust when the backend endpoint exists.
 */
export function toApiPayload(documento) {
  return {
    bloco: documento.bloco,
    competencia: documento.competencia,
    valores: documento.valores,
  };
}