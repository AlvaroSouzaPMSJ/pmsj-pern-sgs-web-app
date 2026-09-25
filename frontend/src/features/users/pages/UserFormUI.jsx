import GNavbar from "../../../app/layouts/GNavbar.jsx";
import Footer from "../../../app/layouts/Footer.jsx";
import { UserForm } from "../components/UserForm.jsx";
import { useUserForm } from "../hooks/useUserForm.js";
import { LayoutDashboard } from "lucide-react";

const UserFormUI = () => {
  const { register, handleSubmit, errors, isSubmitting } = useUserForm();
  return (
    <main className="bg-gray-100 min-h-screen">
      <GNavbar />
      <div className="px-10 py-12">
        <div className="border-b border-gray-300 pb-4 mb-6 flex items-center">
          <div className="flex-row">
            <h1 className="font-semibold text-3xl">
              Cadastrar Novo Usuário
            </h1>
            <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
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

export default UserFormUI;