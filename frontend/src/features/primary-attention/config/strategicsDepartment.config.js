// frontend/src/features/primary-attention/config/areasEstrategicas.config.js

export const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const ANOS = [2025, 2026];

export const BLOCOS = [
  { key: "consultas", label: "Consultas" },
  { key: "maternoInfantil", label: "Avaliação Materno Infantil" },
];

export const INDICADORES = {
  consultas: [
    {
      key: "consultasMedicasEsf",
      label: "Número de consultas médicas da ESF",
      tipo: "contagem",
    },
    {
      key: "consultasMedicasClinicoGeral",
      label: "Número de consultas médicas do Clínico Geral",
      tipo: "contagem",
    },
    {
      key: "consultasMedicasGinecologista",
      label: "Número de consultas médicas do Ginecologista",
      tipo: "contagem",
    },
    {
      key: "consultasMedicasPediatra",
      label: "Número de consultas médicas do Pediatra",
      tipo: "contagem",
    },
    {
      key: "consultasEnfermeiroEsf",
      label: "Número de consultas do Enfermeiro da ESF",
      tipo: "contagem",
    },
    {
      key: "consultasEnfermeiroGeralAp",
      label: "Número de consultas do Enfermeiro Geral na Atenção Primária",
      tipo: "contagem",
    },
    {
      key: "visitasDomiciliaresMedicoEsf",
      label: "Número de visitas domiciliares do Médico da ESF",
      tipo: "contagem",
    },
    {
      key: "visitasDomiciliaresEnfermeiroEsf",
      label: "Número de visitas domiciliares do Enfermeiro da ESF",
      tipo: "contagem",
    },
    {
      key: "visitasDomiciliaresTecnicoAuxEnfEsf",
      label:
        "Número de visitas domiciliares de Técnicos/Aux. de Enfermagem da ESF",
      tipo: "contagem",
    },
    {
      key: "visitasDomiciliaresAcsEsf",
      label:
        "Número de visitas domiciliares de ACS da equipe de Saúde da Família (ESF)",
      tipo: "contagem",
    },
    {
      key: "acsAtivosEsf",
      label: "Número de agentes comunitários de saúde ativos na ESF",
      tipo: "contagem",
    },
    {
      key: "coberturaPopulacionalAb",
      label:
        "Cobertura populacional estimada pelas equipes de Atenção Básica (%)",
      tipo: "percentual",
    },
    {
      key: "percentualEscolasPse",
      label:
        "Percentual de escolas pactuadas com pelo menos 1 ação do PSE no mês (%)",
      tipo: "percentual",
    },
    {
      key: "proporcaoIcsab",
      label:
        "Proporção de internações por condições sensíveis à Atenção Básica — ICSAB (%)",
      tipo: "percentual",
    },
    {
      key: "totalTeleatendimento",
      label: "Total de teleatendimentos",
      tipo: "contagem",
    },
    {
      key: "atendimentosConsultorioNaRua",
      label: "Número de atendimentos realizados através do Consultório na Rua",
      tipo: "contagem",
    },
  ],
  maternoInfantil: [
    {
      key: "consultasMedicasPreNatal",
      label:
        "Número de consultas médicas de Pré-Natal (PN) por área de abrangência de cada equipe de ESF da UBS",
      tipo: "contagem",
    },
    {
      key: "consultasEnfermeiroPreNatal",
      label:
        "Número de consultas do Enfermeiro de Pré-Natal (PN) por área de abrangência de cada equipe de ESF da UBS",
      tipo: "contagem",
    },
    {
      key: "gestantesInicioPnPrimeiroTrimestre",
      label:
        "Número de gestantes acompanhadas que iniciaram Pré-Natal no 1º trimestre",
      tipo: "contagem",
    },
    {
      key: "gestantesCadastradas",
      label: "Número de gestantes cadastradas",
      tipo: "contagem",
    },
    {
      key: "citopatologicos25a64",
      label:
        "Número de exames citopatológicos do colo do útero em mulheres de 25 a 64 anos",
      tipo: "contagem",
    },
    {
      key: "populacaoFeminina25a64Dividido3",
      label:
        "Número de mulheres na faixa etária de 25 a 64 anos dividido por 3",
      tipo: "contagem",
    },
    {
      key: "consultasPuerperio",
      label: "Total de consultas de Puerpério (Médico + Enfermeiro)",
      tipo: "contagem",
    },
    {
      key: "populacaoFeminina50a69Dividido2",
      label:
        "Número de mulheres na faixa etária de 50 a 69 anos dividido por 2",
      tipo: "contagem",
    },
    {
      key: "mamografias50a69",
      label:
        "Número de exames de mamografia de rastreamento em mulheres de 50 a 69 anos",
      tipo: "contagem",
    },
    {
      key: "consultasPuericultura0a11m",
      label:
        "Total de consultas de Puericultura de 0 a 11 meses e 29 dias (Médico + Enfermeiro)",
      tipo: "contagem",
    },
    {
      key: "proporcaoBaixoPesoAoNascer",
      label:
        "Proporção de nascidos vivos com baixo peso ao nascer (%) — SINASC",
      tipo: "percentual",
    },
    {
      key: "criancasMenores5SisvanAcompanhadas",
      label:
        "Número de crianças menores de 5 anos com estado nutricional acompanhado no SISVAN",
      tipo: "contagem",
    },
    {
      key: "criancasMenores5CadastradasEsus",
      label: "Número de crianças menores de 5 anos cadastradas no e-SUS",
      tipo: "contagem",
    },
    {
      key: "usgObstetrica",
      label: "Número de exames de USG obstétrica",
      tipo: "contagem",
    },
    {
      key: "preNatalAltoRisco",
      label: "Número de Pré-Natal de alto risco (dados importados)",
      tipo: "contagem",
    },
    {
      key: "criancasFormulaLactea",
      label: "Número de crianças que receberam fórmula láctea",
      tipo: "contagem",
    },
    {
      key: "criancasFormulaEspecial",
      label: "Número de crianças que receberam fórmula especial",
      tipo: "contagem",
    },
  ],
};

