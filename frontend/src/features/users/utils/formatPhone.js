// frontend/src/features/users/utils/formatPhone.js
export const formatPhone = (digits) => {
  if (!digits) return "";
  const d = String(digits).replace(/\D/g, "");
  if (d.length === 11) return d.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  if (d.length === 10) return d.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
  return d;
};

export const stripPhone = (formatted) =>
  String(formatted ?? "").replace(/\D/g, "");