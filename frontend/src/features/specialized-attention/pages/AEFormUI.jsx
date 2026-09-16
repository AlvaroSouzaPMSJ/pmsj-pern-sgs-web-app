import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ROUTES } from "../../../app/routing/routes.constants";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

// CONSTANTS

const MESES = /** @type {const} */ ([
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
]);

/** Blocos = the three bounded sub-areas inside the single Atenção Especializada context. */
const BLOCOS = /** @type {const} */ ([
  { key: "upa", label: "UPA" },
  { key: "samu", label: "SAMU" },
  { key: "saudeMental", label: "Saúde Mental · CAPS" },
]);

const BLOCO_KEYS = BLOCOS.map((b) => b.key);

const TIPO = /** @type {const} */ ({
  NUMERO: "numero", // inteiro absoluto (contagem)
  PROPORCAO: "proporcao", // percentual 0–100
  TEMPO: "tempo", // minutos (Number)
});

const UNIDADE = {
  [TIPO.NUMERO]: "",
  [TIPO.PROPORCAO]: "%",
  [TIPO.TEMPO]: "min",
};

const INDICADORES = [
  // ── UPA (8) ────────────────────────────────────────────────────────────────
  {
    bloco: "upa",
    chave: "upaNumeroAtendimentos",
    label: "Número de atendimentos na UPA",
    tipo: TIPO.NUMERO,
  },
  {
    bloco: "upa",
    chave: "upaPropPediatricos",
    label: "Proporção de atendimentos pediátricos",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "upa",
    chave: "upaPropPortaria",
    label: "Proporção de atendimentos da UPA conforme Portaria Ministerial",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "upa",
    chave: "upaTempoVermelho",
    label: "Tempo médio de espera — risco Vermelho",
    tipo: TIPO.TEMPO,
    parametro: "Imediato",
    meta: { operador: "<=", valor: 0 },
  },
  {
    bloco: "upa",
    chave: "upaTempoLaranja",
    label: "Tempo médio de espera — risco Laranja",
    tipo: TIPO.TEMPO,
    parametro: "60'",
    meta: { operador: "<=", valor: 60 },
  },
  {
    bloco: "upa",
    chave: "upaTempoVerde",
    label: "Tempo médio de espera — risco Verde",
    tipo: TIPO.TEMPO,
    parametro: "120'",
    meta: { operador: "<=", valor: 120 },
  },
  {
    bloco: "upa",
    chave: "upaTempoAzul",
    label: "Tempo médio de espera — risco Azul",
    tipo: TIPO.TEMPO,
    parametro: "240'",
    meta: { operador: "<=", valor: 240 },
  },
  {
    bloco: "upa",
    chave: "upaTempoAmarelo",
    label: "Tempo médio de espera — risco Amarelo",
    tipo: TIPO.TEMPO,
  },

  // ── SAMU (2) ───────────────────────────────────────────────────────────────
  {
    bloco: "samu",
    chave: "samuNumeroAtendimentosSBV",
    label:
      "Número absoluto de atendimentos da unidade de Suporte Básico de Vida",
    tipo: TIPO.NUMERO,
  },
  {
    bloco: "samu",
    chave: "samuPropApoioSAV",
    label:
      "Proporção de atendimentos do SBV que solicitaram apoio do suporte avançado",
    tipo: TIPO.PROPORCAO,
  },

  // ── Saúde Mental · CAPS (16) ─────────────────────────────────────────────────
  {
    bloco: "saudeMental",
    chave: "smNumInternacoesJudiciais",
    label: "Número absoluto de internações judiciais (longa permanência)",
    tipo: TIPO.NUMERO,
  },
  {
    bloco: "saudeMental",
    chave: "smNumInternadosLongaPermanenciaMes",
    label: "Número de pacientes internados de longa permanência no mês",
    tipo: TIPO.NUMERO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropInternacoesJudiciaisInfantil",
    label: "Proporção de internações judiciais — Infantil",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropInternacoesJudiciaisAdulto",
    label: "Proporção de internações judiciais — Adulto",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropInternacoesJudiciaisAlcoolDroga",
    label: "Proporção de internações judiciais — Álcool e droga",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropInternacaoJudicialAcompCAPS",
    label:
      "Proporção de internações judiciais de longa permanência em acompanhamento no CAPS",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smNumAtendimentosCAPSII",
    label: "Número total de atendimentos realizados no CAPS II",
    tipo: TIPO.NUMERO,
  },
  {
    bloco: "saudeMental",
    chave: "smNumAtendimentosCAPSInfantil",
    label: "Número absoluto de atendimentos realizados no CAPS Infantil",
    tipo: TIPO.NUMERO,
  },
  {
    bloco: "saudeMental",
    chave: "smNumAtendimentosCAPSAD",
    label: "Número absoluto de atendimentos realizados no CAPS AD",
    tipo: TIPO.NUMERO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropAtendIndivPsiquiatra",
    label: "Proporção de atendimentos individuais — médico psiquiatra",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropAtendIndivPsicologo",
    label: "Proporção de atendimentos individuais — psicólogo",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropAtendIndivEnfermeiro",
    label: "Proporção de atendimentos individuais — enfermeiro",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropAtendColetivoCAPSII",
    label: "Proporção de atendimentos coletivos — CAPS II",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropAtendColetivoCAPSInfantil",
    label: "Proporção de atendimentos coletivos — CAPS Infantil",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smPropAtendColetivoCAPSAD",
    label: "Proporção de atendimentos coletivos — CAPS AD",
    tipo: TIPO.PROPORCAO,
  },
  {
    bloco: "saudeMental",
    chave: "smNumMatriciamento",
    label:
      "Ações de matriciamento sistemático realizadas pelo CAPS com equipes da Atenção Básica",
    tipo: TIPO.NUMERO,
  },
];