export const DERIVADOS = {
  consultas: [],
  maternoInfantil: [
    {
      key: "proporcaoPnPrimeiroTrimestre",
      label: "Proporção de gestantes com PN iniciado no 1º trimestre",
      formato: "percentual",
      calc: (v) => {
        if (v.gestantesInicioPnPrimeiroTrimestre == null) return null;
        if (!v.gestantesCadastradas) return null;
        return v.gestantesInicioPnPrimeiroTrimestre / v.gestantesCadastradas;
      },
    },
    {
      key: "razaoCitopatologico",
      label: "Razão de exames citopatológicos (25–64 anos)",
      formato: "razao",
      calc: (v) => {
        if (v.citopatologicos25a64 == null) return null;
        if (!v.populacaoFeminina25a64Dividido3) return null;
        return v.citopatologicos25a64 / v.populacaoFeminina25a64Dividido3;
      },
    },
    {
      key: "razaoMamografia",
      label: "Razão de mamografias de rastreamento (50–69 anos)",
      formato: "razao",
      calc: (v) => {
        if (v.mamografias50a69 == null) return null;
        if (!v.populacaoFeminina50a69Dividido2) return null;
        return v.mamografias50a69 / v.populacaoFeminina50a69Dividido2;
      },
    },
    {
      key: "proporcaoCriancasSisvan",
      label: "Proporção de crianças < 5 anos acompanhadas no SISVAN",
      formato: "percentual",
      calc: (v) => {
        if (v.criancasMenores5SisvanAcompanhadas == null) return null;
        if (!v.criancasMenores5CadastradasEsus) return null;
        return (
          v.criancasMenores5SisvanAcompanhadas /
          v.criancasMenores5CadastradasEsus
        );
      },
    },
    {
      key: "razaoUsgPorGestante",
      label: "Razão de USG obstétrica por gestante cadastrada",
      formato: "razao",
      calc: (v) => {
        if (v.usgObstetrica == null) return null;
        if (!v.gestantesCadastradas) return null;
        return v.usgObstetrica / v.gestantesCadastradas;
      },
    },
  ],
};
