// frontend/src/features/primary-attention/utils/saudeBucalEstrategico.utils.js

export function totalProcedimentos(ind) {
  return (Number(ind?.procedimentos_ab) || 0) + (Number(ind?.procedimentos_ab_2) || 0);
}

export function totalUOM(ind) {
  return (Number(ind?.atendimentos_uom_1) || 0) + (Number(ind?.atendimentos_uom_2) || 0);
}

export function coberturaMedia(ind) {
  const soma =
    (Number(ind?.cobertura_populacional) || 0) +
    (Number(ind?.cobertura_populacional_2) || 0);
  return soma > 0 ? soma / 2 : 0;
}

export function formatPct(value) {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + "%";
}