import React from "react";
import {
  ChartNoAxesCombined,
  ChevronDown,
  HeartPulse,
  Mail,
  MapPinHouse,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../app/routing/routes.constants";
import GNavbar from "../../../app/layouts/GNavbar";
import Footer from "../../../app/layouts/Footer";

const PrimaryAttentionHomeUI = () => {
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
            <span className="font-normal mr-1">Atenção{" "}</span>Primária
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
                        <ChartNoAxesCombined
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-[16px]">
                          Sala de Situação
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
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                  {/*  */}
                  <div
                    onClick={() => navigate("/home/spreadsheet8")}
                    className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer"
                  >
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      2027
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      2026
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      2025
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2024
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2023
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2022
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2021
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2020
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2019
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2018
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2017
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Sistema CELK
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Consulta CNES
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Solicitação Manutenção Serviço
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

        {/* basic-strategic-attention-area-starts */}
        <section id="basichealthunits" className="px-10 py-20">
          {/*  */}
          <div>
            <div>
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <ChartNoAxesCombined
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold text-gray-900">
                          Áreas estratégicas de Atenção Básica
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}

            {/* grid-starts */}
            <div className="pt-8">
              <div>
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      2026
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      2025
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2024
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2023
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2022
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2021
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      2020
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      EMAPS 2025
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      EMAPS 2024
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      EMAPS 2025
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      Profissionais por UBS
                    </p>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            {/* grid-ends */}
          </div>
        </section>
        {/* basic-strategic-attention-area-ends */}

        {/* basic-health-units-starts */}
        <section id="basichealthunits" className="px-10 py-16">
          {/*  */}
          <div>
            <div>
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <ChartNoAxesCombined
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold">
                          Unidades Básicas de Saúde
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}

            {/* grid-starts */}
            <div className="pt-8">
              <div>
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Areias
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Barreiros
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Bela Vista
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Campinas
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Ceniro Martins
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Colônia Santana
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Fazenda
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div
                    onClick={() => {
                      navigate(ROUTES.UBS_FORQUILHAS_HOME_UI);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50"
                  >
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Forquilhas
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Forquilhinhas
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Goiabal
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Ipiranga
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Luar
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Morar Bem
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Picadas
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Potecas
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Procasa
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Real Parque
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Roçado
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Santos Saraiva
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS São Luiz
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Sede
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Serraria
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Sertão
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Vila Formosa
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Vista Bela
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 hover:shadow-md cursor-pointer bg-gray-50">
                    <p className="flex items-center justify-center text-gray-800 text-sm font-medium">
                      UBS Zanelato
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Consolidado UBS
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-[12px] font-medium">
                      Perc Preenchimento da sala UBS
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Informações UBS
                    </p>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
            {/* grid-ends */}
          </div>
        </section>
        {/* basic-health-units-ends */}

        {/* information-and-agendas-starts */}
        <section id="basichealthunits" className="px-10 py-20">
          {/*  */}
          <div>
            <div>
              <div>
                <div className="border-b border-gray-300 pb-4">
                  <div className="flex-1 flex justify-between">
                    <div className="flex items-center">
                      <div>
                        <ChartNoAxesCombined
                          size={20}
                          className="mr-2 text-green-950"
                        />
                      </div>
                      <div>
                        <h1 className="flex font-semibold">
                          Agenda e Informativos
                        </h1>
                      </div>
                    </div>
                    <div>
                      <ChevronDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}

            <div className="pt-8">
              <div>
                {/* grid-starts */}
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5">
                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      Agenda - Eventos NEP
                    </p>
                  </div>
                  {/*  */}

                  {/*  */}
                  <div className="border border-gray-300 rounded-md px-4 py-2 bg-green-900 hover:shadow-md hover:border-white cursor-pointer">
                    <p className="flex items-center justify-center text-white text-sm font-medium">
                      PMS 2022 - 2025
                    </p>
                  </div>
                  {/*  */}
                </div>
                {/* grid-ends */}
              </div>

              {/*  */}
              <div className="mt-8">
                <p className="text-sm text-justify">
                  Os registros da sala de situação são a essência da
                  documentação de todo o processo de Gestão de Saúde. Com a
                  introdução de novas tecnologias, a informação assume uma
                  importância crescente dentro das instituições, tornando-se
                  fundamental e geradora de oportunidades de gestão de
                  processos. Nesse contexto, as informações produzidas pela Sala
                  de Situação podem ser definidas de forma que o conteúdo
                  presente na mesma contextualize ações sistematizadas e
                  organizadas na saúde e subsidia a tomada de decisão. Ao adotar
                  este método de planejamento estratégico, obtém-se como
                  resultado o bom funcionamento institucional, evidenciando a
                  relevância da mesma como um processo que contribui para a
                  transparência das ações institucionais.Sendo assim, o registro
                  preciso dos dados é a condição para que este processo ocorra,
                  ademais, trata-se de documento público que por sua vez goza de
                  fé pública, e, portanto, de presunção de veracidade. {">>"}As
                  informações declaradas nesta plataforma, são de inteira
                  responsabilidade do Coordenador desta Unidade de saúde.{"<<"}
                </p>
              </div>
              {/**/}
            </div>
          </div>
        </section>
        {/* information-and-agendas-starts */}

        {/* footer-2 */}
        <section>
          <Footer />
        </section>
        {/* footer-2 */}
      </main>
    </>
  );
};

export default PrimaryAttentionHomeUI;