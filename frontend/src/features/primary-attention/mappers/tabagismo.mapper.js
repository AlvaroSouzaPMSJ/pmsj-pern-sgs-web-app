// frontend/src/features/primary-attention/mappers/tabagismo.mapper.js
import { INDICADORES_TABAGISMO } from "../config/tabagismo.config.js";
import { totalAtendidos } from "../utils/tabagismo.utils.js";

/**
 * Form values → in-memory registro (for session list display).
 * DTO firewall: only whitelisted indicator keys reach the object.
 */
export function toRegistro(values) {
  const indicadores = Object.fromEntries(
    INDICADORES_TABAGISMO.map(({ key }) => [key, values[key] ?? 0])
  );

  return {
    id: crypto.randomUUID(),
    mes: values.mes,
    ...indicadores,
    totalPacientesAtendidos: totalAtendidos(values),
    criadoEm: new Date().toISOString(),
  };
}

/**
 * Registro → API payload (adjust when backend endpoint exists).
 */
export function toApiPayload(registro) {
  const { id, criadoEm, totalPacientesAtendidos, ...rest } = registro;
  return rest;
}