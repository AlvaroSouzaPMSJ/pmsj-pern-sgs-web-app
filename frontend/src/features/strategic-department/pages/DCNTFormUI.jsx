import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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

const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString(),
);

const UBS_LIST = /** @type {const} */ ([
  "ubs Areias",
  "ubs Barreiros",
  "ubs Bela Vista",
  "ubs Ceniro Martins",
  "ubs Colônia Santana",
  "ubs Fazenda",
  "ubs Forquilhas",
  "ubs Forquilhinhas",
  "ubs Goiabal",
]);

const FAIXAS_ETARIAS = /** @type {const} */ ([
  "0 a 15 anos",
  "16 a 30 anos",
  "31 a 40 anos",
  "41 a 50 anos",
  "51 a 59 anos",
  "Mais de 60 anos",
]);

const FAIXAS_ZERADAS = Object.fromEntries(FAIXAS_ETARIAS.map((k) => [k, 0]));

// SCHEMA

const faixaEtariaShape = Object.fromEntries(
  FAIXAS_ETARIAS.map((k) => [k, z.coerce.number().int().min(0)]),
);

const dcnSchema = z.object({
  mes: z.enum(MESES),
  ubs: z.string().min(1, "Selecione uma UBS"),
  // Indicadores Gerais (Image 1)
  tirasDistribuidas: z.coerce.number().int().min(0),
  lancetasDistribuidas: z.coerce.number().int().min(0),
  novosCadastros: z.coerce.number().int().min(0),
  totalCadastros: z.coerce.number().int().min(0),
  motivoDesligamento: z.string().optional(),
  hipertensosAferidos: z.coerce.number().int().min(0),
  diabeticosHbA1c: z.coerce.number().int().min(0),
  // Faixa Etária (Image 2)
  idadeDiabeticos: z.object(faixaEtariaShape),
  // Detalhamento DM (Image 3)
  dmTipo1: z.coerce.number().int().min(0),
  dmTipo2: z.coerce.number().int().min(0),
  dg: z.coerce.number().int().min(0),
});

// UTILS

function totalByAge(idadeDiabeticos) {
  return Object.values(idadeDiabeticos).reduce((acc, v) => acc + v, 0);
}

function totalDM(dm1, dm2, dg) {
  return dm1 + dm2 + dg;
}

function buildRegistro(values) {
  const totalDiabeticos = totalByAge(values.idadeDiabeticos);
  const totalDms = totalDM(values.dmTipo1, values.dmTipo2, values.dg);
  return {
    ...values,
    id: crypto.randomUUID(),
    totalDiabeticos: totalDiabeticos,
    totalDms: totalDms,
    criadoEm: new Date().toISOString(),
  };
}

// HOOK

const DEFAULT_VALUES = {
  mes: "",
  ubs: "",
  tirasDistribuidas: 0,
  lancetasDistribuidas: 0,
  novosCadastros: 0,
  totalCadastros: 0,
  motivoDesligamento: "",
  hipertensosAferidos: 0,
  diabeticosHbA1c: 0,
  idadeDiabeticos: { ...FAIXAS_ZERADAS },
  dmTipo1: 0,
  dmTipo2: 0,
  dg: 0,
};

function useDCNTForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(dcnSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const idadeDiabeticos = useWatch({
    control: form.control,
    name: "idadeDiabeticos",
  });
  const dmTipo1 = useWatch({ control: form.control, name: "dmTipo1" });
  const dmTipo2 = useWatch({ control: form.control, name: "dmTipo2" });
  const dg = useWatch({ control: form.control, name: "dg" });

  const totalDiabeticos = totalByAge(idadeDiabeticos ?? FAIXAS_ZERADAS);
  const totalDms = totalDM(dmTipo1 ?? 0, dmTipo2 ?? 0, dg ?? 0);

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, totalDiabeticos, totalDms };
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

function FaixaEtariaGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {FAIXAS_ETARIAS.map((label) => {
        const fieldError = errors.idadeDiabeticos?.[label];
        return (
          <div key={label}>
            <label
              htmlFor={`idadeDiabeticos.${label}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`idadeDiabeticos.${label}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`idadeDiabeticos.${label}`}
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

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Registros da sessão
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {[
              "Mês",
              "UBS",
              "Tiras",
              "Lancetas",
              "Hipertensos",
              "Total Diabéticos",
              "DM (1+2+DG)",
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
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.mes}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.ubs}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {r.tirasDistribuidas}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {r.lancetasDistribuidas}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {r.hipertensosAferidos}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.totalDiabeticos}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium">
                  {r.totalDms}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DCNTForm({ onSuccess }) {
  const { form, handleSubmit, totalDiabeticos, totalDms } =
    useDCNTForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-black mb-4 mt-4">
            Identificação e Indicadores DCNT
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              label="Unidade de Saúde"
              error={errors.ubs?.message}
              htmlFor="ubs"
            >
              <select
                id="ubs"
                {...register("ubs")}
                className={fieldCls(!!errors.ubs)}
              >
                <option value="">Selecione a UBS</option>
                {UBS_LIST.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </FormField>

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

            <FormField label="Ano" error={errors.mes?.message} htmlFor="ano">
              <select
                id="ano"
                {...register("ano")}
                className={fieldCls(!!errors.ano)}
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

        {/* DCNT Indicators */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-black mb-4">
            Indicadores Gerais - Doenças Crônicas Não Transmissíveis
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField
              label="Tiras de glicemia distribuídas"
              error={errors.tirasDistribuidas?.message}
            >
              <input
                type="number"
                min="0"
                {...register("tirasDistribuidas")}
                className={fieldCls(!!errors.tirasDistribuidas)}
              />
            </FormField>
            <FormField
              label="Lancetas distribuídas"
              error={errors.lancetasDistribuidas?.message}
            >
              <input
                type="number"
                min="0"
                {...register("lancetasDistribuidas")}
                className={fieldCls(!!errors.lancetasDistribuidas)}
              />
            </FormField>
            <FormField
              label="Novos Cadastros"
              error={errors.novosCadastros?.message}
            >
              <input
                type="number"
                min="0"
                {...register("novosCadastros")}
                className={fieldCls(!!errors.novosCadastros)}
              />
            </FormField>
            <FormField
              label="Total de Cadastros existentes"
              error={errors.totalCadastros?.message}
            >
              <input
                type="number"
                min="0"
                {...register("totalCadastros")}
                className={fieldCls(!!errors.totalCadastros)}
              />
            </FormField>
            <FormField
              label="Motivo de desligamento"
              error={errors.motivoDesligamento?.message}
            >
              <input
                type="text"
                placeholder="Óbito, mudança, alta, etc."
                {...register("motivoDesligamento")}
                className={fieldCls(!!errors.motivoDesligamento)}
              />
            </FormField>
            <FormField
              label="Hipertensos com PA aferida"
              error={errors.hipertensosAferidos?.message}
            >
              <input
                type="number"
                min="0"
                {...register("hipertensosAferidos")}
                className={fieldCls(!!errors.hipertensosAferidos)}
              />
            </FormField>
            <FormField
              label="Diabéticos solicit. HbA1c"
              error={errors.diabeticosHbA1c?.message}
            >
              <input
                type="number"
                min="0"
                {...register("diabeticosHbA1c")}
                className={fieldCls(!!errors.diabeticosHbA1c)}
              />
            </FormField>
          </div>
        </div>

        {/* Dados por Faixa Etária */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-black mb-4">
            Dados por Faixa Etária - Diabetes
          </h2>
          <FaixaEtariaGrid control={control} errors={errors} />
          <div className="grid grid-cols-1 gap-3 mt-6">
            <MetricCard
              label="Total Diabéticos (todas faixas)"
              value={String(totalDiabeticos)}
              accent
            />
          </div>
        </div>

        {/* DM Breakdown */}
        <div className="mt-14">
          <h3 className="text-2xl font-bold text-black mb-4">
            Detalhamento DM por Tipo
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField label="DM TIPO 1" error={errors.dmTipo1?.message}>
              <input
                type="number"
                min="0"
                {...register("dmTipo1")}
                className={fieldCls(!!errors.dmTipo1)}
              />
            </FormField>
            <FormField label="DM TIPO 2" error={errors.dmTipo2?.message}>
              <input
                type="number"
                min="0"
                {...register("dmTipo2")}
                className={fieldCls(!!errors.dmTipo2)}
              />
            </FormField>
            <FormField label="DG (Gestacional)" error={errors.dg?.message}>
              <input
                type="number"
                min="0"
                {...register("dg")}
                className={fieldCls(!!errors.dg)}
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-6">
            <MetricCard
              label="Total DMs (Tipo 1 + Tipo 2 + DG)"
              value={String(totalDms)}
              accent
            />
          </div>
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

// PAGE

export default function DCNTFormUI() {
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
      <section className="px-10 py-12">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de Indicadores - Programa Doenças Crônicas Não
            Transmissíveis
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
            DCNT registrada com sucesso.
          </div>
        )}

        <DCNTForm onSuccess={handleSuccess} />
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