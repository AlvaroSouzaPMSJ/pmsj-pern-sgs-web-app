// frontend/src/features/primary-attention/components/CaseReportSubmissionBanner.jsx
import { CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";

export const CaseReportSubmissionBanner = ({ status, onReset }) => {
  if (status === "success") {
    return (
      <div className="flex items-start gap-3 border border-green-200 bg-green-50 rounded-lg p-4">
        <CheckCircle2 className="text-green-700 mt-0.5" size={20} />
        <div className="flex-1">
          <h3 className="font-semibold text-green-900">
            Notificação enviada com sucesso
          </h3>
          <p className="text-sm text-green-800 mt-1">
            O caso foi registrado no sistema.
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1 text-sm text-green-800 hover:underline"
        >
          <RotateCcw size={14} /> Novo
        </button>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-start gap-3 border border-red-200 bg-red-50 rounded-lg p-4">
        <AlertTriangle className="text-red-700 mt-0.5" size={20} />
        <div className="flex-1">
          <h3 className="font-semibold text-red-900">
            Não foi possível enviar
          </h3>
          <p className="text-sm text-red-800 mt-1">
            Verifique os campos e tente novamente.
          </p>
        </div>
      </div>
    );
  }

  return null;
};