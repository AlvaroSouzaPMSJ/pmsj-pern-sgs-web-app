import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { userFormSchema } from '../validations/userFormSchema.js';
import { userApi } from "../api/userApi.js";
import { ROUTES } from "../../../app/routing/routes.constants.js";

export const useUserForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await userApi.createUser(data);
      navigate(ROUTES.ADMIN_HOME_UI)
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          setError(err.field, { type: "manual", message: err.message });
        });
      } else {
        alert(error.response?.data?.error || "Erro inesperado useUserForm.js.");
      }
    }
  };

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isSubmitting };
};