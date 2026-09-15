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
import { ROUTES } from "../../../app/routing/routes.constants";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

const MunicipalLaboratoryHomeUI = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        {/* navbar */}
        <GNavbar />
        {/* header-starts */}
        <div className="w-full relative">
          <div>
            <div className="w-full h-20 object-cover"></div>
          </div>
          <h1 className="absolute top-12 bottom-4 left-10 text-3xl text-gray-800 font-bold">
            <span className="font-normal mr-1">Laboratório</span> Municipal
          </h1>
        </div>
        {/* header-starts */}

        {/* situation-room-starts */}
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
                          Painel de Controle
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
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                  {/*  */}
                  <div
                    onClick={() => navigate("/municipal_laboratory/form/create")}
                    className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Formulário Lab #1 (test)
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
        {/* situation-room-starts */}

        {/* footer-starts */}
        <footer className="">
          <Footer />
        </footer>
        {/* footer-ends */}
      </main>
    </>
  );
};

export default MunicipalLaboratoryHomeUI;