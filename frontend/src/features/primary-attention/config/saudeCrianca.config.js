// frontend/src/features/primary-attention/config/saudeCrianca.config.js

export const MESES_SC = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

/** Indicadores Gerais — Saúde da Criança (top section). */
export const INDICADORES_GERAIS = [
  { key: "baixoPeso", label: "Proporção de nascidos vivos com baixo peso ao nascer" },
  { key: "menores6Sisvan", label: "Nº crianças < 6 anos com estado nutricional (SISVAN)" },
  { key: "menores6Sus", label: "Nº crianças < 6 anos cadastradas no SUS" },
  { key: "proporcaoSisvan", label: "Proporção de crianças < 6 anos cadastradas no SISVAN" },
  { key: "formulaLactea", label: "Nº crianças que receberam fórmula láctea" },
  { key: "formulaEspecial", label: "Nº crianças que receberam fórmula especial" },
  { key: "consultasPediatria", label: "Nº consultas pediátricas (méd.) - Prog. São José" },
  { key: "consultasPuerperio", label: "Nº consultas de puerpério (enf.) - Prog. São José" },
  { key: "atendimentosSaoJose", label: "Nº atendimentos - Prog. São José Criança" },
  { key: "vacinasSaoJose", label: "Nº vacinas aplicadas - Prog. São José Criança" },
  { key: "coberturaCondicionalidades", label: "Cobertura de acompanhamento (condicionalidades)" },
];

/** Indicadores Importados — Poli Forquilhinhas (bottom section). */
export const INDICADORES_POLI = [
  { key: "poliCriancasAtendidas", label: "Nº absoluto de crianças atendidas" },
  { key: "poliConsultaPediatria", label: "Consultas em Pediatria" },
  { key: "poliConsultaEndocrino", label: "Consultas em Endocrinologia infantil" },
  { key: "poliConsultaNeonato", label: "Consultas em Neonatologia" },
  { key: "poliConsultaOrtopedia", label: "Consultas em Ortopedia Pediátrica" },
  { key: "poliConsultaGastro", label: "Consultas em Gastroenterologia infantil" },
  { key: "poliConsultaFono", label: "Consultas em Fonoaudiologia infantil" },
  { key: "poliConsultaNutricao", label: "Consultas em Nutrição infantil" },
  { key: "poliConsultaNeuro", label: "Consultas em Neurologia infantil" },
  { key: "poliCadastroFormulaInf", label: "Nº crianças cadastradas para recebimento de fórmula infantil" },
  { key: "poliCadastroFormulaEsp", label: "Nº crianças cadastradas para recebimento de fórmula especial" },
  { key: "poliDispensaFormulaInf", label: "Fórmula infantil dispensada no mês" },
  { key: "poliDispensaFormulaEsp", label: "Fórmula especial dispensada no mês" },
];

export const ALL_INDICADORES_SC = [...INDICADORES_GERAIS, ...INDICADORES_POLI];

export const INDICADOR_KEYS_GERAIS = INDICADORES_GERAIS.map((g) => g.key);
export const INDICADOR_KEYS_POLI = INDICADORES_POLI.map((p) => p.key);
export const ALL_INDICADOR_KEYS_SC = ALL_INDICADORES_SC.map((i) => i.key);