import { useState, useCallback, useMemo, useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

// ─── Constants ────────────────────────────────────────────────────────────────

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

const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const UNIDADES = /** @type {const} */ ([
  "CEO Forquilhinha",
  "CEO Barreiros",
  "UPA Forquilhinha",
]);

/** Single source of truth for all indicators across units. */
const INDICADORES_POR_UNIDADE = {
  "CEO Forquilhinha": [
    {
      key: "consultas_endodontia",
      label: "Nº absoluto de consultas de Endodontia realizados.",
    },
    {
      key: "procedimentos_endodontia",
      label: "Nº absoluto de procedimentos de Endodontia realizados.",
    },
    {
      key: "consultas_cirurgia_buco_maxilo",
      label: "Nº absoluto de consultas de Cirurgia Buco-Maxilo realizados.",
    },
    {
      key: "procedimentos_cirurgia_buco_maxilo",
      label: "Nº absoluto de procedimentos de Cirurgia Buco-Maxilo realizados.",
    },
    {
      key: "consultas_periodontia",
      label: "Nº absoluto de consultas de Periodontia realizados.",
    },
    {
      key: "procedimentos_periodontia",
      label: "Nº absoluto de procedimentos de Periodontia realizados.",
    },
    {
      key: "procedimentos_pne",
      label: "Nº absoluto de procedimentos realizados em PNE.",
    },
    {
      key: "consultas_pne",
      label: "Nº absoluto de consultas realizadas em PNE.",
    },
    {
      key: "consultas_ceo",
      label: "Nº absoluto de Consultas no CEO realizados.",
    },
    {
      key: "rx_odontologico",
      label: "Nº absoluto de RX odontológico – Transoperatorio realizados.",
    },
    {
      key: "consultas_odontopediatria",
      label:
        "Nº absoluto de Consultas de Odontopediatria (serviço transferido CEO Barreiros).",
    },
    {
      key: "procedimentos_odontopediatria",
      label:
        "Nº absoluto de Procedimentos de Odontopediatria (serviço transferido CEO Barreiros).",
    },
  ],
  "CEO Barreiros": [
    {
      key: "consultas_endodontia",
      label: "Nº absoluto de consultas de Endodontia",
    },
    {
      key: "procedimentos_endodontia",
      label: "Nº absoluto de procedimentos de Endodontia",
    },
    {
      key: "consultas_cirurgia_buco_maxilo",
      label: "Nº absoluto de consultas de Cirurgia Buco-Maxilo",
    },
    {
      key: "procedimentos_cirurgia_buco_maxilo",
      label: "Nº absoluto de procedimentos de Cirurgia Buco-Maxilo",
    },
    {
      key: "consultas_periodontia",
      label: "Nº absoluto de consultas de Periodontia",
    },
    {
      key: "procedimentos_periodontia",
      label: "Nº absoluto de procedimentos de Periodontia",
    },
    {
      key: "procedimentos_pne",
      label: "Nº absoluto de procedimentos realizados – PNE",
    },
    { key: "consultas_pne", label: "Nº absoluto de consultas – PNE" },
    { key: "total_consultas_ceo", label: "Nº total de Consultas no CEO" },
    {
      key: "rx_odontologico",
      label: "Nº absoluto de RX odontológico – Transoperatorio",
    },
    {
      key: "consultas_odontopediatria",
      label: "Nº absoluto de Consultas de Odontopediatria",
    },
    {
      key: "procedimentos_odontopediatria",
      label: "Nº absoluto de Procedimentos de Odontopediatria",
    },
  ],
  "UPA Forquilhinha": [
    {
      key: "atendimentos_odontologicos",
      label: "Nº atendimentos odontológicos",
    },
  ],
};

// Helper functions
function getIndicatorKeys(unit) {
  return (INDICADORES_POR_UNIDADE[unit] || []).map((i) => i.key);
}

// ─── Utils ────────────────────────────────────────────────────────────────────

function totalIndicadores(indicators) {
  return Object.values(indicators || {}).reduce((acc, v) => acc + (v || 0), 0);
}

function buildRegistro(values, unit) {
  const total = totalIndicadores(values.indicators);
  return {
    ...values,
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36),
    unit: unit,
    total: total,
    criadoEm: new Date().toISOString(),
  };
}

// ─── Schema & Hook ────────────────────────────────────────────────────────────

function buildIndicatorSchema(unit) {
  const keys = getIndicatorKeys(unit);
  const shape = {};
  keys.forEach((key) => {
    shape[key] = z.coerce.number().int().min(0).default(0);
  });
  return z.object(shape);
}

