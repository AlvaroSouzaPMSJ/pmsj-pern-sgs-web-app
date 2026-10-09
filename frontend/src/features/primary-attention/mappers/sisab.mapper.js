import { SISAB_INDICADORES } from "../config/sisab.config.js";
import {
  indicePonderado,
  metasAtingidas,
} from "../utils/sisab.utils.js";

/**
 * formToDocument — flat RHF state → API body.
 * Contract mirrors the SGS indicator model: indicadores stored as
 * [{ chave, valor: Number }]; one document per (ano, quadrimestre).
 * meta/parametro/peso are intentionally omitted (constants-only).
 */
export function formToDocument(values) {
  return {
    competencia: { ano: values.ano, quadrimestre: values.quadrimestre },
    indicadores: SISAB_INDICADORES.map(({ key }) => ({
      chave: key,
      valor: values.valores[key],
    })),
  };
}

/**
 * documentToForm — API response → RHF defaultValues (for edit flow).
 */
export function documentToForm(doc) {
  const valores = Object.fromEntries(
    SISAB_INDICADORES.map(({ key }) => {
      const found = doc.indicadores?.find((i) => i.chave === key);
      return [key, found ? found.valor : ""];
    })
  );
  return {
    ano: doc.competencia.ano,
    quadrimestre: doc.competencia.quadrimestre,
    valores,
  };
}

/** Form values → in-memory registro for the session list. */
export function toRegistro(values) {
  return {
    ...formToDocument(values),
    id: crypto.randomUUID(),
    indicePonderado: indicePonderado(values.valores),
    metasAtingidas: metasAtingidas(values.valores),
    criadoEm: new Date().toISOString(),
  };
}