const ANO_ATUAL = new Date().getFullYear();

// ─── Catalog selectors (single source of truth, no duplication) ─────────────────

const indicadoresDoBloco = (blocoKey) =>
  INDICADORES.filter((i) => i.bloco === blocoKey);

const seedValores = (blocoKey) =>
  Object.fromEntries(indicadoresDoBloco(blocoKey).map((i) => [i.chave, ""]));

// ─── Schema (built dynamically from the catalog) ────────────────────────────────

const aeSchema = z
  .object({
    bloco: z.enum(BLOCO_KEYS, {
      errorMap: () => ({ message: "Selecione o bloco" }),
    }),
    ano: z.coerce
      .number()
      .int()
      .min(2000, "Ano inválido")
      .max(2100, "Ano inválido"),
    mes: z.enum(MESES, { errorMap: () => ({ message: "Selecione o mês" }) }),
    // valores kept as strings in form state; coerced + range-checked per indicator below.
    valores: z.record(z.string(), z.string()),
  })
  .superRefine((data, ctx) => {
    for (const ind of indicadoresDoBloco(data.bloco)) {
      const raw = data.valores?.[ind.chave];
      const path = ["valores", ind.chave];

      if (raw === undefined || raw === "") {
        ctx.addIssue({
          path,
          code: z.ZodIssueCode.custom,
          message: "Obrigatório",
        });
        continue;
      }
      const n = Number(raw);
      if (Number.isNaN(n)) {
        ctx.addIssue({
          path,
          code: z.ZodIssueCode.custom,
          message: "Valor numérico inválido",
        });
        continue;
      }
      if (n < 0) {
        ctx.addIssue({
          path,
          code: z.ZodIssueCode.custom,
          message: "Não pode ser negativo",
        });
      }
      if (ind.tipo === TIPO.NUMERO && !Number.isInteger(n)) {
        ctx.addIssue({
          path,
          code: z.ZodIssueCode.custom,
          message: "Use um número inteiro",
        });
      }
      if (ind.tipo === TIPO.PROPORCAO && n > 100) {
        ctx.addIssue({
          path,
          code: z.ZodIssueCode.custom,
          message: "Máximo 100%",
        });
      }
    }
  });

// ─── Utils ────────────────────────────────────────────────────────────────────

function isPreenchido(v) {
  return v !== undefined && v !== "";
}

function meetsMeta(valor, meta) {
  switch (meta.operador) {
    case "<=":
      return valor <= meta.valor;
    case ">=":
      return valor >= meta.valor;
    case "=":
      return valor === meta.valor;
    default:
      return false;
  }
}

function computeMetrics(inds, valores) {
  const v = valores ?? {};
  const preenchidos = inds.filter((i) => isPreenchido(v[i.chave])).length;

  const comMeta = inds.filter((i) => i.meta && isPreenchido(v[i.chave]));
  const conformes = comMeta.filter((i) =>
    meetsMeta(Number(v[i.chave]), i.meta),
  ).length;
  const conformidade = comMeta.length
    ? Math.round((conformes / comMeta.length) * 10000) / 100
    : null;

  return { preenchidos, totalInd: inds.length, conformidade };
}

function formatPct(value) {
  if (value === null || value === undefined) return "—";
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + "%"
  );
}

function formToDocument(values) {
  const inds = indicadoresDoBloco(values.bloco);
  return {
    bloco: values.bloco,
    competencia: { ano: Number(values.ano), mes: values.mes },
    indicadores: inds.map((i) => ({
      chave: i.chave,
      valor: Number(values.valores[i.chave]),
    })),
  };
}

