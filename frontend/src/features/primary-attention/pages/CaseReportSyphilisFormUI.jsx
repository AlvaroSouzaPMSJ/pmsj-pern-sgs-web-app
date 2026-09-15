import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
} from "lucide-react";
import { CASE_REPORT_PAGES } from "../config/CaseReportaPage.js"
import { CaseReportStepper } from "../components/CaseReportStepper";
import { CaseReportSubmissionBanner } from "../components/CaseReportSubmissionBanner";
import { FormField } from "../components/FormField";
import { useCaseReportForm } from "../hooks/useCaseReportForm";
import { ROUTES } from "../../../app/routing/routes.constants";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

const PaginationControls = ({
  current,
  total,
  isLoading,
  onBack,
  onNext,
  onCancel,
}) => {
  const isLast = current === total - 1;
  const isFirst = current === 0;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <button
        onClick={onCancel}
        disabled={isLoading}
        className="text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Cancelar
      </button>

      <div className="flex items-center gap-3">
        {!isFirst && (
          <button
            onClick={onBack}
            disabled={isLoading}
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            <ChevronLeft size={15} />
            Voltar
          </button>
        )}

        <span className="text-xs text-gray-400">
          {current + 1} / {total}
        </span>

        <button
          onClick={onNext}
          disabled={isLoading}
          className="flex items-center gap-1 px-5 py-2 bg-green-700 text-white rounded-md text-sm font-semibold hover:bg-green-600"
        >
          {isLoading ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Enviando…
            </>
          ) : isLast ? (
            <>
              <div>Salvar</div>
            </>
          ) : (
            <>
              Próxima <ChevronRight size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/* =========================================================
   CreateCaseReport — ORCHESTRATION COMPONENT
========================================================= */
const CaseReportSyphilisFormUI = () => {
  //
  const navigate = useNavigate();
  const location = useLocation();

  const {
    step,
    totalSteps,
    formData,
    setField,
    submit,
    status,
    next,
    prev,
    reset, // <-- IMPORTANT: your hook must expose this
  } = useCaseReportForm();

  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  const handleNext = async () => {
    const isLast = step === totalSteps - 1;

    if (!isLast) {
      next();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const ok = await submit();

    if (ok) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    prev();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Deseja cancelar o preenchimento? Os dados serão perdidos.",
      )
    ) {
      reset?.();
    }
  };

  const page = CASE_REPORT_PAGES?.[step];
  if (!page) {
    return (
      <main className="p-10">
        <p className="text-red-600">
          Invalid form step. Check CASE_REPORT_PAGES or step state.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />

      {/*
      <ArrowLeft />
      */}

      {/* arrow-back-starts
      <div className="px-10 py-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          classNamessName="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Voltar à página anterior"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs text--400 font-mono underline">
          {location.pathname}
        </span>
      </div>
       arrow-back-ends */}



      {/* header-starts */}
      <div className="w-full relative">
        <div>
          <div className="w-full h-20 object-cover"></div>
        </div>
        <h1 className="absolute top-4 bottom-4 left-10 text-3xl text-gray-800 font-bold drop-shadow">
          <span className="font-normal mr-1">UBS</span> Forquilhas / Formulário
          Sífilis
        </h1>
      </div>
      {/* header-starts */}

      {/* Title */}
      <section className="px-10">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold">
            Notificação de Sífilis em Gestantes
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Este formulário deve ser usado para notificação dos casos de
            sífilis.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-10 pb-16">
        <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm">
          {/* Submission Banner */}
          {(isSuccess || isError) && (
            <div className="mb-6">
              <CaseReportSubmissionBanner status={status} onReset={reset} />
            </div>
          )}

          {/* Hide form after success */}
          {!isSuccess && (
            <>
              {/* Stepper */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {page.title}
                  </h2>
                  <p className="text-gray-400 text-sm">{page.subtitle}</p>
                </div>

                <CaseReportStepper total={totalSteps} current={step} />
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-4">
                {page.fields.map((field) => (
                  <div
                    key={field.key}
                    className="border border-gray-200 rounded-lg p-5"
                  >
                    <h3 className="font-semibold text-base mb-1">
                      {field.label}
                    </h3>

                    {field.required && (
                      <p className="text-red-600 text-xs mb-3">
                        Preenchimento obrigatório
                      </p>
                    )}

                    <FormField
                      field={field}
                      value={formData[field.key]}
                      onChange={setField}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <PaginationControls
                current={step}
                total={totalSteps}
                isLoading={isLoading}
                onBack={handleBack}
                onNext={handleNext}
                onCancel={handleCancel}
              />
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CaseReportSyphilisFormUI;