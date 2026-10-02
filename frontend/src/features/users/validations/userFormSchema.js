import { z } from "zod";
import { USER_ROLES } from "../constants/userRoles.js";

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(255, "Nome muito longo"),

  email: z.string().email("Email inválido"),

  password: z
    .string()
    .min(8, "Senha")
    .regex(/[A-Za-z]/, "Deve conter letras")
    .regex(/[0-9]/, "Deve conter números")
    .regex(/[^A-Za-z0-9]/, "Deve conter pelo menos um símbolo"),

  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos (apenas números)"),

  phone: z.string().regex(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos"),

  role: z.enum(Object.values(USER_ROLES), {
    errorMap: () => ({ message: "Selecione um cargo válido" }),
  }),
});
