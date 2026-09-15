import { Check } from "lucide-react";

export const CaseReportStepper = ({ total, current }) => (
  <div className="flex items-center gap-0">
    {Array.from({ length: total }).map((_, i) => {
      const isDone = i < current;
      const isActive = i === current;
      const isPending = i > current;
      return (
        <div key={i} className="flex items-center">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300
              ${isDone ? "bg-green-700 text-white" : ""}
              ${isActive ? "bg-green-700 text-white ring-4 ring-green-100" : ""}
              ${isPending ? "bg-gray-200 text-gray-500" : ""}
            `}
          >
            {isDone ? <Check size={14} /> : i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`h-0.5 w-10 transition-all duration-500 ${i < current ? "bg-green-700" : "bg-gray-200"}`}
            />
          )}
        </div>
      );
    })}
  </div>
);