// frontend/src/features/primary-attention/mappers/saudeBucalEstrategico.mapper.js
import { ALL_INDICADOR_KEYS_SBE } from "../config/saudeBucalEstrategico.config.js";
import {
  totalProcedimentos,
  totalUOM,
  coberturaMedia,
} from "../utils/saudeBucalEstrategico.utils.js";

/** Form values → in-memory registro. DTO firewall via explicit key list. */
export function toRegistro(values) {
  const indicadores = Object.fromEntries(
    ALL_INDICADOR_KEYS_SBE.map((k) => [k, values.indicadores?.[k] ?? 0])
  );

  return {
    id: crypto.randomUUID(),
    mes: values.mes,
    ano: values.ano,
    indicadores,
    totalProcedimentos: totalProcedimentos(indicadores),
    totalUOM: totalUOM(indicadores),
    coberturaMedia: coberturaMedia(indicadores),
    criadoEm: new Date().toISOString(),
  };
}

/** Registro → API payload. */
export function toApiPayload(registro) {
  const { id, criadoEm, totalProcedimentos: _a, totalUOM: _b, coberturaMedia: _c, ...rest } = registro;
  return rest;
}