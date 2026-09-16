import { useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ROUTES } from "../../../app/routing/routes.constants";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";


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

/** Single source of truth for UBS (Unidades Básicas de Saúde) from the sheet. */
const UBS_LIST = /** @type {const} */ ([
  { key: "ceniroMartins", label: "UBS Ceniro Martins" },
  { key: "areias", label: "UBS Areias" },
  { key: "barreiros", label: "UBS Barreiros" },
  { key: "belaVista", label: "UBS Bela Vista" },
  { key: "coloniaSantana", label: "UBS Colônia Santana" },
  { key: "fazendaStoAntonio", label: "UBS Fazenda Sto Antônio" },
  { key: "forquilhas", label: "UBS Forquilhas" },
  { key: "forquilhinhas", label: "UBS Forquilhinhas" },
  { key: "goiabal", label: "UBS Goiabal" },
  { key: "jardimZanelato", label: "UBS Jardim Zanelato" },
  { key: "luar", label: "UBS Luar" },
  { key: "luar", label: "UBS Luar" },
  { key: "morarBem", label: "UBS Morar Bem" },
  { key: "picadasDoSul", label: "UBS Picadas do Sul" },
  { key: "picadasDoSul", label: "UBS Picadas do Sul" },
  { key: "policlinicaCampinas", label: "UBS Policlinica Campinas" },
  { key: "procasa", label: "UBS Procasa" },
  { key: "realParque", label: "UBS Real Parque" },
  { key: "roçado", label: "UBS Roçado" },
  { key: "santoSaraiva", label: "UBS Santo Saraiva" },
  { key: "saoLuiz", label: "UBS São Luiz" },
  { key: "sede", label: "UBS Sede" },
  { key: "serraria", label: "UBS Serraria 1" },
  { key: "serrariaNovo", label: "UBS Serraria Novo" },
  { key: "sertaoDoMaruim", label: "UBS Sertão do Maruim" },
  { key: "vilaFormosa", label: "UBS Vila Formosa" },
  { key: "vistaBela", label: "UBS Vista Bela" },
]);

const UBS_ZERADOS = Object.fromEntries(UBS_LIST.map(({ key }) => [key, 0]));

// ─── Schema ───────────────────────────────────────────────────────────────────

const ubsCountShape = Object.fromEntries(
  UBS_LIST.map(({ key }) => [key, z.coerce.number().int().min(0)]),
);

