// frontend/src/features/users/pages/LoginPage.jsx
import { Link } from "react-router-dom";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { useLogin } from "../hooks/useLogin.js";
import { ROUTES } from "../../../app/routing/routes.constants.js";

const LoginPage = () => {
  const { register, handleSubmit, errors, isSubmitting } = useLogin();

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col">
      <GNavbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-lg border border-gray-300 p-8">
          <h1 className="text-2xl font-semibold mb-1">Entrar</h1>
          <p className="text-gray-500 text-sm mb-6">
            Acesse sua conta para continuar.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-bold">E-mail</label>
              <input
                type="email"
                {...register("email")}
                className="border border-gray-300 rounded w-full p-2"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-bold">Senha</label>
              <input
                type="password"
                {...register("password")}
                className="border border-gray-300 rounded w-full p-2"
                placeholder="digite sua senha"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-3">
                {errors.root.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-md disabled:opacity-50 hover:bg-blue-700"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Não tem conta?{" "}
            <Link
              to={ROUTES.ADMIN_USER_CREATE_UI}
              className="text-blue-600 hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default LoginPage;