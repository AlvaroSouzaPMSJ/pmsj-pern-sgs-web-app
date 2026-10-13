// frontend/src/features/users/constants/userRoles.js
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "gestor",
  DOCTOR: "medico",
  NURSE: "enfermeiro",
  RECEPTIONIST: "recepcionista",
  USER: "usuario",
};

// Display labels (Portuguese UI, English keys)
export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: "Administrador",
  [USER_ROLES.MANAGER]: "Gestor",
  [USER_ROLES.DOCTOR]: "Médico",
  [USER_ROLES.NURSE]: "Enfermeiro",
  [USER_ROLES.RECEPTIONIST]: "Recepcionista",
  [USER_ROLES.USER]: "Usuário",
};