import { useState, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

// CONSTANTS

const CONSULTAS = [
"SMS - atendimento estimulação e reabilitação autismo - CERTEA",
"SMS - consulta cauterização química de pequenas lesões",
"SMS - consulta em cardiologia geral",
"SMS - consulta em cirurgia buco-maxilo",
"SMS - consulta em dermatologia geral",
"SMS - consulta em dermatologia hanseníase",
"SMS - consulta em dermatologia pediatria",
"SMS - consulta em endocrinologia e metabologia geral",
"SMS - consulta em endocrinologia pediatria",
"SMS - consulta em fonoaudiologia",
];

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

const YEAR_OPTIONS = Array.from({ length: 5 }, (_, i) =>
  (new Date().getFullYear() - 4 + i).toString()
);

// SCHEMA

const consultaReguladaSchema = z.object({
  mesReferencia: z.enum(MESES),
  currentYear: z.enum(YEAR_OPTIONS),
  consulta: z.string().min(3, "Selecione ou digite o nome da consulta"),

  // Sistema Celk & SIA
  qtdAutorizadasCelk: z.coerce.number().int().min(0).default(0),
  qtdRealizadasCelk: z.coerce.number().int().min(0).default(0),
  qtdRealizadasSIA: z.coerce.number().int().min(0).default(0),

  // Indicators
  absenteismo: z.coerce.number().int().min(0).default(0),
  percentualAbsenteismo: z.coerce.number().min(0).max(100).default(0),

  // Waiting List (Risk classification)
  pacientesAguardandoRegulacao: z.coerce.number().int().min(0).default(0),
  fila30Dias: z.coerce.number().int().min(0).default(0),
  fila90Dias: z.coerce.number().int().min(0).default(0),
  fila180Dias: z.coerce.number().int().min(0).default(0),

  // Detailed Wait (Days)
  data30Dias: z.coerce.number().int().min(0).default(0),
  data90Dias: z.coerce.number().int().min(0).default(0),
  data180Dias: z.coerce.number().int().min(0).default(0),
  dataPacAguardando: z.coerce.number().int().min(0).default(0),

  // Returns
  retornos: z.coerce.number().int().min(0).default(0),
});

// UTILS

function formatNumber(val) {
  return val.toLocaleString("pt-BR");
}

function buildRegistro(values) {
  return {
    ...values,
    id: crypto.randomUUID(),
    criadoEm: new Date().toISOString(),
    // Computed stats for the table
    totalAutorizadas: values.qtdAutorizadasCelk,
    totalRealizadas: values.qtdRealizadasCelk + values.qtdRealizadasSIA,
    totalFila: values.pacientesAguardandoRegulacao,
  };
}

// HOOK

const DEFAULT_VALUES = {
  mesReferencia: "",
  consulta: "",
  qtdAutorizadasCelk: 0,
  qtdRealizadasCelk: 0,
  qtdRealizadasSIA: 0,
  absenteismo: 0,
  percentualAbsenteismo: 0,
  pacientesAguardandoRegulacao: 0,
  fila30Dias: 0,
  fila90Dias: 0,
  fila180Dias: 0,
  data30Dias: 0,
  data90Dias: 0,
  data180Dias: 0,
  dataPacAguardando: 0,
  retornos: 0,
};

function useConsultaForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(consultaReguladaSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
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

  return { form, handleSubmit };
}

// SUB-COMPONENTS

function FormField({ label, error, children, htmlFor, className = "" }) {
  return (
    <div className={className}>
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
    "transition-colors duration-150 text-center",
    hasError
      ? "border-red-300 focus:ring-red-500/30 focus:border-red-400"
      : "border-gray-300",
  ].join(" ");
}

function SectionHeader({ title, description = "" }) {
  return (
    <div className="border-l-4 border-blue-600 pl-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;
  return (
    <div className="border border-gray-300 rounded-md p-6 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Consultas Reguladas Cadastradas
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-400 uppercase">
            <th className="pb-3 pr-4">Mês</th>
            <th className="pb-3 pr-4">Consulta</th>
            <th className="pb-3 pr-4 text-right">Autorizadas (Celk)</th>
            <th className="pb-3 pr-4 text-right">Realizadas (Total)</th>
            <th className="pb-3 pr-4 text-right">Absenteísmo</th>
            <th className="pb-3 pr-4 text-right">Fila (Pacientes)</th>
            <th className="pb-3 text-right">Retornos</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr
              key={r.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 pr-4 text-gray-500">{r.mesReferencia}</td>
              <td
                className="py-3 pr-4 text-gray-800 max-w-50 truncate"
                title={r.consulta}
              >
                {r.consulta}
              </td>
              <td className="py-3 pr-4 text-right font-mono text-gray-700">
                {formatNumber(r.qtdAutorizadasCelk)}
              </td>
              <td className="py-3 pr-4 text-right font-mono text-gray-700">
                {formatNumber(r.qtdRealizadasCelk + r.qtdRealizadasSIA)}
              </td>
              <td className="py-3 pr-4 text-right font-mono text-gray-700">
                {formatNumber(r.absenteismo)}
              </td>
              <td className="py-3 pr-4 text-right font-mono text-gray-700">
                {formatNumber(r.pacientesAguardandoRegulacao)}
              </td>
              <td className="py-3 text-right font-mono text-gray-700">
                {formatNumber(r.retornos)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// MAIN FORM COMPONENT
function ConsultaReguladaForm({ onSuccess }) {
  const { form, handleSubmit } = useConsultaForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-10">
        {/* 1. Identificação */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">
              Identificação da Consulta
            </h2>
            <p className="text-sm text-gray-500">
              Dados iniciais e mês de referência
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormField
              label="Procedimento / Consulta"
              error={errors.consulta?.message}
              htmlFor="consulta"
            >
              <select
                id="consulta"
                {...register("consulta")}
                className={fieldCls(!!errors.consulta) + " text-left"}
              >
                <option value="">Selecione ou digite...</option>
                {CONSULTAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              label="Mês de Referência"
              error={errors.mesReferencia?.message}
              htmlFor="mesReferencia"
            >
              <select
                id="mesReferencia"
                {...register("mesReferencia")}
                className={fieldCls(!!errors.mesReferencia)}
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

        {/* 2. Produção e Sistema */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Produção e Sistemas (Celk vs SIA)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <FormField
              label="Qtd. Autorizadas (Sistema Celk)"
              error={errors.qtdAutorizadasCelk?.message}
              htmlFor="qtdAutorizadasCelk"
            >
              <input
                id="qtdAutorizadasCelk"
                type="number"
                min={0}
                {...register("qtdAutorizadasCelk")}
                className={fieldCls(!!errors.qtdAutorizadasCelk)}
              />
            </FormField>

            <FormField
              label="Qtd. Realizadas (Sistema Celk)"
              error={errors.qtdRealizadasCelk?.message}
              htmlFor="qtdRealizadasCelk"
            >
              <input
                id="qtdRealizadasCelk"
                type="number"
                min={0}
                {...register("qtdRealizadasCelk")}
                className={fieldCls(!!errors.qtdRealizadasCelk)}
              />
            </FormField>

            <FormField
              label="Qtd. Realizadas (SIA)"
              error={errors.qtdRealizadasSIA?.message}
              htmlFor="qtdRealizadasSIA"
            >
              <input
                id="qtdRealizadasSIA"
                type="number"
                min={0}
                {...register("qtdRealizadasSIA")}
                className={fieldCls(!!errors.qtdRealizadasSIA)}
              />
            </FormField>
          </div>
        </div>

        {/* 3. Absenteísmo */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Indicadores de Absenteísmo</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Absenteísmo (Nº de faltas)"
              error={errors.absenteismo?.message}
              htmlFor="absenteismo"
            >
              <input
                id="absenteismo"
                type="number"
                min={0}
                {...register("absenteismo")}
                className={fieldCls(!!errors.absenteismo)}
              />
            </FormField>

            <FormField
              label="Percentual de Absenteísmo (%)"
              error={errors.percentualAbsenteismo?.message}
              htmlFor="percentualAbsenteismo"
            >
              <input
                id="percentualAbsenteismo"
                type="number"
                step="0.01"
                min={0}
                max={100}
                {...register("percentualAbsenteismo")}
                className={fieldCls(!!errors.percentualAbsenteismo)}
              />
            </FormField>
          </div>
        </div>

        {/* 4. Fila de Espera (Classificação de Risco) */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Fila de Espera (Classificação de Risco)</h2>
            <p className="text-sm text-gray-500">Pacientes aguardando regulação e detalhamento por tempo</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <FormField
              label="Pacientes Aguardando Regulação"
              error={errors.pacientesAguardandoRegulacao?.message}
              htmlFor="pacientesAguardandoRegulacao"
            >
              <input
                id="pacientesAguardandoRegulacao"
                type="number"
                min={0}
                {...register("pacientesAguardandoRegulacao")}
                className={fieldCls(!!errors.pacientesAguardandoRegulacao)}
              />
            </FormField>

            <FormField
              label="Fila - 30 Dias"
              error={errors.fila30Dias?.message}
              htmlFor="fila30Dias"
            >
              <input
                id="fila30Dias"
                type="number"
                min={0}
                {...register("fila30Dias")}
                className={fieldCls(!!errors.fila30Dias)}
              />
            </FormField>

            <FormField
              label="Fila - 90 Dias"
              error={errors.fila90Dias?.message}
              htmlFor="fila90Dias"
            >
              <input
                id="fila90Dias"
                type="number"
                min={0}
                {...register("fila90Dias")}
                className={fieldCls(!!errors.fila90Dias)}
              />
            </FormField>

            <FormField
              label="Fila - 180 Dias"
              error={errors.fila180Dias?.message}
              htmlFor="fila180Dias"
            >
              <input
                id="fila180Dias"
                type="number"
                min={0}
                {...register("fila180Dias")}
                className={fieldCls(!!errors.fila180Dias)}
              />
            </FormField>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 mb-3 uppercase">
              Detalhamento de Dias (Data)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField
                label="Data - 30 Dias"
                error={errors.data30Dias?.message}
                htmlFor="data30Dias"
              >
                <input
                  id="data30Dias"
                  type="number"
                  min={0}
                  {...register("data30Dias")}
                  className={fieldCls(!!errors.data30Dias)}
                />
              </FormField>

              <FormField
                label="Data - 90 Dias"
                error={errors.data90Dias?.message}
                htmlFor="data90Dias"
              >
                <input
                  id="data90Dias"
                  type="number"
                  min={0}
                  {...register("data90Dias")}
                  className={fieldCls(!!errors.data90Dias)}
                />
              </FormField>

              <FormField
                label="Data - 180 Dias"
                error={errors.data180Dias?.message}
                htmlFor="data180Dias"
              >
                <input
                  id="data180Dias"
                  type="number"
                  min={0}
                  {...register("data180Dias")}
                  className={fieldCls(!!errors.data180Dias)}
                />
              </FormField>

              <FormField
                label="Data - Pacientes Aguardando"
                error={errors.dataPacAguardando?.message}
                htmlFor="dataPacAguardando"
              >
                <input
                  id="dataPacAguardando"
                  type="number"
                  min={0}
                  {...register("dataPacAguardando")}
                  className={fieldCls(!!errors.dataPacAguardando)}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* 5. Retornos */}
        <div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Retornos e Pendências</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Retornos"
              error={errors.retornos?.message}
              htmlFor="retornos"
            >
              <input
                id="retornos"
                type="number"
                min={0}
                {...register("retornos")}
                className={fieldCls(!!errors.retornos)}
              />
            </FormField>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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

export default function DIRACFormUI() {
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
            DIRAC - Registro de dados relativos a consultas reguladas, absenteísmo e
            fila de espera
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
            Consulta regulada registrada com sucesso.
          </div>
        )}

        <ConsultaReguladaForm onSuccess={handleSuccess} />
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