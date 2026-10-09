// frontend/src/features/primary-attention/utils/sisab.utils.js
import { SISAB_INDICADORES, PESO_TOTAL } from "../config/sisab.config.js";

/** Coerce to number or null. Never NaN. */
export function toNumberOrNull(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

/** Evaluate a value against a { operador, valor } target. null = no value yet. */
export function avaliaAlvo(valor, alvo) {
  if (valor === null || valor === undefined || Number.isNaN(valor)) return null;
  switch (alvo.operador) {
    case ">=": return valor >= alvo.valor;
    case "<=": return valor <= alvo.valor;
    case "=":  return valor === alvo.valor;
    default:   return null;
  }
}

/** Weighted compliance index (%): peso of metas atingidas / peso total. */
export function indicePonderado(valores) {
  if (PESO_TOTAL === 0) return null;
  let pesoAtingido = 0;
  for (const ind of SISAB_INDICADORES) {
    if (avaliaAlvo(toNumberOrNull(valores?.[ind.key]), ind.meta) === true) {
      pesoAtingido += ind.peso;
    }
  }
  return Math.round((pesoAtingido / PESO_TOTAL) * 10000) / 100;
}

export function metasAtingidas(valores) {
  return SISAB_INDICADORES.filter(
    (ind) => avaliaAlvo(toNumberOrNull(valores?.[ind.key]), ind.meta) === true
  ).length;
}

export function preenchidos(valores) {
  return SISAB_INDICADORES.filter(
    (ind) => toNumberOrNull(valores?.[ind.key]) !== null
  ).length;
}

export function formatAlvo({ operador, valor }) {
  const op = operador === ">=" ? "≥ " : operador === "<=" ? "≤ " : "";
  return `${op}${valor}%`;
}

export function formatPct(value) {
  if (value === null || value === undefined) return "—";
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}