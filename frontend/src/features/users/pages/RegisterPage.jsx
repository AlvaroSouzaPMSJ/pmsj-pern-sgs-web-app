// frontend/src/features/users/pages/RegisterPage.jsx
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { UserForm } from "../components/UserForm.jsx";
import { useUserForm } from "../hooks/useUserForm.js";

const RegisterPage = () => {
  const { register, handleSubmit, errors, isSubmitting } = useUserForm();

  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />
      <div className="px-10 py-12">
        <div className="border-b border-gray-300 pb-4 mb-6">
          <h1 className="font-semibold text-3xl">Cadastrar Novo Usuário</h1>
          <p className="text-gray-500">
            Preencha os dados abaixo para criar uma nova conta.
          </p>
        </div>

        {errors.root && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded p-3 mb-4">
            {errors.root.message}
          </div>
        )}

        <UserForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>
      <Footer />
    </main>
  );
};

export default RegisterPage;