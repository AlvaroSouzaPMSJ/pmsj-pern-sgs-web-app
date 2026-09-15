import SubmissionStatus from "./SubmissionStatus";

export const CaseReportSubmissionBanner = ({ status, error, onReset }) => {
  if (status === SubmissionStatus.SUCCESS) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm font-medium">
        <Check size={18} className="shrink-0" />
        <span>Notificação salva com sucesso!</span>
        <button
          onClick={onReset}
          className="ml-auto underline underline-offset-2 text-green-700 hover:text-green-900 font-semibold"
        >
          Nova notificação
        </button>
      </div>
    );
  }

  if (status === SubmissionStatus.ERROR) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
        <AlertCircle size={18} className="shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  return null;
};