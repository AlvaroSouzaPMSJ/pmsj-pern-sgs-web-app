import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ROUTES } from "../../../app/routing/routes.constants";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

// CONSTANTS

const MESES = /** @type {const} */ ([
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
]);

/** Single source of truth for the PSE Strategic Indicators (Spreadsheet Rows 7-12). */
const INDICADORES_PSE = [
  {
    key: "acao_geral",
    label:
      "Percentual de escolas pactuadas que receberam no mínimo 1 ação do PSE",
  },
  {
    key: "atividade_fisica",
    label:
      "Percentual de escolas pactuadas ao PSE que receberam a ação prioritária de Promoção de Atividade Física",
  },
  {
    key: "alimentacao",
    label:
      "Percentual de escolas pactuadas ao PSE que receberam a ação prioritária de Alimentação saudável e prevenção da obesidade",
  },
  {
    key: "saude_ocular",
    label:
      "Percentual de escolas pactuadas ao PSE, que receberam ação de Saúde Ocular",
  },
  {
    key: "antropometria",
    label:
      "Percentual de escolas pactuadas ao PSE que receberam a ação prioritária de Antropometria",
  },
  {
    key: "verificacao",
    label:
      "Percentual de escolas pactuadas ao PSE que receberam a ação prioritária de Verificação e acompanhamento",
  },
];

const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const INDICADORES_ZERADOS = Object.fromEntries(
  INDICADORES_PSE.map(({ key }) => [key, 0]),
);

// ─── Schema ───────────────────────────────────────────────────────────────────

const indicadorShape = Object.fromEntries(
  INDICADORES_PSE.map(({ key }) => [
    key,
    z.coerce.number().min(0, "Minimo 0%").max(100, "Máximo 100%"),
  ]),
);

const pseSchema = z.object({
  mes: z.enum(MESES, { required_error: "Selecione o mês de referência" }),
  year: z.enum(YEAR_OPTIONS),
  indicadores: z.object(indicadorShape),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function mediaIndicadores(indicadores) {
  const values = Object.values(indicadores);
  if (values.length === 0) return 0;
  return values.reduce((acc, v) => acc + v, 0) / values.length;
}

function formatPct(value) {
  if (value === null || value === undefined) return "—";
  return (
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }) + "%"
  );
}

function buildPSE(values) {
  const media = mediaIndicadores(values.indicadores);
  return {
    ...values,
    id: crypto.randomUUID(),
    media: media,
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  year: "",
  mes: "",
  indicadores: { ...INDICADORES_ZERADOS },
};

function usePSEForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(pseSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const indicadores = useWatch({
    control: form.control,
    name: "indicadores",
  });

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return {
    form,
    handleSubmit,
    currentIndicadores: indicadores ?? INDICADORES_ZERADOS,
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

function IndicadoresGrid({ control, errors, media }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {INDICADORES_PSE.map(({ key, label }) => {
        const fieldError = errors.indicadores?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={`indicadores.${key}`}
              className="block text-sm font-semibold text-gray-700 leading-snug truncate mb-1"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`indicadores.${key}`}
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <input
                    {...field}
                    id={`indicadores.${key}`}
                    type="number"
                    min={0}
                    max={100}
                    step="0.1"
                    inputMode="decimal"
                    className={fieldCls(!!fieldError) + " text-center pr-8"}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                  <span className="absolute right-3 top-2 text-gray-400 text-sm">
                    %
                  </span>
                </div>
              )}
            />
          </div>
        );
      })}

      <div className="col-span-1 sm:col-span-2 mt-2">
        <MetricCard
          label="Média Geral de Atingimento do Mês"
          value={formatPct(media)}
          accent
        />
      </div>
    </div>
  );
}

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros Mensais do PSE
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-xs font-medium text-gray-400 py-2 pr-4 text-left whitespace-nowrap">
              Mês
            </th>
            {INDICADORES_PSE.map(({ key, label }) => (
              <th
                key={key}
                className="text-xs font-medium text-gray-400 py-2 px-2 text-center whitespace-nowrap truncate max-w-[80px] min-w-[60px]"
                title={label}
              >
                {label
                  .substring(0, 20)
                  .replace(
                    "Percentual de escolas pactuadas ao PSE que receberam a",
                    "",
                  )
                  .trim()}
                ...
              </th>
            ))}
            <th className="text-xs font-medium text-gray-400 py-2 pl-4 text-center whitespace-nowrap">
              Média
            </th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-500 font-medium whitespace-nowrap">
                {r.mes}
              </td>
              {INDICADORES_PSE.map(({ key }) => (
                <td
                  key={key}
                  className="py-2.5 px-2 text-center text-gray-700 tabular-nums"
                >
                  {formatPct(r.indicadores[key])}
                </td>
              ))}
              <td className="py-2.5 pl-4 text-center font-medium text-blue-600 tabular-nums">
                {formatPct(r.media)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PSEForm({ onSuccess }) {
  const { form, handleSubmit, currentIndicadores } = usePSEForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const media = mediaIndicadores(currentIndicadores);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação do Mês de Referência
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
            <FormField
              label="Ano de Referência"
              error={errors.year?.message}
              htmlFor="year"
            >
              <select
                id="year"
                {...register("year")}
                className={fieldCls(!!errors.year)}
              >
                <option value="">Selecione o ano</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>

        {/* ── Indicadores ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores Estratégicos do PSE
          </h2>
          <IndicadoresGrid control={control} errors={errors} media={media} />
        </div>

        {/* ── Actions ─────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset()}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PSEFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildPSE(data), ...prev]);
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
            Registro mensal de indicadores e ações prioritárias do Programa
            Saúde na Escola
          </p>
        </div>
      </section>
      {/* form-ends */}
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
            Indicadores do mês registrados com sucesso.
          </div>
        )}

        <PSEForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}