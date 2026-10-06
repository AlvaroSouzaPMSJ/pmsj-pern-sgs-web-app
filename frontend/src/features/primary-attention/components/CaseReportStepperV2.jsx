// frontend/src/features/primary-attention/components/CaseReportStepper.jsx
import { Check } from "lucide-react";

export const CaseReportStepper = ({ total, current }) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center gap-2">
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                done
                  ? "bg-green-700 text-white"
                  : active
                    ? "bg-green-700 text-white ring-4 ring-green-200"
                    : "bg-gray-200 text-gray-500",
              ].join(" ")}
            >
              {done ? <Check size={14} /> : i + 1}
            </div>
            {i < total - 1 && (
              <div
                className={`w-8 h-0.5 ${done ? "bg-green-700" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};