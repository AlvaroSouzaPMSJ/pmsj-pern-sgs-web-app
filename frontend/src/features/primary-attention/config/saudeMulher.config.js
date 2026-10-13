// frontend/src/features/primary-attention/config/saudeMulher.config.js

export const MESES_SM = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

/**
 * Indicator catalog grouped by section.
 * tipo:
 *   "contagem"   → inteiro ≥ 0, step 1
 *   "decimal"    → decimal ≥ 0, step 0.01 (proporções, razões, taxas)
 */
export const GRUPOS_SAUDE_MULHER = [
  {
    key: "preNatalPuerperio",
    title: "Atenção ao Pré-Natal e Puerpério (Dados / Indicadores)",
    indicadores: [
      { key: "gestantesPrimeiroTrimestre", label: "N.º gestantes acompanhadas que iniciaram Pré-natal no 1º trimestre", tipo: "contagem" },
      { key: "preNatalAltoRisco", label: "N.º de Pré-Natal de Alto Risco", tipo: "contagem" },
      { key: "gestantesCadastradas", label: "N.º de gestantes cadastradas", tipo: "contagem" },
      { key: "proporcaoGestantesPrimeiroTrimestre", label: "Proporção de gestantes acompanhadas que iniciaram Pré-natal no 1º trimestre", tipo: "decimal" },
      { key: "proporcaoVacinaDtpa", label: "Proporção de gestantes com vacinas Dtpa em dia", tipo: "decimal" },
      { key: "examesCitopatologicos", label: "N.º exames citopatológicos de colo do útero (25 a 64 anos)", tipo: "contagem" },
      { key: "razaoExamesCitopatologicos", label: "Razão de exames citopatológicos (25 a 64 anos)", tipo: "decimal" },
      { key: "mulheres25a64Dividido3", label: "N.º de mulheres na faixa etária de 25 a 64 anos dividida por 3", tipo: "decimal" },
      { key: "consultasPuerperioMedico", label: "N.º consultas médicas de Puerpério (até 42 dias)", tipo: "contagem" },
      { key: "consultasPuerperioEnfermagem", label: "N.º consultas de enfermagem de Puerpério (até 42 dias)", tipo: "contagem" },
      { key: "mulheres50a69Dividido2", label: "N.º de mulheres na faixa etária de 50 a 69 anos, dividida por 2", tipo: "decimal" },
      { key: "examesMamografiaRastreamento", label: "N.º de exames de Mamografia de rastreamento", tipo: "contagem" },
    ],
  },
  {
    key: "portaria715",
    title: "Indicadores conforme Portaria GM/MS nº 715, de 04/04/2022",
    indicadores: [
      { key: "mulheres14a49InsercaoDIU", label: "N.º de mulheres (14 a 49 anos) com inserção de DIU", tipo: "contagem" },
      { key: "mulheres14a49TesteRapidoGravidez", label: "N.º de mulheres (14 a 49 anos) c/ teste rápido de gravidez antes da 12ª semana", tipo: "contagem" },
      { key: "nascimentosMaesMenos14", label: "N.º de nascimentos de mães com idade inferior a 14 anos", tipo: "contagem" },
    ],
  },
  {
    key: "notaTecnica21",
    title: "Indicadores conforme Nota Técnica 21/2022 - SAPS/MS",
    indicadores: [
      { key: "taxaMedicosGinecologistas", label: "Taxa de médicos ginecologistas obstetras na APS (por 10.000 hab.)", tipo: "decimal" },
      { key: "percentualGestantesRiscoAtendidas", label: "Percentual de gestantes c/ risco obstétrico atendidas por ginecologista-obstetra", tipo: "decimal" },
      { key: "razaoMortalidadeMaterna", label: "Razão de mortalidade materna", tipo: "decimal" },
      { key: "consultasPreNatalMedicoESF", label: "N.º de consultas de Pré Natal realizado pelo Médico ESF", tipo: "contagem" },
      { key: "consultasPreNatalEnfermeiroESF", label: "N.º de consultas de Pré Natal realizado pelo Enfermeiro ESF", tipo: "contagem" },
    ],
  },
];

/** Flat list of all indicator keys, in order. */
export const ALL_INDICADOR_KEYS = GRUPOS_SAUDE_MULHER.flatMap((g) =>
  g.indicadores.map((i) => i.key)
);