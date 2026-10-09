export const QUADRIMESTRES = [
  { key: "Q1", label: "Q1 — Janeiro a Abril" },
  { key: "Q2", label: "Q2 — Maio a Agosto" },
  { key: "Q3", label: "Q3 — Setembro a Dezembro" },
];

export const QUADRIMESTRE_KEYS = QUADRIMESTRES.map((q) => q.key);

export const ANO_MIN = 2020;
export const ANO_MAX = 2100;

/**
 * Single source of truth for SISAB indicators.
 * Adding an indicator = editing only this array. The Zod schema, defaults,
 * and grid are all derived from it.
 */
export const SISAB_INDICADORES = [
  {
    key: "preNatal6Consultas",
    numero: 1,
    label: "Proporção de gestantes com pelo menos seis consultas pré-natal realizadas, sendo a 1ª até a 12ª semana de gestação",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 45 },
    peso: 1,
  },
  {
    key: "gestantesSifilisHiv",
    numero: 2,
    label: "Proporção de gestantes com realização de exames para sífilis e HIV",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 60 },
    peso: 1,
  },
  {
    key: "gestantesOdonto",
    numero: 3,
    label: "Proporção de gestantes com atendimento odontológico realizado",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 60 },
    peso: 2,
  },
  {
    key: "citopatologico",
    numero: 4,
    label: "Proporção de mulheres com coleta de citopatológico na APS",
    parametro: { operador: ">=", valor: 80 },
    meta: { operador: ">=", valor: 40 },
    peso: 1,
  },
  {
    key: "vacinacaoCriancas",
    numero: 5,
    label: "Proporção de crianças de um ano de idade vacinadas na APS contra difteria, tétano, coqueluche, hepatite B, infecções por Haemophilus influenzae tipo B e poliomielite inativada",
    parametro: { operador: ">=", valor: 95 },
    meta: { operador: ">=", valor: 95 },
    peso: 2,
  },
  {
    key: "hipertensaoPa",
    numero: 6,
    label: "Proporção de pessoas com hipertensão, com consulta e pressão arterial aferida no semestre",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 50 },
    peso: 2,
  },
  {
    key: "diabetesHbglicada",
    numero: 7,
    label: "Proporção de pessoas com diabetes, com consulta e hemoglobina glicada solicitada no semestre",
    parametro: { operador: "=", valor: 100 },
    meta: { operador: ">=", valor: 50 },
    peso: 1,
  },
];

export const PESO_TOTAL = SISAB_INDICADORES.reduce(
  (acc, i) => acc + i.peso,
  0
);