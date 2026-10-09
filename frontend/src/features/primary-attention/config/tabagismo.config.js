// frontend/src/features/primary-attention/config/tabagismo.config.js

export const MESES_TABAGISMO = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

/**
 * tipo:
 *   "contagem"    → inteiro ≥ 0
 *   "percentual"  → decimal 0–100
 */
export const INDICADORES_TABAGISMO = [
  { key: "pessoasIniciaram", label: "Pessoas que iniciaram o tratamento", tipo: "contagem" },
  { key: "unidadesSaude", label: "Unidades de Saúde que realizaram tratamento (quadrimestre)", tipo: "contagem" },
  { key: "pacientesMasculino", label: "Pacientes atendidos - Sexo Masculino", tipo: "contagem" },
  { key: "pacientesFeminino", label: "Pacientes atendidos - Sexo Feminino", tipo: "contagem" },
  { key: "usaramMedicamento", label: "Pacientes que usaram medicamento para cessar o tabagismo", tipo: "contagem" },
  { key: "atendimentoIndividual", label: "Pacientes em atendimento individual", tipo: "contagem" },
  { key: "atendimentoGrupo", label: "Pacientes em atendimento em Grupo", tipo: "contagem" },
  { key: "proporcaoUnidades", label: "Proporção das unidades que realizam atendimento (%)", tipo: "percentual" },
];