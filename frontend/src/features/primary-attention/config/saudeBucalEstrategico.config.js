// frontend/src/features/primary-attention/config/saudeBucalEstrategico.config.js

export const MESES_SBE = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export const ANO_MIN_SBE = 2024;
export const ANO_MAX_SBE = 2099;

export const GRUPOS_SBE = [
  {
    key: "gerais",
    titulo: "Indicadores Gerais da Atenção Básica",
    itens: [
      { key: "procedimentos_ab", label: "Número de Procedimentos odontológicos na AB" },
      { key: "consultas_ab", label: "Número de Consultas odontológicas na Atenção Básica" },
      { key: "primeira_consulta_programatica", label: "Número da 1ª Consulta odontológica programática" },
      { key: "acoes_coletivas", label: "Número de Ações Coletivas preventivo-educativas" },
      { key: "proporcao_urgencia", label: "Proporção de atendimento de urgências em relação às consultas" },
      { key: "participantes_escovacao", label: "Participantes na Ação Coletiva de Escovação Supervisionada" },
      { key: "cobertura_populacional", label: "Cobertura populacional estimada de saúde bucal na AB" },
      { key: "consultas_retorno", label: "Número absoluto de consultas odontológicas de retorno" },
      { key: "proteses_entregues", label: "Número absoluto de próteses dentárias entregues" },
      { key: "gestantes_atendidas", label: "Número absoluto de gestantes atendidas" },
      { key: "criancas_0_9", label: "Número absoluto de crianças 0 a 9 anos atendidas" },
      { key: "idosos_60_mais", label: "Número absoluto de idosos (acima de 60 anos) atendidos" },
      { key: "tratamentos_concluidos", label: "Número absoluto de tratamentos concluídos" },
      { key: "encaminhamentos_ceo", label: "Número de encaminhamentos para CEO" },
      { key: "encaminhamentos_protese_total", label: "Número de encaminhamentos para Prótese Total" },
      { key: "razao_tratamentos_consultas", label: "Razão entre tratamentos concluídos e 1ªs consultas" },
      { key: "proporcao_ceo_consultas", label: "Proporção de encaminhamentos para CEO (em relação total de 1ªs consultas)" },
    ],
  },
  {
    key: "portaria3493",
    titulo: "Portaria 3.493, 10/04/2024",
    itens: [
      { key: "primeira_consulta_portaria", label: "Primeira consulta odontológica Programática" },
      { key: "tratamento_concluido_portaria", label: "Tratamento concluído" },
      { key: "escovacao_supervisionada_portaria", label: "Escovação supervisionada" },
      { key: "art_atraumatico", label: "Tratamento restaurador atraumático (ART)" },
      { key: "vd_domiciliar", label: "VD (visita domiciliar)" },
      { key: "criancas_0_2_odonto_sao_jose", label: "Número de crianças 0-2 atendidas (Odonto São José)" },
      { key: "criancas_rn_odonto_sao_jose", label: "Número de crianças RN atendidas (Odonto São José)" },
      { key: "acoes_coletivas_2", label: "Número de Ações Coletivas preventivo-educativas" },
      { key: "cobertura_populacional_2", label: "Cobertura populacional estimada de saúde bucal na AB" },
      { key: "gestantes_atendidas_2", label: "Número absoluto de gestantes atendidas" },
      { key: "procedimentos_ab_2", label: "Número de Procedimentos odontológicos na AB" },
    ],
  },
  {
    key: "uom",
    titulo: "Atendimentos realizados pelas Unidades Odontológica Móvel",
    itens: [
      { key: "atendimentos_uom_1", label: "Número de atendimentos realizados pela UOM 1" },
      { key: "atendimentos_uom_2", label: "Número de atendimentos realizados pela UOM 2" },
    ],
  },
];

export const ALL_INDICADOR_KEYS_SBE = GRUPOS_SBE.flatMap((g) =>
  g.itens.map((i) => i.key)
);