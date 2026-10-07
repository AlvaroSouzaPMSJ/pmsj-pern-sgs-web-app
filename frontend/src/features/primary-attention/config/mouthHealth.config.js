export const MESES_SB = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString()
);

export const UNIDADES_SAUDE_BUCAL = [
  "CEO Forquilhinha",
  "CEO Barreiros",
  "UPA Forquilhinha",
];

export const INDICADORES_POR_UNIDADE = {
  "CEO Forquilhinha": [
    { key: "consultas_endodontia", label: "Nº absoluto de consultas de Endodontia realizados." },
    { key: "procedimentos_endodontia", label: "Nº absoluto de procedimentos de Endodontia realizados." },
    { key: "consultas_cirurgia_buco_maxilo", label: "Nº absoluto de consultas de Cirurgia Buco-Maxilo realizados." },
    { key: "procedimentos_cirurgia_buco_maxilo", label: "Nº absoluto de procedimentos de Cirurgia Buco-Maxilo realizados." },
    { key: "consultas_periodontia", label: "Nº absoluto de consultas de Periodontia realizados." },
    { key: "procedimentos_periodontia", label: "Nº absoluto de procedimentos de Periodontia realizados." },
    { key: "procedimentos_pne", label: "Nº absoluto de procedimentos realizados em PNE." },
    { key: "consultas_pne", label: "Nº absoluto de consultas realizadas em PNE." },
    { key: "consultas_ceo", label: "Nº absoluto de Consultas no CEO realizados." },
    { key: "rx_odontologico", label: "Nº absoluto de RX odontológico – Transoperatorio realizados." },
    { key: "consultas_odontopediatria", label: "Nº absoluto de Consultas de Odontopediatria (serviço transferido CEO Barreiros)." },
    { key: "procedimentos_odontopediatria", label: "Nº absoluto de Procedimentos de Odontopediatria (serviço transferido CEO Barreiros)." },
  ],
  "CEO Barreiros": [
    { key: "consultas_endodontia", label: "Nº absoluto de consultas de Endodontia" },
    { key: "procedimentos_endodontia", label: "Nº absoluto de procedimentos de Endodontia" },
    { key: "consultas_cirurgia_buco_maxilo", label: "Nº absoluto de consultas de Cirurgia Buco-Maxilo" },
    { key: "procedimentos_cirurgia_buco_maxilo", label: "Nº absoluto de procedimentos de Cirurgia Buco-Maxilo" },
    { key: "consultas_periodontia", label: "Nº absoluto de consultas de Periodontia" },
    { key: "procedimentos_periodontia", label: "Nº absoluto de procedimentos de Periodontia" },
    { key: "procedimentos_pne", label: "Nº absoluto de procedimentos realizados – PNE" },
    { key: "consultas_pne", label: "Nº absoluto de consultas – PNE" },
    { key: "total_consultas_ceo", label: "Nº total de Consultas no CEO" },
    { key: "rx_odontologico", label: "Nº absoluto de RX odontológico – Transoperatorio" },
    { key: "consultas_odontopediatria", label: "Nº absoluto de Consultas de Odontopediatria" },
    { key: "procedimentos_odontopediatria", label: "Nº absoluto de Procedimentos de Odontopediatria" },
  ],
  "UPA Forquilhinha": [
    { key: "atendimentos_odontologicos", label: "Nº atendimentos odontológicos" },
  ],
};

export const DEFAULT_UNIDADE = "CEO Forquilhinha";