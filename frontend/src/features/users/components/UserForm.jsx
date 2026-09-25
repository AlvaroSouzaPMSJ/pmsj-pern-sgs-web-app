import { ChevronDown, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/routing/routes.constants";
import { useUserForm } from "../hooks/useUserForm";
import { USER_ROLES } from "../constants/userRoles";

export const UserForm = ({ register, handleSubmit, errors, isSubmitting }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-col border p-8 rounded-md border-gray-300 bg-white">
        {/* */}
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xlg:grid-cols-6">
              {/* name */}
              <div>
                <label className="text-sm font-bold">Nome</label>
                <input
                  {...register("name")}
                  className="border border-gray-300 rounded w-full p-2 bg-white"
                  placeholder="digite o nome completo"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name.message}</p>
                )}
              </div>
              {/**/}

              {/* e-mail */}
              <div>
                <label className="text-sm font-bold">e-Mail</label>
                <input
                  {...register("email")}
                  className="border border-gray-300 rounded w-full p-2 bg-white"
                  placeholder="seu@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              {/**/}

              {/* password */}
              <div>
                <label className="text-sm font-bold">Senha</label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="border border-gray-300 rounded w-full p-2 bg-white"
                  placeholder="digite sua senha"
                />
                <div className="flex flex-col mt-1">
                  <span className="text-[12px] font-semibold">Atenção</span>
                  <span className="text-[11px] text-gray-500">
                    1. sua senha deve conter no minimo 8 caracteres{" "}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    2. use letras, algarismos, e simbolos. ex.: 123abc@{" "}
                  </span>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/**/}

              {/* cpf */}
              <div>
                <label className="text-sm font-bold">CPF</label>
                <input
                  {...register("cpf")}
                  className="border border-gray-300 rounded w-full p-2 bg-white"
                  placeholder="digite seu cpf"
                />
                <div className="flex flex-col mt-1">
                  <span className="text-[12px] font-semibold">Atenção</span>
                  <span className="text-[11px] text-gray-500">
                    1. digite apenas algarismos
                  </span>
                </div>
                {errors.cpf && (
                  <p className="text-red-500 text-xs">{errors.cpf.message}</p>
                )}
              </div>
              {/**/}

              {/* fone */}
              <div>
                <label className="text-sm font-bold">Fone</label>
                <input
                  {...register("phone")}
                  className="border border-gray-300 rounded w-full p-2 bg-white"
                  placeholder="digite seu fone"
                />
                <div className="flex flex-col mt-1">
                  <span className="text-[12px] font-semibold">Atenção</span>
                  <span className="text-[11px] text-gray-500">
                    1. digite apenas algarismos
                  </span>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
              {/**/}

              {/* role */}
              <div>
                <label className="text-sm font-bold">Cargo</label>
                <select
                  {...register("role")}
                  className="border border-gray-300 rounded w-full p-2 bg-white"
                >
                  <option className="hidden" value="">
                    Selecione um cargo
                  </option>
                  {Object.values(USER_ROLES).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs">{errors.role.message}</p>
                )}
              </div>
              {/**/}
            </div>
            {/*  */}
            <div>
              {/* buttons */}
              <div className="flex justify-end mt-6 col-span-3">
                <button
                  type="button"
                  onClick={() => navigate("/admin/home")}
                  className="border border-gray-300 px-5 py-2.5 mr-2 font-semibold text-sm rounded-md cursor-pointer bg-white hover:shadow-md hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border border-gray-300 bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-md disabled:opacity-50 cursor-pointer hover:shadow-md"
                >
                  {isSubmitting ? "Registrando..." : "Registrar"}
                </button>
              </div>
            </div>
            {/*  */}
          </form>
        </div>
        {/*  */}
      </div>
    </>
  );
};
