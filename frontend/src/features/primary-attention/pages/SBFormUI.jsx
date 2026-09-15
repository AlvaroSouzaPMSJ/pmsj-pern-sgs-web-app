import { useState, useCallback } from "react";
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

const GRUPOS_INDICADORES = [
  {
    titulo: "Indicadores Gerais da Atenção Básica",
    itens: [
      {
        key: "procedimentos_ab",
        label: "Número de Procedimentos odontológicos na AB",
      },
      {
        key: "consultas_ab",
        label: "Número de Consultas odontológicas na Atenção Básica",
      },
      {
        key: "primeira_consulta_programatica",
        label: "Número da 1ª Consulta odontológica programática",
      },
      {
        key: "acoes_coletivas",
        label: "Número de Ações Coletivas preventivo-educativas",
      },
      {
        key: "proporcao_urgencia",
        label: "Proporção de atendimento de urgências em relação às consultas",
      },
      {
        key: "participantes_escovacao",
        label: "Participantes na Ação Coletiva de Escovação Supervisionada",
      },
      {
        key: "cobertura_populacional",
        label: "Cobertura populacional estimada de saúde bucal na AB",
      },
      {
        key: "consultas_retorno",
        label: "Número absoluto de consultas odontológicas de retorno",
      },
      {
        key: "proteses_entregues",
        label: "Número absoluto de próteses dentárias entregues",
      },
      {
        key: "gestantes_atendidas",
        label: "Número absoluto de gestantes atendidas",
      },
      {
        key: "criancas_0_9",
        label: "Número absoluto de crianças 0 a 9 anos atendidas",
      },
      {
        key: "idosos_60_mais",
        label: "Número absoluto de idosos (acima de 60 anos) atendidos",
      },
      {
        key: "tratamentos_concluidos",
        label: "Número absoluto de tratamentos concluídos",
      },
      {
        key: "encaminhamentos_ceo",
        label: "Número de encaminhamentos para CEO",
      },
      {
        key: "encaminhamentos_protese_total",
        label: "Número de encaminhamentos para Prótese Total",
      },
      {
        key: "razao_tratamentos_consultas",
        label: "Razão entre tratamentos concluídos e 1ªs consultas",
      },
      {
        key: "proporcao_ceo_consultas",
        label:
          "Proporção de encaminhamentos para CEO (em relação total de 1ªs consultas)",
      },
    ],
  },
  {
    titulo: "Portaria 3.493, 10/04/2024",
    itens: [
      {
        key: "primeira_consulta_portaria",
        label: "Primeira consulta odontológica Programática",
      },
      { key: "tratamento_concluido_portaria", label: "Tratamento concluído" },
      {
        key: "escovacao_supervisionada_portaria",
        label: "Escovação supervisionada",
      },
      {
        key: "art_atraumatico",
        label: "Tratamento restaurador atraumático (ART)",
      },
      { key: "vd_domiciliar", label: "VD (visita domiciliar)" },
      {
        key: "criancas_0_2_odonto_sao_jose",
        label: "Número de crianças 0-2 atendidas (Odonto São José)",
      },
      {
        key: "criancas_rn_odonto_sao_jose",
        label: "Número de crianças RN atendidas (Odonto São José)",
      },
      {
        key: "acoes_coletivas_2",
        label: "Número de Ações Coletivas preventivo-educativas",
      },
      {
        key: "cobertura_populacional_2",
        label: "Cobertura populacional estimada de saúde bucal na AB",
      },
      {
        key: "gestantes_atendidas_2",
        label: "Número absoluto de gestantes atendidas",
      },
      {
        key: "procedimentos_ab_2",
        label: "Número de Procedimentos odontológicos na AB",
      },
    ],
  },
  {
    titulo: "Atendimentos realizados pelas Unidades Odontológica Móvel",
    itens: [
      {
        key: "atendimentos_uom_1",
        label: "Número de atendimentos realizados pela UOM 1",
      },
      {
        key: "atendimentos_uom_2",
        label: "Número de atendimentos realizados pela UOM 2",
      },
    ],
  },
];

