import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { userFormSchema } from "../validations/userFormSchema.js";
import { userApi } from "../api/userApi.js";
import { ROUTES } from "../../../app/routing/routes.constants.js";

export const useUserForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(userFormSchema) });

  const onSubmit = async (data) => {
    try {
      await userApi.createUser(data);
      navigate(ROUTES.ADMIN_HOME_UI);
    } catch (err) {
      const body = err.response?.data;

      // Backend sends a single message today; fall back to it
      const message =
        body?.message ||
        body?.error ||
        "Erro inesperado ao cadastrar usuário.";

      // If backend later returns field-level errors: [{ field, message }]
      if (Array.isArray(body?.errors)) {
        body.errors.forEach((e) =>
          setError(e.field, { type: "server", message: e.message })
        );
      } else {
        setError("root", { message });
      }
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};