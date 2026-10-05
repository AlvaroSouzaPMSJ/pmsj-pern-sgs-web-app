export const formatCpf = (digits) => {
  if (!digits) return "";
  const d = String(digits).replace(/\D/g, "");
  return d.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4") || d;
};

export const stripCpf = (formatted) =>
  String(formatted ?? "").replace(/\D/g, "");