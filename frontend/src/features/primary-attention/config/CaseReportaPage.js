export const CASE_REPORT_PAGES = [
  {
    title: "Identificação da Unidade",
    subtitle: "Dados básicos da gestante e da unidade de saúde",
    fields: [
      {
        key: "ubs",
        label: "Sua Unidade de Saúde (UBS)",
        type: "select",
        required: true,
        options: [
          { value: "forquilhas", label: "UBS Forquilhas" },
          { value: "forquilhinhas", label: "UBS Forquilhinhas" },
          { value: "barreiros", label: "UBS Barreiros" },
          { value: "campinas", label: "UBS Campinas" },
        ],
      },
      {
        key: "pregnantName",
        label: "Nome da Gestante",
        type: "text",
        required: true,
        placeholder: "Nome completo",
      },
      {
        key: "notificationNumber",
        label: "Número de Notificação",
        type: "number",
        required: true,
        placeholder: "Ex: 000123",
      },
    ],
  },
  {
    title: "Datas",
    subtitle: "Datas relevantes para o acompanhamento do caso",
    fields: [
      {
        key: "notificationDate",
        label: "Data da Notificação",
        type: "date",
        required: true,
      },
      {
        key: "birthDate",
        label: "Data de Nascimento",
        type: "date",
        required: true,
      },
      {
        key: "testDate",
        label: "Data da Realização do Teste",
        type: "date",
        required: true,
      },
      { key: "doseDate", label: "Data da Dose", type: "date", required: true },
    ],
  },
  {
    title: "Estágio Clínico e Tratamento",
    subtitle: "Classificação clínica e esquema terapêutico adotado",
    fields: [
      {
        key: "notificationTrimester",
        label: "Trimestre que a Gestante foi Notificada",
        type: "select",
        required: true,
        options: [
          { value: "1", label: "1º Trimestre" },
          { value: "2", label: "2º Trimestre" },
          { value: "3", label: "3º Trimestre" },
        ],
      },
      {
        key: "clinicStage",
        label: "Estágio Clínico",
        type: "radio",
        required: true,
        options: [
          {
            value: "recent",
            label:
              "Sífilis Recente (sífilis primária, secundária e latente recente) — até 1 ano de evolução.",
          },
          {
            value: "late",
            label:
              "Sífilis Tardia (latente, tardia e terciária) — mais de 1 ano de evolução.",
          },
          { value: "neuro", label: "Neurosífilis" },
        ],
      },
      {
        key: "therapeuticScheme",
        label: "Esquema Terapêutico",
        type: "select",
        required: true,
        options: [
          {
            value: "pen_single",
            label: "Penicilina G benzatina 2,4 milhões UI, IM dose única",
          },
          {
            value: "pen_triple",
            label:
              "Penicilina G benzatina 2,4 milhões UI, IM — 3 doses (1 por semana)",
          },
          {
            value: "pen_neuro",
            label: "Penicilina G cristalina IV — tratamento hospitalar",
          },
        ],
      },
      {
        key: "penicillinAllergy",
        label: "Alergia à Penicilina?",
        type: "radio",
        required: true,
        options: [
          { value: "yes", label: "SIM" },
          { value: "no", label: "NÃO" },
        ],
      },
    ],
  },
  {
    title: "Notificação SINAN",
    subtitle: "Informações para registro no sistema SINAN",
    fields: [
      {
        key: "doSinan",
        label: "Fazer Notificação SINAN?",
        type: "radio",
        required: true,
        options: [
          { value: "yes", label: "SIM" },
          { value: "no", label: "NÃO" },
        ],
      },
      {
        key: "sinanType",
        label: "Tipo de Notificação SINAN",
        type: "radio",
        required: true,
        options: [
          { value: "individual", label: "Individual" },
          { value: "negative", label: "Negativa" },
          { value: "outbreak", label: "Surto" },
          { value: "tracoma_inquiry", label: "Inquérito Tracoma" },
        ],
      },
      {
        key: "vdrlDate",
        label: "VDRL 1 — Data",
        type: "date",
        required: false,
      },
      {
        key: "vdrlValue",
        label: "VDRL 1 — Valor (ex: 9,99)",
        type: "text",
        required: false,
        placeholder: "Ex: 1:8",
      },
      {
        key: "observations",
        label: "Observações",
        type: "textarea",
        required: false,
        placeholder: "Informações complementares relevantes...",
      },
    ],
  },
  {
    title: "Dados Pessoais",
    subtitle: "Dados socioeconômicos e de contato da gestante",
    fields: [
      {
        key: "cns",
        label: "Cartão Nacional do SUS (CNS)",
        type: "number",
        required: true,
        placeholder: "15 dígitos",
      },
      {
        key: "motherName",
        label: "Nome da Mãe",
        type: "text",
        required: true,
        placeholder: "Nome completo da mãe",
      },
      {
        key: "illness",
        label: "Agravo / Doença",
        type: "text",
        required: true,
        placeholder: "Ex: Sífilis em Gestante",
      },
      {
        key: "gestationalAge",
        label: "Idade Gestacional",
        type: "select",
        required: true,
        options: [
          { value: "1", label: "1º Trimestre" },
          { value: "2", label: "2º Trimestre" },
          { value: "3", label: "3º Trimestre" },
        ],
      },
      {
        key: "race",
        label: "Raça / Cor",
        type: "select",
        required: true,
        options: [
          { value: "yellow", label: "Amarela" },
          { value: "black", label: "Preta" },
          { value: "white", label: "Branca" },
          { value: "mixed", label: "Parda" },
          { value: "indigenous", label: "Indígena" },
        ],
      },
      {
        key: "education",
        label: "Escolaridade",
        type: "select",
        required: true,
        options: [
          { value: "fundamental", label: "Fundamental" },
          { value: "medio", label: "Médio" },
          { value: "tecnico", label: "Técnico" },
          { value: "superior", label: "Superior" },
        ],
      },
      {
        key: "address",
        label: "Endereço (rua e número)",
        type: "text",
        required: true,
        placeholder: "Ex: Rua das Flores, 123",
      },
      {
        key: "neighborhood",
        label: "Bairro",
        type: "text",
        required: true,
        placeholder: "Bairro",
      },
      {
        key: "phone",
        label: "Telefone",
        type: "tel",
        required: true,
        placeholder: "(48) 99999-9999",
      },
      {
        key: "workerIdentification",
        label: "Identificação do Servidor",
        type: "text",
        required: true,
        placeholder: "Nome ou matrícula do profissional",
      },
    ],
  },
];