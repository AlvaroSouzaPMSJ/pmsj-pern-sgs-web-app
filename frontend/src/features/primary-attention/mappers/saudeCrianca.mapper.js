// frontend/src/features/primary-attention/mappers/saudeCrianca.mapper.js
import { ALL_INDICADOR_KEYS_SC } from "../config/saudeCrianca.config.js";

/** Form values → in-memory registro. DTO firewall via explicit key list. */
export function toRegistro(values) {
  const indicadores = Object.fromEntries(
    ALL_INDICADOR_KEYS_SC.map((k) => [k, values.indicadores?.[k] ?? 0])
  );

  return {
    id: crypto.randomUUID(),
    mes: values.mes,
    sequencia: values.sequencia,
    indicadores,
    criadoEm: new Date().toISOString(),
  };
}

/** Registro → API payload (adjust when backend endpoint exists). */
export function toApiPayload(registro) {
  const { id, criadoEm, ...rest } = registro;
  return rest;
}