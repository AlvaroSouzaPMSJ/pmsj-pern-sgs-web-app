import React from "react";
import {
  ChartNoAxesCombined,
  ChevronDown,
  HeartPulse,
  LayoutDashboard,
  Mail,
  MapPinHouse,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar.jsx";
import { ROUTES } from "../../../app/routing/routes.constants";

const AdminHomeUI = () => {
  //
  const navigate = useNavigate();

  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <GNavbar />
        {/* header-starts */}
        <div className="w-full relative">
          <div>
            <div className="w-full h-20 object-cover"></div>
          </div>
          <h1 className="absolute top-12 bottom-4 left-10 text-3xl text-gray-800 font-bold">
            <span className="font-normal mr-1">Painel do</span> Administrador
          </h1>
        </div>
        {/* header-starts */}

        {/* */}
        <section id="situationroom" className="px-10 py-16 bg-gray-100">
          <div>
            <div>
              {/**/}
              <div>
                <div className="border-b border-gray-300">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <LayoutDashboard
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-[16px]">
                          Cadastrar
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
            </div>

            {/* grid-starts */}
            <div className="pt-8">
              <div>
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xlg:grid-cols-6">
                  {/*  */}
                  <div
                    className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:shadow-md hover:border-gray-300 cursor-pointer"
                    onClick={() => navigate(ROUTES.USER_FORM_UI)}
                  >
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Usuário
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:shadow-md hover:border-gray-300 cursor-pointer">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Local {"(to do)"}
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:shadow-md hover:border-gray-300 cursor-pointer">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Material {"(to do)"}
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:shadow-md hover:border-gray-300 cursor-pointer">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Instrumento {"(to do)"}
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-white hover:shadow-md hover:border-gray-300 cursor-pointer">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Equipamento {"(to do)"}
                    </p>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            {/* grid-ends */}
          </div>
        </section>
        {/* */}

        {/* */}
        <section id="situationroom" className="px-10 py-16">
          <div>
            <div>
              {/**/}
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <LayoutDashboard
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-[16px]">
                          Listar
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
            </div>

            {/* grid-starts */}
            <div className="pt-8">
              <div>
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xlg:grid-cols-6">
                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Lorem
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Ipsum
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Ipsum
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Lorem
                    </p>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            {/* grid-ends */}
          </div>
        </section>
        {/* */}

        {/* */}
        <section id="situationroom" className="px-10 py-16">
          <div>
            <div>
              {/**/}
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <LayoutDashboard
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-[16px]">
                          Atualizar
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
            </div>

            {/* grid-starts */}
            <div className="pt-8">
              <div>
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Lorem
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Ipsum
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Ipsum
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Lorem
                    </p>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            {/* grid-ends */}
          </div>
        </section>
        {/* */}

        {/* */}
        <section id="situationroom" className="px-10 py-16">
          <div>
            <div>
              {/**/}
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <LayoutDashboard
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-[16px]">
                          Remover
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
            </div>

            {/* grid-starts */}
            <div className="pt-8">
              <div>
                <div className="grid grid-cols-3 gap-2 lg:grid-cols-6">
                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Lorem
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Ipsum
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Ipsum
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer hover:bg-gray-100">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Lorem
                    </p>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            {/* grid-ends */}
          </div>
        </section>
        {/* */}

        {/* footer-starts */}
        <footer className="">
          <Footer />
        </footer>
        {/* footer-ends */}
      </main>
    </>
  );
};

export default AdminHomeUI;