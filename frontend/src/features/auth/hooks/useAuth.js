// frontend/src/features/auth/hooks/useAuth.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import { loginSchema } from "../validation/authSchema.js";
import { ROLE_TO_ROUTE } from "../constants/roleRouteMap.js";

export const useAuth = (onSuccessCallback) => {
  const navigate = useNavigate();
  const { login: loginStore, isLoading } = useAuthStore();

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const result = await loginStore(data.email, data.password);
    if (result.success) {
      if (onSuccessCallback) onSuccessCallback();

      const targetRoute = ROLE_TO_ROUTE[result.user.role] || "/system/home";
      navigate(targetRoute);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setError("root", { message: result.message });
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isLoading };
};