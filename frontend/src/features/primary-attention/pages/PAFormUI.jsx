import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

// Constants

const MESES = [
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

const ANOS = /** @type {const} */ ([2025, 2026]);

const BLOCOS = /** @type {const} */ ([
  { key: "consultas", label: "Consultas" },
  { key: "maternoInfantil", label: "Avaliação Materno Infantil" },
]);

/**
 * Catálogo de indicadores DE ENTRADA (persistidos), por bloco.
 * tipo: "contagem"   → inteiro ≥ 0
 *       "percentual" → decimal 0–100 (valores importados de fontes externas)
 * Adicionar um indicador = editar somente este catálogo (schema é dinâmico).
 */
const INDICADORES = {
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

/**
 * Indicadores DERIVADOS — display-only. Nunca persistidos (recomputados
 * pelo mapper de analytics no backend a partir dos inputs acima).
 * formato: "percentual" → ×100 com sufixo %; "razao" → quociente puro.
 */
const DERIVADOS = {
  consultas: [],
  maternoInfantil: [
    {
      key: "proporcaoPnPrimeiroTrimestre",
      label: "Proporção de gestantes com PN iniciado no 1º trimestre",
      formato: "percentual",
      calc: (v) =>
        razao(v.gestantesInicioPnPrimeiroTrimestre, v.gestantesCadastradas),
    },
    {
      key: "razaoCitopatologico",
      label: "Razão de exames citopatológicos (25–64 anos)",
      formato: "razao",
      calc: (v) =>
        razao(v.citopatologicos25a64, v.populacaoFeminina25a64Dividido3),
    },
    {
      key: "razaoMamografia",
      label: "Razão de mamografias de rastreamento (50–69 anos)",
      formato: "razao",
      calc: (v) => razao(v.mamografias50a69, v.populacaoFeminina50a69Dividido2),
    },
    {
      key: "proporcaoCriancasSisvan",
      label: "Proporção de crianças < 5 anos acompanhadas no SISVAN",
      formato: "percentual",
      calc: (v) =>
        razao(
          v.criancasMenores5SisvanAcompanhadas,
          v.criancasMenores5CadastradasEsus,
        ),
    },
    {
      key: "razaoUsgPorGestante",
      label: "Razão de USG obstétrica por gestante cadastrada",
      formato: "razao",
      calc: (v) => razao(v.usgObstetrica, v.gestantesCadastradas),
    },
  ],
};

// ─── Schema ───────────────────────────────────────────────────────────────────

/** Blank ≠ 0: "", null, undefined, NaN → null. Nunca coagir vazio para 0. */
function numeroNulo(inteiro) {
  const base = inteiro ? z.number().int() : z.number();
  return z.preprocess((v) => {
    if (v === "" || v === null || v === undefined) return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
  }, base.min(0, "Valor não pode ser negativo").nullable());
}

function buildValoresShape(blocoKey) {
  return z.object(
    Object.fromEntries(
      INDICADORES[blocoKey].map(({ key, tipo }) => [
        key,
        numeroNulo(tipo === "contagem"),
      ]),
    ),
  );
}

const documentoSchema = z.discriminatedUnion("bloco", [
  z.object({
    bloco: z.literal("consultas"),
    mes: z.enum(MESES, { message: "Selecione o mês de competência" }),
    ano: z.coerce.number().int(),
    valores: buildValoresShape("consultas"),
  }),
  z.object({
    bloco: z.literal("maternoInfantil"),
    mes: z.enum(MESES, { message: "Selecione o mês de competência" }),
    ano: z.coerce.number().int(),
    valores: buildValoresShape("maternoInfantil"),
  }),
]);

// ─── Utils ────────────────────────────────────────────────────────────────────

/** Null-safe: qualquer operando null (dado ainda não disponível) → null. */
function razao(numerador, denominador) {
  if (numerador === null || numerador === undefined) return null;
  if (!denominador) return null; // null, undefined ou 0 (divisão inválida)
  return numerador / denominador;
}

function formatPct(fracao) {
  if (fracao === null) return "—";
  return (
    (fracao * 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}

function formatRazao(valor) {
  if (valor === null) return "—";
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function seedValores(blocoKey) {
  return Object.fromEntries(
    INDICADORES[blocoKey].map(({ key }) => [key, null]),
  );
}

function contarPreenchidos(valores) {
  return Object.values(valores ?? {}).filter(
    (v) => v !== null && v !== undefined && v !== "",
  ).length;
}

/**
 * DTO firewall (OWASP API3:2023). Whitelist explícita: somente as chaves do
 * catálogo do bloco corrente entram em `valores`. Derivados, meta, parametro
 * e fonte nunca são persistidos.
 */
function buildDocumento(values) {
  const catalogo = INDICADORES[values.bloco];
  const valores = Object.fromEntries(
    catalogo.map(({ key }) => [key, values.valores?.[key] ?? null]),
  );
  return {
    id: crypto.randomUUID(),
    bloco: values.bloco,
    competencia: { mes: values.mes, ano: values.ano },
    valores,
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  bloco: "consultas",
  mes: "",
  ano: 2026,
  valores: seedValores("consultas"),
};

function useAreasEstrategicasForm({ onSuccess, isDuplicado }) {
  const [erroDuplicado, setErroDuplicado] = useState(null);

  const form = useForm({
    resolver: zodResolver(documentoSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const bloco = useWatch({ control: form.control, name: "bloco" });
  const valores = useWatch({ control: form.control, name: "valores" });

  // Troca de bloco → re-seed completo de `valores` (evita vazamento
  // de dados entre blocos no payload).
  useEffect(() => {
    form.setValue("valores", seedValores(bloco), {
      shouldValidate: false,
      shouldDirty: false,
    });
    setErroDuplicado(null);
  }, [bloco, form]);

  const preenchidos = contarPreenchidos(valores);
  const totalIndicadores = INDICADORES[bloco].length;

  const derivados = useMemo(
    () =>
      DERIVADOS[bloco].map((d) => ({
        ...d,
        valor: d.calc(valores ?? {}),
      })),
    [bloco, valores],
  );

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        // Duplicate guard client-side — espelha o índice único composto
        // (bloco, competencia.mes, competencia.ano) do model Mongoose.
        if (isDuplicado(data.bloco, data.mes, data.ano)) {
          setErroDuplicado(
            `Já existe um registro de "${BLOCOS.find((b) => b.key === data.bloco).label}" para a competência ${data.mes}/${data.ano} nesta sessão.`,
          );
          return;
        }
        setErroDuplicado(null);
        onSuccess(data);
        form.reset({
          ...DEFAULT_VALUES,
          bloco: data.bloco,
          ano: data.ano,
          valores: seedValores(data.bloco),
        });
      },
      [form, onSuccess, isDuplicado],
    ),
  );

  return {
    form,
    handleSubmit,
    bloco,
    preenchidos,
    totalIndicadores,
    derivados,
    erroDuplicado,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormField({ label, error, children, htmlFor }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function fieldCls(hasError) {
  return [
    "w-full rounded-md border px-3 py-2 text-sm text-gray-900",
    "placeholder:text-gray-400 bg-white",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400",
    "transition-colors duration-150",
    hasError
      ? "border-red-300 focus:ring-red-500/30 focus:border-red-400"
      : "border-gray-300",
  ].join(" ");
}

function MetricCard({ label, value, accent = false }) {
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p
        className={`text-2xl font-semibold tabular-nums ${accent ? "text-blue-600" : "text-gray-800"}`}
      >
        {value}
      </p>
    </div>
  );
}

function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="rounded-lg bg-red-50 border border-red-200 px-4 py-3
                 text-sm font-medium text-red-700"
    >
      {message}
    </div>
  );
}

/** Grid de indicadores do bloco. null ↔ "" no input; nunca 0 por default. */
function IndicadoresGrid({ blocoKey, control, errors }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {INDICADORES[blocoKey].map(({ key, label, tipo }) => {
        const fieldError = errors.valores?.[key];
        const inputId = `valores.${key}`;
        return (
          <div key={key}>
            <label
              htmlFor={inputId}
              className="block text-xs font-medium text-gray-500 mb-1"
            >
              {label}
            </label>
            <Controller
              name={`valores.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={inputId}
                  type="number"
                  min={0}
                  step={tipo === "percentual" ? "0.01" : "1"}
                  inputMode={tipo === "percentual" ? "decimal" : "numeric"}
                  placeholder="—"
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? null : e.target.value,
                    )
                  }
                  className={fieldCls(!!fieldError) + " text-center"}
                />
              )}
            />
            {fieldError && (
              <p className="text-xs text-red-500 mt-1">{fieldError.message}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/** Derivados: read-only, nunca persistidos. */
function DerivadosGrid({ derivados }) {
  if (derivados.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Indicadores calculados
      </h2>
      <p className="text-xs text-gray-400 mb-6">
        Calculados automaticamente a partir dos valores informados — não são
        persistidos e serão recomputados nas análises.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {derivados.map(({ key, label, valor, formato }) => (
          <MetricCard
            key={key}
            label={label}
            value={
              formato === "percentual" ? formatPct(valor) : formatRazao(valor)
            }
            accent
          />
        ))}
      </div>
    </div>
  );
}

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Bloco", "Competência", "Preenchidos", "Registrado em"].map(
              (h, i) => (
                <th
                  key={h}
                  className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                    i >= 2 ? "text-right" : "text-left"
                  }`}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => {
            const total = INDICADORES[r.bloco].length;
            const preenchidos = contarPreenchidos(r.valores);
            return (
              <tr
                key={r.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-2.5 pr-4 text-gray-800 whitespace-nowrap">
                  {BLOCOS.find((b) => b.key === r.bloco)?.label}
                </td>
                <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                  {r.competencia.mes}/{r.competencia.ano}
                </td>
                <td className="py-2.5 pr-4 text-right tabular-nums">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                      preenchidos === total
                        ? "bg-green-100 text-green-700"
                        : preenchidos > 0
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {preenchidos}/{total}
                  </span>
                </td>
                <td className="py-2.5 text-right text-gray-500 whitespace-nowrap tabular-nums">
                  {new Date(r.criadoEm).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AreasEstrategicasForm({ onSuccess, isDuplicado }) {
  const {
    form,
    handleSubmit,
    bloco,
    preenchidos,
    totalIndicadores,
    derivados,
    erroDuplicado,
  } = useAreasEstrategicasForm({ onSuccess, isDuplicado });

  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Competência ─────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação da Competência
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              label="Bloco"
              error={errors.bloco?.message}
              htmlFor="bloco"
            >
              <select
                id="bloco"
                {...register("bloco")}
                className={fieldCls(!!errors.bloco)}
              >
                {BLOCOS.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Mês de Competência"
              error={errors.mes?.message}
              htmlFor="mes"
            >
              <select
                id="mes"
                {...register("mes")}
                className={fieldCls(!!errors.mes)}
              >
                <option value="">Selecione o mês</option>
                {MESES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Ano" error={errors.ano?.message} htmlFor="ano">
              <select
                id="ano"
                {...register("ano")}
                className={fieldCls(!!errors.ano)}
              >
                {ANOS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* ── Indicadores ─────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {BLOCOS.find((b) => b.key === bloco)?.label}
          </h2>
          <p className="text-xs text-gray-400 mb-6">
            Deixe em branco os indicadores sem dado disponível — campo vazio é
            registrado como “sem informação”, não como zero.
          </p>

          <IndicadoresGrid blocoKey={bloco} control={control} errors={errors} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            <MetricCard
              label="Indicadores preenchidos"
              value={`${preenchidos}/${totalIndicadores}`}
            />
            <MetricCard
              label="Competência"
              value={`${useWatch({ control, name: "mes" }) || "—"} / ${useWatch({ control, name: "ano" })}`}
              accent
            />
          </div>
        </div>

        {/* ── Derivados (display-only) ────────────────────────── */}
        <DerivadosGrid derivados={derivados} />

        {/* ── Feedback ────────────────────────────────────────── */}
        <ErrorBanner message={erroDuplicado} />

        {/* ── Actions ─────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() =>
              form.reset({
                ...DEFAULT_VALUES,
                bloco,
                valores: seedValores(bloco),
              })
            }
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5
                       text-sm font-medium text-gray-600
                       hover:bg-gray-50 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-gray-300
                       transition-all duration-150 cursor-pointer"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5
                       text-sm font-medium text-white
                       hover:bg-blue-700 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40
                       transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Registrar competência
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PAFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const isDuplicado = useCallback(
    (bloco, mes, ano) =>
      registros.some(
        (r) =>
          r.bloco === bloco &&
          r.competencia.mes === mes &&
          r.competencia.ano === Number(ano),
      ),
    [registros],
  );

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildDocumento(data), ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />

      {/* page-title-starts */}
      <section className="px-10 py-10">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Consultas e Avaliação Materno Infantil — áreas estratégicas da
            Atenção Primária
          </p>
        </div>
      </section>

      {/* form-starts */}
      <section className="px-10 pb-10 space-y-6">
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg bg-green-50 border border-green-200 px-4 py-3
                       text-sm font-medium text-green-700 flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="8"
                cy="8"
                r="7.5"
                stroke="currentColor"
                strokeOpacity=".4"
              />
              <path
                d="M4.5 8.5L7 11L11.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Competência registrada com sucesso.
          </div>
        )}

        <AreasEstrategicasForm
          onSuccess={handleSuccess}
          isDuplicado={isDuplicado}
        />
        <RegistrosList registros={registros} />
      </section>
      {/* form-ends */}

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}
