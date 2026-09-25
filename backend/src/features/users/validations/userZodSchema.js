import { z } from "zod";
import { USER_ROLES } from "../constants/userRoles.js";

export const createUserSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Formato de e-mail inválido"),
  cpf: z.string().length(11, "CPF deve conter exatamente 11 dígitos"),
  phone: z.string().min(10, "Telefone deve ter no mínimo 10 dígitos"),
  role: z.enum(Object.values(USER_ROLES), {
    errorMap: () => ({ message: "Cargo selecionado é inválido" })
  }),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});