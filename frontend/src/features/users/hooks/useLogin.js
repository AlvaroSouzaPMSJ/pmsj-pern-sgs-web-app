// frontend/src/features/users/hooks/useLogin.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../validations/loginSchema.js";
import { userApi } from "../api/userApi.js";
import { useUserStore } from "../store/user.store.js";
import { ROUTES } from "../../../app/routing/routes.constants.js";

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useUserStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await userApi.login(data);
      const { user, token } = response.data;
      setAuth(user, token);
      navigate(ROUTES.ADMIN_HOME_UI);
    } catch (err) {
      const message =
        err.response?.data?.message || "Erro ao fazer login. Tente novamente.";
      setError("root", { message });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  };
};