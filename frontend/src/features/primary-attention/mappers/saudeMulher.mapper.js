// frontend/src/features/primary-attention/mappers/saudeMulher.mapper.js
import { ALL_INDICADOR_KEYS } from "../config/saudeMulher.config.js";
import { totalGeral } from "../utils/saudeMulher.utils.js";

/** Form values → in-memory registro. DTO firewall via explicit key list. */
export function toRegistro(values) {
  const indicadores = Object.fromEntries(
    ALL_INDICADOR_KEYS.map((k) => [k, values[k] ?? 0])
  );

  return {
    id: crypto.randomUUID(),
    mes: values.mes,
    ...indicadores,
    totalGeral: totalGeral(values),
    criadoEm: new Date().toISOString(),
  };
}

/** Registro → API payload (adjust when backend endpoint exists). */
export function toApiPayload(registro) {
  const { id, criadoEm, totalGeral: _t, ...rest } = registro;
  return rest;
}