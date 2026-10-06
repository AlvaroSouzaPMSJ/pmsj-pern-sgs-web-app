// frontend/src/features/primary-attention/config/caseReportPages.js

/**
 * Field types supported by FormField:
 *   text | textarea | number | date | select | radio | checkbox
 */
export const FIELD_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  DATE: "date",
  SELECT: "select",
  RADIO: "radio",
  CHECKBOX: "checkbox",
};

export const CASE_REPORT_PAGES = [
  {
    key: "identification",
    title: "Identificação da Paciente",
    subtitle: "Dados pessoais e de contato",
    fields: [
      {
        key: "patientName",
        label: "Nome completo",
        type: FIELD_TYPES.TEXT,
        required: true,
        placeholder: "Nome completo da paciente",
        colSpan: 2,
      },
      {
        key: "patientCpf",
        label: "CPF",
        type: FIELD_TYPES.TEXT,
        placeholder: "000.000.000-00",
        mask: "cpf",
      },
      {
        key: "patientCns",
        label: "CNS",
        type: FIELD_TYPES.TEXT,
        placeholder: "000 0000 0000 0000",
        mask: "cns",
      },
      {
        key: "birthDate",
        label: "Data de nascimento",
        type: FIELD_TYPES.DATE,
        required: true,
      },
      {
        key: "motherName",
        label: "Nome da mãe",
        type: FIELD_TYPES.TEXT,
        required: true,
        colSpan: 2,
      },
      {
        key: "phone",
        label: "Telefone",
        type: FIELD_TYPES.TEXT,
        placeholder: "(00) 00000-0000",
        mask: "phone",
      },
      {
        key: "race",
        label: "Raça/Cor",
        type: FIELD_TYPES.SELECT,
        required: true,
        options: [
          { value: "branca", label: "Branca" },
          { value: "preta", label: "Preta" },
          { value: "parda", label: "Parda" },
          { value: "amarela", label: "Amarela" },
          { value: "indigena", label: "Indígena" },
          { value: "ignorado", label: "Ignorado" },
        ],
      },
      {
        key: "education",
        label: "Escolaridade",
        type: FIELD_TYPES.SELECT,
        options: [
          { value: "fundamental_incompleto", label: "Fundamental incompleto" },
          { value: "fundamental_completo", label: "Fundamental completo" },
          { value: "medio_incompleto", label: "Médio incompleto" },
          { value: "medio_completo", label: "Médio completo" },
          { value: "superior", label: "Superior" },
          { value: "ignorado", label: "Ignorado" },
        ],
      },
    ],
  },

  {
    key: "clinical",
    title: "Dados Clínicos",
    subtitle: "Sinais, sintomas e exames",
    fields: [
      {
        key: "symptomsOnset",
        label: "Data de início dos sintomas",
        type: FIELD_TYPES.DATE,
      },
      {
        key: "diagnosisDate",
        label: "Data do diagnóstico",
        type: FIELD_TYPES.DATE,
        required: true,
      },
      {
        key: "clinicalForm",
        label: "Forma clínica",
        type: FIELD_TYPES.RADIO,
        required: true,
        options: [
          { value: "primaria", label: "Primária" },
          { value: "secundaria", label: "Secundária" },
          { value: "latente_recente", label: "Latente recente" },
          { value: "latente_tardia", label: "Latente tardia" },
          { value: "terciaria", label: "Terciária" },
        ],
      },
      {
        key: "vdrlResult",
        label: "Resultado VDRL",
        type: FIELD_TYPES.TEXT,
        placeholder: "Ex.: 1:8",
      },
      {
        key: "ftaAbsResult",
        label: "Resultado FTA-ABS",
        type: FIELD_TYPES.SELECT,
        options: [
          { value: "reagente", label: "Reagente" },
          { value: "nao_reagente", label: "Não reagente" },
          { value: "inconclusivo", label: "Inconclusivo" },
          { value: "nao_realizado", label: "Não realizado" },
        ],
      },
      {
        key: "notes",
        label: "Observações clínicas",
        type: FIELD_TYPES.TEXTAREA,
        colSpan: 2,
      },
    ],
  },

  {
    key: "pregnancy",
    title: "Dados da Gestação",
    subtitle: "Informações obstétricas",
    fields: [
      {
        key: "gestationalAge",
        label: "Idade gestacional (semanas)",
        type: FIELD_TYPES.NUMBER,
        required: true,
      },
      {
        key: "prenatalCare",
        label: "Realizou pré-natal?",
        type: FIELD_TYPES.RADIO,
        required: true,
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "ignorado", label: "Ignorado" },
        ],
      },
      {
        key: "prenatalStart",
        label: "Trimestre de início do pré-natal",
        type: FIELD_TYPES.SELECT,
        options: [
          { value: "1", label: "1º trimestre" },
          { value: "2", label: "2º trimestre" },
          { value: "3", label: "3º trimestre" },
          { value: "nao_aplicavel", label: "Não aplicável" },
        ],
      },
      {
        key: "partnerTreated",
        label: "Parceiro tratado?",
        type: FIELD_TYPES.RADIO,
        options: [
          { value: "sim", label: "Sim" },
          { value: "nao", label: "Não" },
          { value: "ignorado", label: "Ignorado" },
        ],
      },
      {
        key: "treatment",
        label: "Esquema de tratamento",
        type: FIELD_TYPES.SELECT,
        required: true,
        options: [
          { value: "benzatina_2400000", label: "Benzilpenicilina benzatina 2.400.000 UI" },
          { value: "benzatina_1200000", label: "Benzilpenicilina benzatina 1.200.000 UI" },
          { value: "outro", label: "Outro" },
        ],
      },
    ],
  },

  {
    key: "classification",
    title: "Classificação Final",
    subtitle: "Conclusão do caso",
    fields: [
      {
        key: "caseClassification",
        label: "Classificação",
        type: FIELD_TYPES.RADIO,
        required: true,
        options: [
          { value: "confirmado", label: "Confirmado" },
          { value: "descartado", label: "Descartado" },
        ],
      },
      {
        key: "evolution",
        label: "Evolução do caso",
        type: FIELD_TYPES.SELECT,
        options: [
          { value: "cura", label: "Cura" },
          { value: "obito", label: "Óbito" },
          { value: "em_tratamento", label: "Em tratamento" },
          { value: "ignorado", label: "Ignorado" },
        ],
      },
      {
        key: "finalNotes",
        label: "Observações finais",
        type: FIELD_TYPES.TEXTAREA,
        colSpan: 2,
      },
    ],
  },
];

// Total number of steps
export const TOTAL_CASE_REPORT_STEPS = CASE_REPORT_PAGES.length;