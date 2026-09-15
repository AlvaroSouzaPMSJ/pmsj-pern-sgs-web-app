import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logoPmsj3 from "../../../assets/logoPmsj3.png";
import { registerSchema } from "../validation/authSchema.js";
import { userApi } from "../../users/api/userApi.js";
import { USER_ROLES } from "../../users/constants/userRoles.js";

const RegisterPopUpUI = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...userPayload } = data;

      const response = await userApi.createUser(userPayload);
      if (response.success) {
        alert(response.message);
        setIsOpen(false); // Close modal on success
      }
    } catch (error) {
      // Handle backend validation errors
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        backendErrors.forEach((err) => {
          setError(err.field, { type: "manual", message: err.message });
        });
      } else {
        alert(error.response?.data?.error || "Erro ao cadastrar.");
      }
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden border border-gray-300 rounded-md bg-white p-6 text-left align-middle shadow-md transition-all">
                {/* Header / Close */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Fechar"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Logo */}
                <div className="flex flex-col items-center mb-6">
                  <div className="mb-1">
                    <img src={logoPmsj3} alt="PMSJ Logo" className="w-56 h-auto" />
                  </div>
                  <p className="flex items-center justify-items-center text-gray-600 text-sm">
                    SGS - Sistema de Gestão da Saúde
                  </p>
                </div>

                {/* Title */}
                <div className="flex justify-between items-center border-t border-gray-200">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mt-6">
                    Criar conta
                  </Dialog.Title>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Cadastre-se para acessar o sistema.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex flex-col">
                    {/* Name */}
                    <div className="mt-2">
                      <label className="text-sm font-semibold">Nome</label>
                      <input
                        {...register("name")}
                        className="border rounded-md border-gray-300 w-full h-10 pl-3 text-sm focus:outline-none"
                        placeholder="Digite seu nome"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="mt-4">
                      <label className="text-sm font-semibold">E-mail</label>
                      <input
                        {...register("email")}
                        className="border rounded-md border-gray-300 w-full h-10 pl-3 text-sm focus:outline-none"
                        placeholder="Digite seu email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Role (Department/Cargo) */}
                    <div className="mt-4">
                      <label className="text-sm font-semibold">Cargo / Função</label>
                      <select
                        {...register("role")}
                        className="border rounded-md border-gray-300 w-full h-10 pl-3 bg-white text-sm focus:outline-none"
                      >
                        <option value="">Selecione um cargo</option>
                        {Object.values(USER_ROLES).map((role) => (
                          <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </option>
                        ))}
                      </select>
                      {errors.role && (
                        <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                      <label className="text-sm font-semibold">Senha</label>
                      <input
                        type="password"
                        {...register("password")}
                        className="border rounded-md border-gray-300 w-full h-10 pl-3 text-sm focus:outline-none"
                        placeholder="Digite sua senha"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="mt-4">
                      <label className="text-sm font-semibold">Confirmar Senha</label>
                      <input
                        type="password"
                        {...register("confirmPassword")}
                        className="border rounded-md border-gray-300 w-full h-10 pl-3 text-sm focus:outline-none"
                        placeholder="Confirme sua senha"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex justify-between mt-2">
                      <p className="text-emerald-800 underline hover:text-emerald-500 cursor-pointer text-sm">
                        Esqueceu a senha?
                      </p>
                      <p
                        className="text-emerald-800 underline hover:text-emerald-500 cursor-pointer text-sm"
                        onClick={() => {
                          setIsOpen(false);
                          // If you have a setIsLoginOpen state in App.jsx, pass it as a prop and call it here
                        }}
                      >
                        Já tem uma conta? Entrar
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-5 py-3 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm font-semibold hover:bg-gray-50 cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-3 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-600 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? "Registrando..." : "Registrar"}
                      </button>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RegisterPopUpUI;