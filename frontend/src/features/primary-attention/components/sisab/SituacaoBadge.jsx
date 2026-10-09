export function SituacaoBadge({ situacao }) {
  const map = {
    true:  { cls: "bg-green-100 text-green-700", txt: "Meta atingida" },
    false: { cls: "bg-red-100 text-red-600", txt: "Abaixo da meta" },
    null:  { cls: "bg-gray-100 text-gray-400", txt: "Aguardando" },
  };
  const { cls, txt } = map[String(situacao)];
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
      {txt}
    </span>
  );
}