export const formatUserRole = (role) => {
  const map = {
    "admin": "Administador",
    "medico(a)": "Médico(a)",
    "enfermeiro(a)": "Enfermeiro(a)"
  };
  return map[role] || role;
};