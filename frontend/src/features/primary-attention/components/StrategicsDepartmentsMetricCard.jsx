// frontend/src/features/primary-attention/components/MetricCard.jsx
export function MetricCard({ label, value, accent = false }) {
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className={`text-2xl font-semibold tabular-nums ${accent ? "text-blue-600" : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
}