export function ReferenceChip({ label, value }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 border border-gray-200 px-2 py-0.5 text-xs text-gray-600 whitespace-nowrap">
      <span className="text-gray-400">{label}</span>
      <span className="font-medium text-gray-700 tabular-nums">{value}</span>
    </span>
  );
}