const materiaisEspeciaisSchema = z.object({
  ubsUnit: z.string().min(1, "Selecione a unidade"),
  mes: z.enum(MESES),
  sequencia: z.coerce.number().int().min(1),
  descricao: z
    .string()
    .min(3, "Descrição deve ter ao menos 3 caracteres")
    .max(300),
  acamados: z.coerce.number().int().min(0),
  cadastradosEnfermagem: z.coerce.number().int().min(0),
  fraldasDistribuidas: z.coerce.number().int().min(0),
  valorInsumosFraldas: z.string().min(1, "Informe o valor em R$"),
  cadastrosExcluidos: z.coerce.number().int().min(0),
  nutricaoEnteral: z.coerce.number().int().min(0),
  cadastrosNovos: z.coerce.number().int().min(0),
  usuariosLesao: z.coerce.number().int().min(0),
  // Image 2 data: Pessoas Cadastradas
  ubsPessoasCadastradas: z.object(ubsCountShape),
  // Image 3 data
  pessoasInseridasAgravo: z.coerce.number().int().min(0),
  pessoasDesligadas: z.coerce.number().int().min(0),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function totalUbs(ubsData) {
  return Object.values(ubsData).reduce((acc, v) => acc + v, 0);
}

function formatCurrency(value) {
  if (!value) return "R$ 0,00";
  // Attempt to parse the string into a number, handling "R$ 150,00" and "150.00"
  const numeric = String(value)
    .replace(/[^\d,.-]/g, "")
    .replace(",", ".");
  const parsed = parseFloat(numeric);
  if (isNaN(parsed)) return value;
  return `R$ ${parsed.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function buildMateriaisEspeciais(values) {
  const ubsTotal = totalUbs(values.ubsPessoasCadastradas);
  return {
    ...values,
    id: crypto.randomUUID(),
    ubsTotal: ubsTotal,
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  ubsUnit: "",
  mes: "",
  sequencia: 1,
  descricao: "",
  acamados: 0,
  cadastradosEnfermagem: 0,
  fraldasDistribuidas: 0,
  valorInsumosFraldas: "",
  cadastrosExcluidos: 0,
  nutricaoEnteral: 0,
  cadastrosNovos: 0,
  usuariosLesao: 0,
  ubsPessoasCadastradas: { ...UBS_ZERADOS },
  pessoasInseridasAgravo: 0,
  pessoasDesligadas: 0,
};

function useMateriaisForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(materiaisEspeciaisSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const ubsData = useWatch({
    control: form.control,
    name: "ubsPessoasCadastradas",
  });

  const ubsTotal = totalUbs(ubsData ?? UBS_ZERADOS);

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(data);
        form.reset(DEFAULT_VALUES);
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, ubsTotal };
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

function UbsGrid({ control, errors }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {UBS_LIST.map(({ key, label }) => {
        const fieldError = errors.ubsPessoasCadastradas?.[key];
        return (
          <div key={key}>
            <label
              htmlFor={`ubsPessoasCadastradas.${key}`}
              className="block text-xs font-medium text-gray-500 mb-1 truncate"
              title={label}
            >
              {label}
            </label>
            <Controller
              name={`ubsPessoasCadastradas.${key}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  id={`ubsPessoasCadastradas.${key}`}
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
              "Descrição",
              "Seq.",
              "Fraldas",
              "Total UBS",
              "Insumos (R$)",
            ].map((h, i) => (
              <th
                key={h}
                className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                  i >= 3 ? "text-right" : "text-left"
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
              <td
                className="py-2.5 pr-4 text-gray-800 max-w-xs truncate"
                title={r.descricao}
              >
                {r.descricao}
              </td>
              <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                {r.sequencia}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-500 tabular-nums">
                {r.fraldasDistribuidas}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.ubsTotal}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span className="inline-block rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700">
                  {formatCurrency(r.valorInsumosFraldas)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MateriaisEspeciaisForm({ onSuccess }) {
  const { form, handleSubmit, ubsTotal } = useMateriaisForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-md p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação ───────────────────────────────────── */}
        <div className="mt-10">
          <div>
            <h2 className="text-2xl font-semibold">Selecionar</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
            <FormField
              label="Selecione a unidade"
              error={errors.ubsUnit?.message}
              htmlFor="ubsUnit"
            >
              <select
                id="ubsUnit"
                {...register("ubsUnit")}
                className={fieldCls(!!errors.ubsUnit)}
              >
                <option value="">Selecione a unidade</option>
                {UBS_LIST.map((ubs) => (
                  <option key={ubs.key} value={ubs.key}>
                    {ubs.label}
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

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-black">
              Dados / Indicadores
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              <FormField
                label="Nº de pessoas Acamadas"
                error={errors.acamados?.message}
                htmlFor="acamados"
              >
                <input
                  id="acamados"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("acamados")}
                  className={fieldCls(!!errors.acamados) + " text-center"}
                />
              </FormField>
              <FormField
                label="Nº Sequencial do Mês"
                error={errors.sequencia?.message}
                htmlFor="sequencia"
              >
                <input
                  id="sequencia"
                  type="number"
                  min={1}
                  {...register("sequencia")}
                  className={fieldCls(!!errors.sequencia) + " text-center"}
                />
              </FormField>
              <FormField
                label="Descrição / Apontamento"
                error={errors.descricao?.message}
                htmlFor="descricao"
              >
                <input
                  id="descricao"
                  type="text"
                  placeholder="ex: Ações do Programa Materiais Especiais"
                  {...register("descricao")}
                  className={fieldCls(!!errors.descricao)}
                />
              </FormField>

              <FormField
                label="Número de pessoas cadastradas para recebimento de material de enfermagem"
                error={errors.valorInsumosFraldas?.message}
                htmlFor="valorInsumosFraldas"
              >
                <input
                  id="valorInsumosFraldas"
                  type="text"
                  placeholder="ex: 450,00"
                  {...register("valorInsumosFraldas")}
                  className={fieldCls(!!errors.valorInsumosFraldas)}
                />
              </FormField>

              <FormField
                label="Valor de Insumos (R$) - FRALDAS"
                error={errors.valorInsumosFraldas?.message}
                htmlFor="valorInsumosFraldas"
              >
                <input
                  id="valorInsumosFraldas"
                  type="text"
                  placeholder="ex: 450,00"
                  {...register("valorInsumosFraldas")}
                  className={fieldCls(!!errors.valorInsumosFraldas)}
                />
              </FormField>

              <FormField
                label="Cadastrados (Mat. Enfermagem)"
                error={errors.cadastradosEnfermagem?.message}
                htmlFor="cadastradosEnfermagem"
              >
                <input
                  id="cadastradosEnfermagem"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("cadastradosEnfermagem")}
                  className={
                    fieldCls(!!errors.cadastradosEnfermagem) + " text-center"
                  }
                />
              </FormField>

              <FormField
                label="Fraldas Distribuídas"
                error={errors.fraldasDistribuidas?.message}
                htmlFor="fraldasDistribuidas"
              >
                <input
                  id="fraldasDistribuidas"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("fraldasDistribuidas")}
                  className={
                    fieldCls(!!errors.fraldasDistribuidas) + " text-center"
                  }
                />
              </FormField>

              <FormField
                label="Cadastros Excluídos/Cancelados"
                error={errors.cadastrosExcluidos?.message}
                htmlFor="cadastrosExcluidos"
              >
                <input
                  id="cadastrosExcluidos"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("cadastrosExcluidos")}
                  className={
                    fieldCls(!!errors.cadastrosExcluidos) + " text-center"
                  }
                />
              </FormField>

              <FormField
                label="Nutrição Enteral (Usuários)"
                error={errors.nutricaoEnteral?.message}
                htmlFor="nutricaoEnteral"
              >
                <input
                  id="nutricaoEnteral"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("nutricaoEnteral")}
                  className={
                    fieldCls(!!errors.nutricaoEnteral) + " text-center"
                  }
                />
              </FormField>

              <FormField
                label="Cadastros Novos"
                error={errors.cadastrosNovos?.message}
                htmlFor="cadastrosNovos"
              >
                <input
                  id="cadastrosNovos"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("cadastrosNovos")}
                  className={fieldCls(!!errors.cadastrosNovos) + " text-center"}
                />
              </FormField>

              <FormField
                label="Usuários com Lesão"
                error={errors.usuariosLesao?.message}
                htmlFor="usuariosLesao"
              >
                <input
                  id="usuariosLesao"
                  type="number"
                  min={0}
                  placeholder="0"
                  {...register("usuariosLesao")}
                  className={fieldCls(!!errors.usuariosLesao) + " text-center"}
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* ── Inserções e Desligamentos (Image 3) ────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Movimentações Mensais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Pessoas inseridas por Mês/Agravo"
              error={errors.pessoasInseridasAgravo?.message}
              htmlFor="pessoasInseridasAgravo"
            >
              <input
                id="pessoasInseridasAgravo"
                type="number"
                min={0}
                placeholder="0"
                {...register("pessoasInseridasAgravo")}
                className={
                  fieldCls(!!errors.pessoasInseridasAgravo) + " text-center"
                }
              />
            </FormField>

            <FormField
              label="Pessoas Desligadas"
              error={errors.pessoasDesligadas?.message}
              htmlFor="pessoasDesligadas"
            >
              <input
                id="pessoasDesligadas"
                type="number"
                min={0}
                placeholder="0"
                {...register("pessoasDesligadas")}
                className={
                  fieldCls(!!errors.pessoasDesligadas) + " text-center"
                }
              />
            </FormField>
          </div>
        </div>

        {/* ── Pessoas Cadastradas por UBS (Image 2) ──────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Pessoas Cadastradas por UBS
          </h2>
          <UbsGrid control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-6">
            <MetricCard
              label="Total de Pessoas Cadastradas (UBS)"
              value={String(ubsTotal)}
            />
            <MetricCard
              label="Valor Insumos Informado"
              value={formatCurrency(form.watch("valorInsumosFraldas"))}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SMPFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((data) => {
    setRegistros((prev) => [buildMateriaisEspeciais(data), ...prev]);
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
          <h1 className="text-3xl font-bold text-black">
            Formulário de Entrada de Dados
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de indicadores e dados por UBS — Secretaria Municipal de
            Saúde
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
            Indicadores registrados com sucesso.
          </div>
        )}

        <MateriaisEspeciaisForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
    </main>
  );
}