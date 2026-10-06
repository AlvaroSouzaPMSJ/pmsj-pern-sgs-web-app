// frontend/src/features/primary-attention/utils/format.js

/** Null-safe ratio. Any null operand → null. */
export function razao(numerador, denominador) {
  if (numerador === null || numerador === undefined) return null;
  if (!denominador) return null;
  return numerador / denominador;
}

export function formatPct(fracao) {
  if (fracao === null) return "—";
  return (
    (fracao * 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}

export function formatRazao(valor) {
  if (valor === null) return "—";
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}