function useSaudeBucalForm(unit, onSuccess) {
  // Dynamically build schema based on selected unit
  const schema = useMemo(() => {
    return z.object({
      month: z.enum(MESES, { required_error: "Selecione um mês" }),
      indicators: buildIndicatorSchema(unit),
    });
  }, [unit]);

  // Build default values
  const defaultValues = useMemo(() => {
    const ind = {};
    getIndicatorKeys(unit).forEach((key) => {
      ind[key] = 0;
    });
    return { month: "", indicators: ind };
  }, [unit]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  // Watch for changes to compute total
  const indicators = useWatch({ control, name: "indicators" });
  const total = totalIndicadores(indicators);

  const onSubmit = handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        const newInd = {};
        getIndicatorKeys(unit).forEach((key) => {
          newInd[key] = 0;
        });
        reset({ month: "", indicators: newInd });
      },
      [onSuccess, reset, unit],
    ),
  );

  return { form, onSubmit, total, control, errors, isSubmitting, reset };
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

function IndicadoresGrid({ unit, control, errors }) {
  const indicators = INDICADORES_POR_UNIDADE[unit] || [];

  if (!indicators.length) {
    return (
      <p className="text-sm text-gray-400 italic">
        Nenhum indicador cadastrado para esta unidade.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {indicators.map(({ key, label }) => {
        const fieldError = errors.indicators?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={`indicators.${key}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`indicators.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`indicators.${key}`}
                  type="number"
                  min={0}
                  inputMode="numeric"
                  className={fieldCls(!!fieldError) + " text-center"}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  // Gather all unique indicator keys from existing records for dynamic table columns
  const allKeys = [];
  const seen = new Set();
  for (const r of registros) {
    for (const k of Object.keys(r.indicators || {})) {
      if (!seen.has(k)) {
        seen.add(k);
        allKeys.push(k);
      }
    }
  }

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap">
              Unidade
            </th>
            <th className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap">
              Mês
            </th>
            {allKeys.map((k) => (
              <th
                key={k}
                className="text-left text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap"
                title={k}
              >
                {k.replace(/_/g, " ")}
              </th>
            ))}
            <th className="text-right text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap">
              Total
            </th>
            <th className="text-right text-xs font-medium text-gray-400 py-2 whitespace-nowrap">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 pr-4 text-gray-700 whitespace-nowrap font-medium">
                {r.unit}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.month}
              </td>
              {allKeys.map((k) => (
                <td key={k} className="py-2.5 pr-4 text-gray-600 tabular-nums">
                  {r.indicators?.[k] ?? 0}
                </td>
              ))}
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.total}
              </td>
              <td className="py-2.5 text-right">
                {/* Remover button would require a callback from parent. Added visually to match example */}
                <span className="text-red-400 text-xs font-medium">
                  Remover
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Form ─────────────────────────────────────────────────────────────────

function SaudeBucalForm({ unit, onSuccess }) {
  const { form, onSubmit, total, control, errors, isSubmitting, reset } =
    useSaudeBucalForm(unit, onSuccess);
  const { register } = form;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores de Saúde Bucal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            <FormField
              label="Selecionar Unidade"
              error={errors.month?.message}
              htmlFor="month"
            >
            </FormField>
            <div className="mb-6">
              <label
                htmlFor="select-unit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Selecionar Unidade
              </label>
              <select
                id="select-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full  rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-colors"
              >
                {UNIDADES.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            <FormField
              label="Mês de Referência"
              error={errors.month?.message}
              htmlFor="month"
            >
              <select
                id="month"
                {...register("month")}
                className={fieldCls(!!errors.month)}
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
              label="Ano"
              error={errors.currentYear?.message}
              htmlFor="currentYear"
            >
              <select
                id="currentYear"
                {...register("currentYear")}
                className={fieldCls(!!errors.currentYear)}
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Procedimentos e Consultas
          </h2>
          <IndicadoresGrid unit={unit} control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard label="Total de indicadores" value={String(total)} />
            <MetricCard label="Unidade" value={unit.split(" ")[0]} accent />
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
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
            Registrar indicadores
          </button>
        </div>
      </div>
    </form>
  );
}

// PAGE

export default function SBCFormUI() {
  const [unit, setUnit] = useState("CEO Forquilhinha");
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback(
    (data) => {
      setRegistros((prev) => [buildRegistro(data, unit), ...prev]);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    },
    [unit],
  );

  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />

      {/* Page Title */}
      <section className="px-8 py-6">
        <div className="border-b border-gray-300 pb-4">
          <h2 className="text-3xl font-bold text-gray-900 mt-8">
            Saúde Bucal CEOs - Formulário de Entrada de Dados
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Registro mensal de indicadores por unidade de saúde bucal
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-8 pb-10 space-y-6">
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

        <SaudeBucalForm key={unit} unit={unit} onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <div>
        <Footer />
      </div>
      {/* footer-ends */}
    </main>
  );
}