const TODAS_KEYS = GRUPOS_INDICADORES.flatMap((grupo) =>
  grupo.itens.map((i) => i.key),
);
const INDICADORES_ZERADOS = Object.fromEntries(
  TODAS_KEYS.map((key) => [key, 0]),
);

// ─── Schema ───────────────────────────────────────────────────────────────────

const indicadorShape = Object.fromEntries(
  TODAS_KEYS.map((key) => [key, z.coerce.number().min(0)]),
);

const saudeBucalSchema = z.object({
  mes: z.enum(MESES),
  ano: z.coerce.number().int().min(2024).max(2099),
  indicadores: z.object(indicadorShape),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function buildRegistro(values) {
  const totalProcedimentos =
    (values.indicadores.procedimentos_ab || 0) +
    (values.indicadores.procedimentos_ab_2 || 0);
  const totalUOM =
    (values.indicadores.atendimentos_uom_1 || 0) +
    (values.indicadores.atendimentos_uom_2 || 0);
  const coberturaMedia =
    (values.indicadores.cobertura_populacional || 0) +
    (values.indicadores.cobertura_populacional_2 || 0);

  return {
    ...values,
    id: crypto.randomUUID(),
    totalProcedimentos,
    totalUOM,
    coberturaMedia: coberturaMedia > 0 ? coberturaMedia / 2 : 0,
    criadoEm: new Date().toISOString(),
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_VALUES = {
  mes: "",
  ano: new Date().getFullYear(),
  indicadores: { ...INDICADORES_ZERADOS },
};

function useSaudeBucalForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(saudeBucalSchema),
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

function IndicadoresGrid({ control, errors }) {
  return (
    <>
      {GRUPOS_INDICADORES.map((grupo) => (
        <div
          key={grupo.titulo}
          className="mt-8 border-t border-gray-200 pt-8 first:border-t-0 first:pt-0"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {grupo.titulo}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grupo.itens.map(({ key, label }) => {
              const fieldError = errors.indicadores?.[key];
              return (
                <div key={key}>
                  <label
                    htmlFor={`indicadores.${key}`}
                    className="block text-xs font-medium text-gray-500 mb-1 truncate"
                    title={label}
                  >
                    {label}
                  </label>
                  <Controller
                    name={`indicadores.${key}`}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        id={`indicadores.${key}`}
                        type="number"
                        min={0}
                        step="any"
                        inputMode="decimal"
                        className={fieldCls(!!fieldError) + " text-center"}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </>
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
              "Ano",
              "Total Procedimentos",
              "Total UOM",
              "Cobertura Média",
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
              <td className="py-2.5 pr-4 text-gray-800 whitespace-nowrap">
                {r.ano}
              </td>
              <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                {r.totalProcedimentos}
              </td>
              <td className="py-2.5 pr-4 text-right text-gray-800 tabular-nums">
                {r.totalUOM}
              </td>
              <td className="py-2.5 text-right tabular-nums">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.coberturaMedia >= 60
                      ? "bg-green-100 text-green-700"
                      : r.coberturaMedia >= 40
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-600"
                  }`}
                >
                  {r.coberturaMedia.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  %
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SaudeBucalForm({ onSuccess }) {
  const { form, handleSubmit } = useSaudeBucalForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Identificação do Período ───────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Identificação do Período
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

            <FormField label="Ano" error={errors.ano?.message} htmlFor="ano">
              <input
                id="ano"
                type="number"
                min={2024}
                max={2099}
                {...register("ano")}
                className={fieldCls(!!errors.ano) + " text-center"}
              />
            </FormField>
          </div>
        </div>

        {/* ── Indicadores por Grupo ────────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Indicadores Estratégicos
          </h2>
          <IndicadoresGrid control={control} errors={errors} />
        </div>

        {/* ── Actions ────────────────────────────────────────────────────── */}
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
            Registrar Período
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SBFormUI() {
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
            Saúde Bucal - Formulário de Indicadores Estratégicos
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Registro de dados e monitoramento do Programa Saúde Bucal
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
            Período e indicadores registrados com sucesso.
          </div>
        )}

        <SaudeBucalForm onSuccess={handleSuccess} />
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
