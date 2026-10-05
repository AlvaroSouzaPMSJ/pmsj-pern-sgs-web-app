// frontend/src/features/users/validations/userFormSchema.js
import { z } from "zod";
import { USER_ROLES } from "../constants/userRoles.js";

const roleValues = Object.values(USER_ROLES);

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter no mínimo 2 caracteres")
    .max(255, "Nome muito longo"),

  email: z.string().email("E-mail inválido"),

  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Za-z]/, "Deve conter pelo menos uma letra")
    .regex(/[0-9]/, "Deve conter pelo menos um número")
    .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um símbolo"),

  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),

  phone: z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),

  role: z.enum(roleValues, {
    errorMap: () => ({ message: "Selecione um cargo" }),
  }),
});