/** Session-only view record (UI list); does not touch the persisted shape. */
function buildRegistro(values) {
  const inds = indicadoresDoBloco(values.bloco);
  const { preenchidos, totalInd, conformidade } = computeMetrics(
    inds,
    values.valores,
  );
  return {
    id: crypto.randomUUID(),
    blocoLabel:
      BLOCOS.find((b) => b.key === values.bloco)?.label ?? values.bloco,
    competencia: `${values.mes}/${values.ano}`,
    preenchidos,
    totalInd,
    conformidade,
    documento: formToDocument(values),
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  bloco: "",
  ano: ANO_ATUAL,
  mes: "",
  valores: {},
};

function useAEForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(aeSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const bloco = useWatch({ control: form.control, name: "bloco" });
  const valores = useWatch({ control: form.control, name: "valores" });

  const inds = useMemo(() => indicadoresDoBloco(bloco), [bloco]);

  // Reset the value map whenever the bloco changes — prevents cross-bloco leakage
  // into the persisted document and keeps the active key-set authoritative.
  const prevBloco = useRef(bloco);
  useEffect(() => {
    if (prevBloco.current !== bloco) {
      form.setValue("valores", seedValores(bloco), { shouldValidate: false });
      prevBloco.current = bloco;
    }
  }, [bloco, form]);

  const { preenchidos, totalInd, conformidade } = useMemo(
    () => computeMetrics(inds, valores),
    [inds, valores],
  );

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(buildRegistro(data));
        form.reset(DEFAULT_VALUES);
        prevBloco.current = "";
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, inds, preenchidos, totalInd, conformidade };
}

// ─── Shared sub-components (inlined) ────────────────────────────────────────────

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

// ─── Feature components ─────────────────────────────────────────────────────────

function BlocoSelect({ register, error }) {
  return (
    <FormField label="Bloco" error={error} htmlFor="bloco">
      <select id="bloco" {...register("bloco")} className={fieldCls(!!error)}>
        <option value="">Selecione o bloco</option>
        {BLOCOS.map((b) => (
          <option key={b.key} value={b.key}>
            {b.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

function IndicadorRow({ ind, register, error }) {
  const unidade = UNIDADE[ind.tipo];
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-3">
      <div className="flex-1 min-w-0">
        <label
          htmlFor={`valores.${ind.chave}`}
          className="block text-sm text-gray-700"
        >
          {ind.label}
        </label>
        {ind.parametro && (
          <p className="text-xs text-gray-400 mt-0.5">
            Parâmetro padronizado: {ind.parametro}
          </p>
        )}
        {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <input
          id={`valores.${ind.chave}`}
          type="number"
          min={0}
          step={ind.tipo === TIPO.PROPORCAO ? "0.01" : "1"}
          inputMode={ind.tipo === TIPO.PROPORCAO ? "decimal" : "numeric"}
          aria-label={ind.label}
          placeholder="0"
          {...register(`valores.${ind.chave}`)}
          className={fieldCls(!!error) + " w-28 text-center"}
        />
        {unidade && (
          <span className="text-xs text-gray-400 w-8 shrink-0">{unidade}</span>
        )}
      </div>
    </div>
  );
}

function IndicadorGrid({ inds, register, errors }) {
  if (inds.length === 0) {
    return (
      <p className="text-sm text-gray-400 italic">
        Selecione um bloco para carregar os indicadores correspondentes.
      </p>
    );
  }
  return (
    <div className="divide-y divide-gray-100">
      {inds.map((ind) => (
        <IndicadorRow
          key={ind.chave}
          ind={ind}
          register={register}
          error={errors.valores?.[ind.chave]?.message}
        />
      ))}
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
            {[
              "Bloco",
              "Competência",
              "Preenchidos",
              "Conformidade (metas)",
            ].map((h, i) => (
              <th
                key={h}
                className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                  i >= 2 ? "text-right" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-800 whitespace-nowrap">
                {r.blocoLabel}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.competencia}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.preenchidos}/{r.totalInd}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.conformidade === null
                      ? "bg-gray-100 text-gray-400"
                      : r.conformidade >= 80
                        ? "bg-green-100 text-green-700"
                        : r.conformidade >= 50
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-600"
                  }`}
                >
                  {formatPct(r.conformidade)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AtencaoEspecializadaForm({ onSuccess }) {
  const { form, handleSubmit, inds, preenchidos, totalInd, conformidade } =
    useAEForm(onSuccess);
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação da Competência
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlocoSelect register={register} error={errors.bloco?.message} />

            <FormField
              label="Mês de Referência"
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
              <input
                id="ano"
                type="number"
                min={2000}
                max={2100}
                {...register("ano")}
                className={fieldCls(!!errors.ano) + " text-center"}
              />
            </FormField>
          </div>
        </div>

        {/* ── Indicadores ─────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores do Bloco
          </h2>
          <IndicadorGrid inds={inds} register={register} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard
              label="Indicadores preenchidos"
              value={totalInd ? `${preenchidos}/${totalInd}` : "—"}
            />
            <MetricCard
              label="Conformidade (metas)"
              value={formatPct(conformidade)}
              accent
            />
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset(DEFAULT_VALUES)}
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
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}

// PAGE

export default function AEFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((registro) => {
    setRegistros((prev) => [registro, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />

      {/* page-title-starts */}
      <section className="px-10 py-12">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro mensal de indicadores — UPA, SAMU e Saúde Mental · CAPS
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
            Indicadores registrados com sucesso.
          </div>
        )}

        <AtencaoEspecializadaForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
    </main>
  );
}