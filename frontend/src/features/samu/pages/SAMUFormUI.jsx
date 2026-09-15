import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ROUTES } from "../../../app/routing/routes.constants";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

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

const UNIDADES_ATENDIMENTO = [
  {
    key: "bravo4",
    label:
      "Número de atendimentos realizados pela Unidade de suporte básico de vida (BRAVO 4).",
    short: "BRAVO 4",
  },
  {
    key: "bravo5",
    label:
      "Número de atendimentos realizados pela Unidade de Suporte Básico de Vida (BRAVO 5).",
    short: "BRAVO 5",
  },
  {
    key: "bravo16",
    label:
      "Número de atendimentos realizados pela Unidade de Suporte Básico de Vida (BRAVO 16).",
    short: "BRAVO 16",
  },
  {
    key: "upaForquilhinhas",
    label: "Número de atendimentos encaminhados para UPA Forquilhinhas.",
    short: "UPA Forquilhinhas",
  },
  {
    key: "hrsj",
    label: "Número de atendimentos encaminhados para HRSJ.",
    short: "HRSJ",
  },
  {
    key: "hf",
    label: "Número de atendimentos encaminhados para HF.",
    short: "HF",
  },
  {
    key: "hgcr",
    label: "Número de atendimentos encaminhados para HGCR.",
    short: "HGCR",
  },
  {
    key: "hu",
    label: "Número de atendimentos encaminhados para HU.",
    short: "HU",
  },
  {
    key: "ipq",
    label: "Número de atendimentos encaminhados para IPQ.",
    short: "IPQ",
  },
  {
    key: "upaBiguaçu",
    label: "Número de atendimentos encaminhados para UPA Biguaçu.",
    short: "UPA Biguaçu",
  },
  {
    key: "upaFlorianopolis",
    label: "Número de atendimentos encaminhados para UPA Florianópolis.",
    short: "UPA Florianópolis",
  },
  {
    key: "upaPalhoca",
    label: "Número de atendimentos encaminhados para UPA Palhoça.",
    short: "UPA Palhoça",
  },
  {
    key: "hospitalInfantil",
    label: "Número de atendimentos encaminhados para Hospital Infantil",
    short: "Hosp. Infantil",
  },
  {
    key: "hospitalCepon",
    label: "Número de atendimentos encaminhados para Hospital CEPON",
    short: "Hospital CEPON",
  },
  {
    key: "maternidadeCarmelaDutra",
    label:
      "Número de atendimentos encaminhados para Maternidade Carmela Dutra.",
    short: "Maternidade Carmela Dutra",
  },
  {
    key: "institutoCardiologiaSJ",
    label:
      "Número de atendimentos encaminhados para Instituto de Cardiologia SJ.",
    short: "Inst. Cardiologia SJ",
  },
  {
    key: "maternidadeHRSJ",
    label: "Número de atendimentos encaminhados para Maternidade HRSJ",
    short: "Maternidade HRSJ",
  },
  {
    key: "hnr",
    label: "Número de atendimentos encaminhados para HNR",
    short: "HNR",
  },
  {
    key: "hospitaisParticulares",
    label: "Número de atendimentos encaminhados para hospitais particulares.",
    short: "Hosp. Particulares",
  },
  {
    key: "hospitalBiguaçu",
    label: "Número de atendimentos encaminhados para Hospital Biguaçu",
    short: "Hospital Biguaçu",
  },
  {
    key: "hospitalSantoAmaro",
    label: "Número de atendimentos encaminhados para Hospital Santo Amaro",
    short: "Hosp. Santo Amaro",
  },
  {
    key: "hospitalTijucas",
    label: "Número de atendimentos encaminhados para Hospital Tijucas",
    short: "Hosp. Tijucas",
  },
  {
    key: "caps",
    label: "Número de atendimentos encaminhados para CAPS",
    short: "CAPS",
  },
];

const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const ATENDIMENTOS_ZERADOS = Object.fromEntries(
  UNIDADES_ATENDIMENTO.map(({ key }) => [key, 0]),
);

// SCHEMA

const atendimentosShape = Object.fromEntries(
  UNIDADES_ATENDIMENTO.map(({ key }) => [
    key,
    z.coerce.number().int().min(0).default(0),
  ]),
);

const samuSchema = z.object({
  currentYear: z.enum(YEAR_OPTIONS),
  mes: z.enum(MESES),
  atendimentos: z.object(atendimentosShape),
});

// UTILS

function totalAtendimentos(atendimentos) {
  return Object.values(atendimentos).reduce((acc, v) => acc + v, 0);
}

function buildRegistro(values) {
  const total = totalAtendimentos(values.atendimentos);
  return {
    ...values,
    id: crypto.randomUUID(),
    totalAtendimentos: total,
    criadoEm: new Date().toISOString(),
  };
}

// HOOK

const DEFAULT_VALUES = {
  currentYear: "",
  mes: "",
  atendimentos: { ...ATENDIMENTOS_ZERADOS },
};

function useSAMUForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(samuSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const atendimentos = useWatch({
    control: form.control,
    name: "atendimentos",
  });

  const total = totalAtendimentos(atendimentos ?? ATENDIMENTOS_ZERADOS);

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, total };
}

// SUB-COMPONENT

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

function AtendimentosGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {UNIDADES_ATENDIMENTO.map(({ key, label, short }) => {
        const fieldError = errors.atendimentos?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={`atendimentos.${key}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {short}
            </label>
            <Controller
              name={`atendimentos.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`atendimentos.${key}`}
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

function AtendimentosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros de atendimentos
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-xs font-medium text-gray-400 py-2 pr-4 text-left whitespace-nowrap">
              Mês
            </th>
            <th className="text-xs font-medium text-gray-400 py-2 pr-4 text-right whitespace-nowrap">
              Total
            </th>
            {UNIDADES_ATENDIMENTO.map(({ key, label, short }) => (
              <th
                key={key}
                className="text-xs font-medium text-gray-400 py-2 px-2 text-center whitespace-nowrap"
                title={label}
              >
                {short}
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
              <td className="py-2.5 pr-4 text-gray-800 whitespace-nowrap font-medium">
                {r.mes}
              </td>
              <td className="py-2.5 pr-4 text-right font-bold text-gray-900 tabular-nums">
                {r.totalAtendimentos}
              </td>
              {UNIDADES_ATENDIMENTO.map(({ key }) => (
                <td
                  key={key}
                  className="py-2.5 px-2 text-center text-gray-600 tabular-nums"
                >
                  {r.atendimentos[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SAMUForm({ onSuccess }) {
  const { form, handleSubmit, total } = useSAMUForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* Identificação */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação do Mês de Referência
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Atendimentos */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Atendimentos Realizados e Encaminhados
          </h2>
          <AtendimentosGrid control={control} errors={errors} />

          <div className="mt-6 w-[50%]">
            <MetricCard
              label="Total de atendimentos (Mês)"
              value={String(total)}
              accent
            />
          </div>
        </div>

        {/* Actions */}
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

// Page

export default function SAMUFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildRegistro(data), ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />

      {/* page-title-starts */}
      <section className="px-10 py-8">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de atendimentos das Unidades de Suporte Básico e UPAs
            conveniadas
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
            Atendimentos registrados com sucesso.
          </div>
        )}

        <SAMUForm onSuccess={handleSuccess} />
        <AtendimentosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
      {/* footer-ends */}
    </main>
  );
}
