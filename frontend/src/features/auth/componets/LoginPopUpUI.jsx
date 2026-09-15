import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import logoPmsj3 from "../../../assets/logoPmsj3.png";
import { useAuth } from "../hooks/useAuth.js";

const LoginPopUpUI = ({ isOpen, setIsOpen }) => {
  // The hook handles the form logic and navigation
  const { register, handleSubmit, errors, isLoading } = useAuth(() => setIsOpen(false));

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
                    Login
                  </Dialog.Title>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Digite seu e-mail e senha para acessar o sistema.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex flex-col">
                    {/* Email */}
                    <div className="mt-2">
                      <label className="text-sm font-semibold">E-mail</label>
                      <input
                        {...register("email")}
                        className="border rounded-md border-gray-300 w-full h-10 pl-3 text-sm focus:outline-none"
                        placeholder="digite seu email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="mt-4">
                      <label className="text-sm font-semibold">Senha</label>
                      <input
                        type="password"
                        {...register("password")}
                        className="border rounded-md border-gray-300 w-full h-10 pl-3 text-sm focus:outline-none"
                        placeholder="digite sua senha"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                      )}
                    </div>

                    {/* Root Error (Invalid credentials) */}
                    {errors.root && (
                      <p className="text-red-500 text-sm mt-2">{errors.root.message}</p>
                    )}

                    {/* Action Links */}
                    <div className="flex justify-between mt-2">
                      <p className="text-emerald-800 underline hover:text-emerald-500 cursor-pointer text-sm">
                        Esqueceu a senha?
                      </p>
                      <p
                        className="text-emerald-800 underline hover:text-emerald-500 cursor-pointer text-sm"
                        // If you want to open the Register modal from here, you can pass a setter prop later
                      >
                        Criar conta
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
                        disabled={isLoading}
                        className="px-5 py-3 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm font-semibold text-white bg-green-600 hover:bg-green-500 cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? "Entrando..." : "Fazer Login"}
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

export default LoginPopUpUI;