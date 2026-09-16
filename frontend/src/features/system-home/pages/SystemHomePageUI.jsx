import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Dot,
  ArrowRight,
  CircleCheckBig,
  Heart,
  Activity,
  TrendingUp,
  LogIn,
  Calendar,
  TrendingDown,
  Trophy,
  Home,
  Monitor,
  Brain,
  MapPin,
  Clock,
  LogInIcon,
  LayoutDashboard,
  Phone,
  Mail,
  Send,
  Building,
  User,
  Circle,
} from "lucide-react";

import LoginPopUpUI from "../../../auth/components/LoginPopUpUI";
import RegisterPopUpUI from "../../../auth/components/RegisterPopUpUI";

const SystemHomePageUI = () => {
  const navigate = useNavigate();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [selectedTask, setSelectedTask] = useState(null);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main className="font-sans text-gray-800 overflow-x-hidden">
      <div>
        <div>
          {/* navbar-starts */}
          <header className="px-4 sm:px-6 lg:px-10 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>

                <div>
                  <p className="font-bold text-2xl">Saúde São José</p>
                  <p className="text-1xl text-gray-500">
                    Secretaria Municipal de Saúde
                  </p>
                </div>
              </div>

              <div className="lg:hidden">{/* <Sidebar /> */}</div>
              <nav className="hidden lg:flex items-center gap-6 text-sm">
                <div className="bg-emerald-50 px-5 py-3 rounded-xl">
                  <a className="text-emerald-600 text-[18px]">Início</a>
                </div>
                <a
                  className="text-gray-600 text-[18px] cursor-pointer"
                  onClick={() => scrollTo("indicadores")}
                >
                  Indicadores
                </a>
                <a
                  className="text-gray-600 text-[18px] cursor-pointer"
                  onClick={() => scrollTo("services")}
                >
                  Serviços
                </a>
                <a
                  className="text-gray-600 text-[18px] cursor-pointer"
                  onClick={() => scrollTo("units")}
                >
                  Unidades
                </a>
                <a
                  className="text-gray-600 text-[18px] cursor-pointer"
                  onClick={() => scrollTo("latest")}
                >
                  Notícias
                </a>
                <a
                  className="text-gray-600 text-[18px] cursor-pointer"
                  onClick={() => scrollTo("contact")}
                >
                  Contato
                </a>
                <button
                  onClick={() => {
                    setIsAuthOpen(true);
                  }}
                  className="flex justify-center items-center bg-emerald-700 text-white px-5 py-3 rounded-xl text-[18px] font-bold cursor-pointer"
                >
                  <User className="mr-2 w-5 h-5" />
                  Entrar
                </button>
              </nav>
            </div>
          </header>
          {/* navbar-starts */}

          {/* hero-starts */}
          <section className="px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-24 bg-linear-to-r from-white to-emerald-50 border-t border-gray-200">
            <div>
              <div>
                {/*  */}
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-5 py-2 text-sm text-emerald-700 mb-8 font-semibold">
                  <Dot className="h-3 w-3 mr-1" />
                  <span>Sala de Situação em Saúde</span>
                </span>
                {/*  */}

                <div className="flex flex-col lg:flex-row items-start gap-12">
                  <div className="w-full lg:w-1/2">
                    {/* left-side-starts */}
                    <div className="">
                      <h1 className="text-left font-bold leading-tight mb-6 text-[39px] sm:text-2xl md:text-5xl lg:text-6xl xl:text-6xl">
                        Cuidando da{" "}
                        <span id="health" className="text-emerald-700">
                          saúde
                        </span>
                        <br className="hidden sm:block" /> de São José
                      </h1>

                      <p className="text-left text-gray-600 mb-8 text-base sm:text-lg md:text-xl max-w-xl">
                        Acesse indicadores em tempo real, informações sobre
                        unidades de saúde, campanhas de vacinação e serviços
                        disponíveis para a população.
                      </p>

                      {/* buttons */}
                      <div className="flex gap-4 border-gray-300">
                        <div className="w-full lg:flex gap-2">
                          <div className="lg:flex gap-2">
                            <button className="flex justify-center items-end px-15 py-5 text-white font-bold rounded-xl shadow-md shadow-emerald-100 bg-emerald-700 mb-2 w-full lg:30">
                              Ver indicadores
                              <ArrowRight size={20} className="ml-2" />
                            </button>
                          </div>

                          <div>
                            <button className="px-18 py-5 border border-gray-300 sm:px-20 sm:py-5 bg-white font-bold rounded-xl shadow-md w-full">
                              Nossos Serviços
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* buttons */}
                    </div>
                    {/* left-side-ends */}

                    {/* stats-starts */}
                    <div className="mt-10 lg:mt-10">
                      {/* */}
                      <div className="flex items-center justify-left text-gray-300">
                        <div className="flex-col border-r lg:pr-4">
                          <p className="text-center text-3xl font-bold text-emerald-700">
                            45
                          </p>
                          <p className="text-center text-sm text-gray-600">
                            Unidades de Saúde
                          </p>
                        </div>

                        <div className="flex items-center justify-center text-gray-300">
                          <div className="flex-col border-r pr-4 pl-4">
                            <p className="text-center text-3xl font-bold text-emerald-700">
                              250.000
                            </p>
                            <p className="text-center text-sm text-gray-600">
                              Unidades de Saúde
                            </p>
                          </div>
                        </div>

                        {/**/}
                        <div className="flex items-center justify-center text-gray-300">
                          <div className="flex-col pl-4">
                            <p className="text-center text-3xl font-bold text-emerald-700">
                              98%
                            </p>
                            <p className="text-center text-sm text-gray-600">
                              Cobertura vacianal
                            </p>
                          </div>
                        </div>
                        {/**/}
                      </div>
                      {/**/}
                    </div>
                    {/* stats-ends */}
                  </div>

                  {/* right-side-starts */}
                  <div className="w-full lg:w-1/2 lg:relative">
                    <div>
                      {/* card-atend-starts */}
                      <div className="lg:absolute lg:top-10 lg:left-80 z-30 bg-white rounded-xl shadow-md border border-gray-100 mb-2 lg:w-70 p-5">
                        <div className="flex items-center">
                          <div className="p-3 h-12 rounded-xl bg-emerald-100 mr-3">
                            <CircleCheckBig
                              size={24}
                              className="text-emerald-900"
                            />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-black">
                              12.450
                            </p>
                            <p className="text-[15px] text-gray-500">
                              Atendimentos hoje
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* card-atend-ends */}

                      {/*  */}
                      <div className="lg:absolute lg:top-26 lg:left-30 bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-2 lg:w-100">
                        <div className="flex">
                          <div className="p-3 h-12 rounded-xl bg-gray-100 mr-3">
                            <Activity size={24} className="text-emerald-900" />
                          </div>
                          <div>
                            <p className="text-[15px] font-semibold text-gray-500">
                              Dashboard de Saúde
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <HealthBars />
                        </div>
                      </div>
                      {/* */}

                      {/* */}
                      <div className="lg:absolute lg:top-70 lg:left-5 p-5 z-10 bg-white rounded-xl shadow-md border border-gray-100 lg:w-50">
                        <div className="flex items-center">
                          <div className="p-3 h-12 rounded-xl bg-red-100 mr-3">
                            <Heart size={24} className="text-red-900" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-black">98%</p>
                            <p className="text-[15px] text-gray-500">
                              Satisfação
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* */}
                    </div>
                  </div>
                  {/* right-side-ends */}
                </div>
              </div>
            </div>
          </section>
          {/* hero-ends */}

          {/*indicadores-starts*/}
          <section
            id="indicadores"
            className="px-4 pt-20 pb-20  sm:pt-20 bg-linear-to-r from-white to-gray-50"
          >
            <div>
              <div>
                {/* flag-starts */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-5 py-2 text-sm text-emerald-700 mb-8 font-semibold">
                    <span>Dados em Tempo Real</span>
                  </span>
                </div>
                {/* flag-ends */}

                {/* title-starts */}
                <div className="flex justify-center">
                  <div className="">
                    <h1 className="text-center font-bold leading-tight mb-6 text-4xl sm:text-2xl md:text-5xl lg:flex lg:text-6xl lg:mb-6 lg:justify-center xl:text-6xl">
                      Indicadores de{" "}
                      <span id="health2" className="text-emerald-700 lg:ml-4">
                        saúde
                      </span>
                    </h1>
                    <p className="text-center text-gray-600 mb-8 text-base sm:text-lg md:text-xl lg:w-full justify-center">
                      Acompanhe os principais indicadores de saúde do município
                      de São José, atualizados diariamente pela Sala de
                      Situação.
                    </p>
                  </div>
                </div>
                {/* title-ends */}

                {/* grid-starts */}
                <section className="w-full sm:px-4 sm:pt-4 lg:px-4">
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-4">
                      {/* card-b */}
                      <div className="flex p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mt-4 sm:mt-0">
                        <div className="bg-green-100 p-4 h-15 rounded-xl mr-5">
                          <Heart className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">245.832</p>
                          <p className="text-gray-500 text-md mb-2">
                            População coberta pela ESF
                          </p>
                          <div className="flex items-center bg-emerald-100 py-1 px-5 rounded-xl w-39">
                            <TrendingUp
                              className="text-emerald-900 mr-2"
                              size={16}
                            />
                            <p className="text-emerald-700 font-semibold text-sm">
                              +2,4 este mês
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* card-b */}

                      {/* card-b */}
                      <div className="flex p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mt-4 sm:mt-0">
                        <div className="bg-green-100 p-4 h-15 rounded-xl mr-5">
                          <Heart className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">98.2%</p>
                          <p className="text-gray-500 text-md mb-2">
                            Cobertura Vacinal Infantil
                          </p>
                          <div className="flex items-center bg-emerald-100 py-1 px-5 rounded-xl w-39">
                            <Trophy
                              className="text-emerald-900 mr-2"
                              size={16}
                            />
                            <p className="text-emerald-700 font-semibold text-sm">
                              Meta atingida
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* card-b */}

                      {/* card-c */}
                      <div className="flex p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mt-4 sm:mt-0">
                        <div className="bg-purple-100 p-4 h-15 rounded-xl mr-5">
                          <Calendar className="text-purple-900" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">15.420</p>
                          <p className="text-gray-500 text-md mb-2">
                            Consulta agendadas
                          </p>
                          <div className="flex items-center bg-emerald-100 py-1 px-4 rounded-xl">
                            <TrendingUp
                              className="text-emerald-700 mr-2"
                              size={16}
                            />
                            <p className="text-emerald-700 font-semibold text-sm">
                              Esta semana
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* card-c */}

                      {/* card-d */}
                      <div className="flex p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mt-4 sm:mt-0">
                        <div className="bg-orange-100 p-4 h-15 rounded-xl mr-5">
                          <Activity className="text-orange-900" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">4.2</p>
                          <p className="text-gray-500 mb-2">
                            Tempo médio de espera {"(min)"}
                          </p>
                          <div className="flex items-center bg-emerald-100 py-1 px-4 rounded-xl w-48">
                            <TrendingDown
                              className="text-emerald-700 mr-2"
                              size={16}
                            />
                            <p className="text-emerald-700 font-semibold text-sm">
                              -15% vs. mês anterior
                            </p>
                          </div>
                        </div>
                      </div>
                      {/* card-d */}
                    </div>
                  </div>
                  {/* dash-access-button-starts */}
                  <div className="flex justify-center w-full mt-20">
                    <div className="flex justify-center items-center border-2 border-emerald-700 p-4 rounded-xl lg:w-1/4">
                      <LogIn className="mr-5 text-emerald-700" />
                      <p className="font-bold text-emerald-700">
                        Acessar Dashboard Completo
                      </p>
                    </div>
                  </div>

                  {/* dash-access-button-ends */}
                </section>
                {/* grid-ends */}
              </div>
            </div>
          </section>
          {/*indicadores-ends*/}

          {/* services-starts */}
          <section
            id="services"
            className="px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-24 bg-linear-to-r from-white to-white"
          >
            <div className="flex justify-center">
              <div>
                {/* flag-starts */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-5 py-2 text-sm text-emerald-700 mb-8 font-semibold">
                    <span>O que oferecemos</span>
                  </span>
                </div>
                {/* flag-ends */}

                {/* title-starts */}
                <div>
                  <div>
                    <h1 className="text-center font-bold leading-tight mb-6 text-4xl sm:text-2xl md:text-5xl lg:flex lg:justify-center lg:text-6xl xl:text-6xl">
                      Serviços de{" "}
                      <span id="health2" className="text-emerald-700">
                        saúde
                      </span>
                    </h1>
                    <p className="text-center text-gray-600 mb-8 text-base sm:text-lg md:text-xl lg:w-full justify-center">
                      Conheça os principais serviços oferecidos pela rede
                      municipal de saúde para você e sua familia.
                    </p>
                  </div>
                </div>
                {/* title-ends */}

                {/* grid-starts */}
                <div className="bg-linear-to-r from-white to-white w-full">
                  <div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                      {/* card-a */}
                      <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mb-4 sm:mb-0 sm:p-6">
                        <div className="flex bg-emerald-100 justify-center items-center h-14 w-14 rounded-xl mr-5 mb-4">
                          <Home className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">
                            Atenção básica
                          </p>
                          <p className="text-gray-500 text-md mb-4">
                            Atendimento nas Unidades Básicas de Saúde com
                            equipes multiprofissionais para cuidar da sua saúde
                            de forma integral.
                          </p>
                          <div className="flex items-center">
                            <p className="text-emerald-700 font-bold">
                              Saiba mais
                            </p>
                            <ArrowRight
                              className="text-emerald-700 ml-2"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>
                      {/* card-a */}

                      {/* card-b */}
                      <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mb-4 sm:mb-0">
                        <div className="flex bg-emerald-100 justify-center items-center h-14 w-14 rounded-xl mr-5 mb-4">
                          <Heart className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">Vacinação</p>
                          <p className="text-gray-500 text-md mb-4">
                            Calendário completo de vacinação para todas as
                            idades, incluindo campanhas especiais e vacinas do
                            PNI.
                          </p>
                          <div className="flex items-center">
                            <p className="text-emerald-700 font-bold">
                              Saiba mais
                            </p>
                            <ArrowRight
                              className="text-emerald-700 ml-2"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>
                      {/* card-b */}

                      {/* card-c */}
                      <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mb-4 sm:mb-0">
                        <div className="flex bg-emerald-100 justify-center items-center h-14 w-14 rounded-xl mr-5 mb-4">
                          <Circle className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">
                            Especialidades
                          </p>
                          <p className="text-gray-500 text-md mb-4">
                            Consultas especializadas em diversas áreas médicas,
                            com encaminhamento pea atenção básica.
                          </p>
                          <div className="flex items-center">
                            <p className="text-emerald-700 font-bold">
                              Saiba mais
                            </p>
                            <ArrowRight
                              className="text-emerald-700 ml-2"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>
                      {/* card-c */}

                      {/* card-d */}
                      <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mb-4 sm:mb-0">
                        <div className="flex bg-emerald-100 justify-center items-center h-14 w-14 rounded-xl mr-5 mb-4">
                          <Activity className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">Urgência</p>
                          <p className="text-gray-500 text-md mb-4">
                            Atendimento de urgência 24 horas nas UPAs e
                            pronto-atendimentos distribuídos pelo município.
                          </p>
                          <div className="flex items-center">
                            <p className="text-emerald-700 font-bold">
                              Saiba mais
                            </p>
                            <ArrowRight
                              className="text-emerald-700 ml-2"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>
                      {/* card-d */}

                      {/* card-e */}
                      <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mb-4 sm:mb-0">
                        <div className="flex bg-emerald-100 justify-center items-center h-14 w-14 rounded-xl mr-5 mb-4">
                          <Monitor className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">
                            Telemedicina
                          </p>
                          <p className="text-gray-500 text-md mb-4">
                            Consultas online com profissionais de saúde,
                            facilitando o acesso ao atendimento médico.
                          </p>
                          <div className="flex items-center">
                            <p className="text-emerald-700 font-bold">
                              Saiba mais
                            </p>
                            <ArrowRight
                              className="text-emerald-700 ml-2"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>
                      {/* card-e */}

                      {/* card-f */}
                      <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mb-4 sm:mb-0">
                        <div className="flex bg-emerald-100 justify-center items-center h-14 w-14 rounded-xl mr-5 mb-4">
                          <Brain className="text-emerald-700" size={24} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">
                            Saúde Mental
                          </p>
                          <p className="text-gray-500 mb-4 text-md">
                            Atendimento psicológico e psiquiátrico através dos
                            CAPs e rede de atenção psicossocial.
                          </p>
                          <div className="flex items-center">
                            <p className="text-emerald-700 font-bold">
                              Saiba mais
                            </p>
                            <ArrowRight
                              className="text-emerald-700 ml-2"
                              size={16}
                            />
                          </div>
                        </div>
                      </div>
                      {/* card-f */}
                    </div>
                  </div>
                </div>
                {/* grid-ends */}
              </div>
            </div>
          </section>
          {/* services-ends */}

          {/* health-units-starts */}
          <section
            id="units"
            className="px-4 pb-20 pt-20 sm:px-6 lg:px-10 sm:pt-20 bg-linear-to-r from-white to-gray-50"
          >
            <div className="">
              <div className="">
                {/* flag-starts */}
                <div className="flex justify-center">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-5 py-2 text-sm text-emerald-700 mb-8 font-semibold">
                    <span>O que oferecemos</span>
                  </span>
                </div>
                {/* flag-ends */}

                {/* title-starts */}
                <div className="flex justify-center">
                  <div>
                    <h1 className="text-center font-bold leading-tight mb-6 text-4xl sm:text-2xl md:text-5xl lg:flex lg:justify-center lg:text-6xl xl:text-6xl lg:mb-4">
                      Unidades de{" "}
                      <span id="health3" className="text-emerald-700 lg:ml-4">
                        saúde
                      </span>
                    </h1>
                    <p className="text-center text-gray-600 mb-8 text-base sm:text-lg md:text-xl lg:w-full justify-center lg:mb-8">
                      Encontre a unidade de saúde mais próxima de você e confira
                      os horários de funcionamento.
                    </p>
                  </div>
                </div>
                {/* title-ends */}

                {/*  */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                  <div className="w-full">
                    <div className="h-full">
                      <div className="border h-full border-gray-200 rounded-xl mb-2">
                        <div className="flex justify-center items-center h-120 lg:h-full w-full">
                          <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL_HERE"
                            className="w-full h-full border-0 outline-none select-none rounded-xl"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <div>
                      {/* card-a-starts */}
                      <div className="border border-gray-200 rounded-xl w-full mb-2 p-6">
                        <div className="flex bg-gray-100 justify-center items-center h-8 w-14 rounded-xl mb-2">
                          <p className="text-emerald-700 font-bold">UBS</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">UBS Centro</p>
                          <div className="text-gray-500 text-md">
                            <div className="flex mb-2">
                              <MapPin className="mr-2" />
                              <p>Rua Koesa, 234 - Centro</p>
                            </div>
                            <div className="flex">
                              <Clock className="mr-2" />
                              <p>Seg-Sex: 7h às 19h</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card-a-ends */}

                      {/* card-b-starts */}
                      <div className="border border-gray-200 rounded-xl w-full mb-2 p-6">
                        <div className="flex bg-red-100 justify-center items-center h-8 w-14 rounded-xl mb-2">
                          <p className="text-red-700 font-bold">UPA</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">
                            UPA Praia Comprida
                          </p>
                          <div className="text-gray-500 text-md">
                            <div className="flex mb-2">
                              <MapPin className="mr-2" />
                              <p>Av. Acioni Souza Filho, 1500</p>
                            </div>
                            <div className="flex">
                              <Clock className="mr-2" />
                              <p className="text-red-700 font-bold">24hrs</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card-b-ends */}

                      {/* card-a-starts */}
                      <div className="border border-gray-200 rounded-xl w-full mb-2 p-6">
                        <div className="flex bg-purple-100 justify-center items-center h-8 w-14 rounded-xl mb-2">
                          <p className="text-purple-700 font-bold">CAPS</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold mb-4">CAPS 2</p>
                          <div className="text-gray-500 text-md">
                            <div className="flex mb-2">
                              <MapPin className="mr-2" />
                              <p>Rua Vereador Arthur Manoel Mariano, 86</p>
                            </div>
                            <div className="flex">
                              <Clock className="mr-2" />
                              <p>Seg-Sex: 7h às 19h</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* card-a-ends */}

                      {/* all-unit-button-starts */}
                      <div className="">
                        <div className="flex justify-center items-center border-2 border-emerald-700 p-4 rounded-xl cursor-pointer mt-6 hover:shadow-md">
                          <p className="font-bold text-emerald-700">
                            Ver todas as unidades
                          </p>
                          <ArrowRight
                            size={20}
                            className="ml-2 text-emerald-700"
                          />
                        </div>
                      </div>
                      {/* all-units-button-ends */}
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </section>
          {/* health-units-ends */}

          {/* latest-news-starts */}
          <section
            id="latest"
            className="px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-24 bg-linear-to-r from-white to-white"
          >
            <div>
              <div>
                {/* flag-starts */}
                <div className="flex justify-center mb-12">
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-5 py-2 text-sm text-emerald-700 font-semibold">
                    <span>O que oferecemos</span>
                  </span>
                </div>
                {/* flag-ends */}

                {/* title-starts */}
                <div className="flex justify-center mb-6">
                  <div className="flex-col w-full">
                    <h1 className="text-center font-bold leading-tight mb-6 text-4xl sm:text-2xl md:text-5xl lg:text-6xl xl:text-6xl w-full">
                      Últimas{" "}
                      <span id="news" className="text-emerald-700">
                        notícias
                      </span>
                    </h1>
                    <p className="text-center text-gray-600 text-base  sm:text-lg md:text-xl w-full">
                      Acompanhe as novidades, campanhas e informações
                      importantes sobre a saúde no município.
                    </p>
                  </div>
                </div>
                {/* title-ends */}

                {/*  */}
                <div className="flex">
                  <div className="flex flex-col lg:flex-row w-full gap-4">
                    {/*left-side*/}
                    <div className="w-full lg:w-[60%] h-full">
                      <div className="w-full h-full">
                        {/* card-a */}
                        <div className="h-full">
                          <div className="h-full">
                            <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full h-full">
                              <img
                                className="w-full rounded-t-xl mb-4"
                                src="/src/assets/360_F_377345078_yMd6eINlkVNcu9XYn3CMAyZgdu3lEMq3.jpg"
                                alt=""
                              />
                              {/* flag-starts */}
                              <div className="flex items-center">
                                <div className="flex justify-center items-center bg-gray-100 h-8 w-22 rounded-xl mr-2">
                                  <p className="text-emerald-700 text-sm font-semibold">
                                    Campanha
                                  </p>
                                </div>
                                <p className="text-sm text-gray-600">
                                  15/01/2026
                                </p>
                              </div>
                              {/* flag-ends */}

                              {/* title-starts */}
                              <div>
                                <p className="text-2xl font-bold mb-4">
                                  Campanha de Vacinação contra gripe atinge 95%
                                  da meta
                                </p>
                                <p className="text-gray-500 text-md mb-4">
                                  A secretaria Municipal de Saúde celebra o
                                  sucesso da campanha de vacinação contra a
                                  gripe, que atingiu 95% da meta estabelecida
                                  pelo Ministério da Saúde.
                                </p>
                                <div className="flex items-center">
                                  <p className="text-emerald-700 font-bold">
                                    Ler mais
                                  </p>
                                  <ArrowRight
                                    className="text-emerald-700 ml-2"
                                    size={16}
                                  />
                                </div>
                              </div>
                              {/* title-ends */}
                            </div>
                          </div>
                        </div>
                        {/* card-a */}
                      </div>
                    </div>
                    {/*left-side*/}

                    {/* right-side */}
                    <div className="w-full h-full lg:w-[40%]">
                      <div className="w-full h-full">
                        {/* right-side-card-a */}
                        <div className="">
                          <div className="">
                            <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full mb-4">
                              <img
                                className="w-full rounded-t-xl mb-2"
                                src="/src/assets/360_F_377345078_yMd6eINlkVNcu9XYn3CMAyZgdu3lEMq3.jpg"
                                alt=""
                              />
                              {/* flag-starts */}
                              <div className="flex items-center mb-2">
                                <div className="flex justify-center items-center bg-gray-100 h-6 w-15 rounded-xl mr-2">
                                  <h2 className="text-emerald-700 text-sm font-semibold">
                                    Serviço
                                  </h2>
                                </div>
                                <p className="text-sm text-gray-600">
                                  15/01/2026
                                </p>
                              </div>
                              {/* flag-ends */}

                              {/* title-starts */}
                              <div>
                                <h2 className="text-2xl font-bold mb-4">
                                  Nova UBS será inaugurada em Forquilhas
                                </h2>
                                <div className="flex items-center">
                                  <p className="text-emerald-700 font-bold">
                                    Ler mais
                                  </p>
                                  <ArrowRight
                                    className="text-emerald-700 ml-2"
                                    size={16}
                                  />
                                </div>
                              </div>
                              {/* title-ends */}
                            </div>
                          </div>
                        </div>
                        {/* right-side-card-a */}

                        {/* right-side-card-a */}
                        <div>
                          <div className="">
                            <div className="flex-row p-8 border border-gray-200 bg-white shadow-md rounded-xl w-full">
                              <img
                                className="w-full rounded-t-xl mb-2"
                                src="/src/assets/360_F_377345078_yMd6eINlkVNcu9XYn3CMAyZgdu3lEMq3.jpg"
                                alt=""
                              />
                              {/* flag-starts */}
                              <div className="flex items-center mb-2">
                                <div className="flex justify-center items-center bg-gray-100 h-6 w-15 rounded-xl mr-2">
                                  <h2 className="text-emerald-700 text-sm font-semibold">
                                    Serviço
                                  </h2>
                                </div>
                                <p className="text-sm text-gray-600">
                                  15/01/2026
                                </p>
                              </div>
                              {/* flag-ends */}

                              {/* title-starts */}
                              <div>
                                <h2 className="text-2xl font-bold mb-4">
                                  Nova UBS será inaugurada em Forquilhas
                                </h2>
                                <div className="flex items-center">
                                  <p className="text-emerald-700 font-bold">
                                    Ler mais
                                  </p>
                                  <ArrowRight
                                    className="text-emerald-700 ml-2"
                                    size={16}
                                  />
                                </div>
                              </div>
                              {/* title-ends */}
                            </div>
                          </div>
                        </div>
                        {/* right-side-card-a */}
                      </div>
                    </div>
                    {/* right-side */}
                  </div>
                </div>
                {/*  */}

                {/* situation-room-redo-starts */}
                <div>
                  <div>
                    <div className="flex justify-between border items-center border-gray-300 bg-linear-to-r from-emerald-600 to-emerald-800 py-10 px-10 rounded-xl lg:p-16 mt-6">
                      <div>
                        {/*  */}
                        <div>
                          <h1 className="text-white text-2xl font-bold">
                            Acesse a Sala de Situação
                          </h1>
                          <p className="text-white text-sm mt-4">
                            Profissionais de saúde podem acessar o painel
                            completo com indicadores, relatórios e ferramentas
                            de gestão.
                          </p>
                        </div>
                        {/*  */}

                        {/* button-a-starts*/}
                        <div className="flex gap-3 mt-6">
                          <div className="flex border border-white rounded-xl py-2 px-3 bg-white cursor-pointer items-center">
                            {/* login */}
                            <button
                              onClick={() => {
                                setIsAuthOpen(true);
                              }}
                              className="flex text-emerald-600 font-semibold cursor-pointer items-center"
                            >
                              Fazer Login
                            </button>
                            {/* login */}

                            <LogInIcon className="ml-2 text-emerald-600" />
                          </div>
                          <div className="cursor-pointer">
                            <button
                              onClick={() => {
                                setIsRegisterOpen(true);
                              }}
                              className="text-white font-semibold border border-white py-2 px-3 rounded-xl bg-emerald-600 cursor-pointer"
                            >
                              Criar conta
                            </button>
                          </div>
                        </div>
                        {/*button-a-ends*/}
                      </div>
                      <div>
                        {/* right-side-starts */}
                        <div className="hidden lg:flex">
                          <div className="flex bg-emerald-700 p-5 rounded-xl">
                            <LayoutDashboard size={35} className="text-white" />
                          </div>
                        </div>
                        {/* right-side-ends */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* situation-room-redo-ends */}
              </div>
            </div>
          </section>
          {/* latest-news-ends */}

          {/* contact-us-starts */}
          <section
            id="contact"
            className="px-4 pt-20 lg:px-10 pb-20 bg-linear-to-r from-white to-white"
          >
            <div>
              <div>
                <div>
                  {/* left-side-starts */}

                  <div className="flex">
                    <div className="flex flex-col lg:flex-row w-full gap-4">
                      {/* left-side */}
                      <div className="w-full lg:w-1/2">
                        {/* flag-starts */}
                        <div className="flex justify-center lg:justify-left">
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-5 py-2 text-sm text-emerald-700 mb-8 font-semibold">
                            <span>Fale conosco</span>
                          </span>
                        </div>
                        {/* flag-ends */}

                        {/* title-starts */}
                        <div>
                          <h1 className="text-center lg:text-left font-bold leading-tight mb-6 text-4xl sm:text-2xl md:text-5xl lg:text-6xl xl:text-6xl ">
                            Entre em{" "}
                            <span id="health3" className="text-emerald-700">
                              contato
                            </span>
                          </h1>
                          <p className="text-center lg:text-left text-gray-600 mb-8 text-base sm:text-lg md:text-xl">
                            Tem dúvidas ou sugestões? Entre em contato com a
                            Secretaia Municipal de Saúde.
                          </p>
                        </div>
                        {/* title-ends */}
                        <div>
                          <div className="">
                            {/* card-a */}
                            <div className="flex w-full mb-4">
                              <div className="bg-emerald-100 p-3 h-12 rounded-xl mr-3">
                                <MapPin
                                  className="text-emerald-900"
                                  size={20}
                                />
                              </div>
                              <div>
                                <p className="text-xs text-500 font-bold">
                                  Endereço
                                </p>
                                <p className="text-gray-700 mb-2">
                                  Av. Acioni Souza Filho, s/n, Centro, São
                                  José/SC
                                </p>
                              </div>
                            </div>
                            {/* card-a */}

                            {/* card-a */}
                            <div className="flex w-full mb-4">
                              <div className="bg-emerald-100 p-3 h-12 rounded-xl mr-3">
                                <Phone className="text-emerald-900" size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-700 font-bold">
                                  Telefone
                                </p>
                                <p className="text-gray-700 mb-2">
                                  (48) 3381-0000
                                </p>
                              </div>
                            </div>
                            {/* card-a */}

                            {/* card-a */}
                            <div className="flex w-full">
                              <div className="bg-emerald-100 py-3 px-3 h-12 rounded-xl mr-3">
                                <Mail className="text-emerald-900" size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-700 font-bold">
                                  E-mail
                                </p>
                                <p className="text-gray-700">
                                  saude@saojose.sc.gov.br
                                </p>
                              </div>
                            </div>
                            {/* card-a */}

                            {/* social-media-icons-starts */}
                            <div className="flex gap-2 mt-4">
                              <div className="p-3 bg-gray-100 rounded-xl"></div>
                              <div className="p-3 bg-gray-100 rounded-xl"></div>
                              <div className="p-3 bg-gray-100 rounded-xl"></div>
                            </div>
                            {/* social-media-icons-ends */}
                          </div>
                        </div>
                      </div>
                      {/* left-side */}

                      {/* right-side */}
                      <div className="w-full items-center justidy-center lg:w-1/2">
                        <div>
                          <div className="border border-gray-300 rounded-xl shadow-xl px-4 py-6">
                            <form className="">
                              <div>
                                {/* title-starts */}
                                <div>
                                  <label className="label">
                                    <span className="label-text text-sm font-semibold">
                                      Seu nome
                                    </span>
                                  </label>
                                  <input
                                    type="text"
                                    className="border rounded-xl border-gray-300 w-full h-10 pl-3 text-sm text-gray-500 focus:outline-none"
                                    placeholder="digite seu nome"
                                  />
                                </div>
                                {/* title-ends */}

                                {/* title-starts */}
                                <div className="mt-4">
                                  <label className="label">
                                    <span className="label-text text-sm font-semibold">
                                      E-mail
                                    </span>
                                  </label>
                                  <input
                                    type="text"
                                    className="border rounded-xl border-gray-300 w-full h-10 pl-3 text-sm text-gray-500 focus:outline-none"
                                    placeholder="seu@email.com"
                                  />
                                </div>
                                {/* title-ends */}

                                {/* title-starts */}
                                <div className="flex flex-col mt-4">
                                  <label className="label">
                                    <span className="label-text text-sm font-semibold">
                                      Assunto
                                    </span>
                                  </label>
                                  <select className="border rounded-xl border-gray-300 w-full h-10 pl-3 text-sm text-gray-500 focus:outline-none">
                                    <option className="flex items-center">
                                      Selecione o assunto
                                    </option>
                                  </select>
                                </div>
                                {/* title-ends */}

                                {/* tools-starts */}
                                <div className="mt-4">
                                  <label className="label">
                                    <span className="label-text text-sm font-semibold">
                                      Message
                                    </span>
                                  </label>
                                  <textarea
                                    className="textarea textarea-bordered rounded-md border border-gray-300 w-full min-h-25 pt-3 pl-3 text-sm text-gray-500 focus:outline-none"
                                    placeholder="Escreva sua mensagem..."
                                  ></textarea>
                                  <div className="flex flex-1 justify-end"></div>
                                  <div></div>
                                </div>
                                {/* tools-ends */}
                                {/* button-starts */}
                                <div className="flex justify-center items-center border border-gray-300 rounded-xl bg-linear-to-r from-emerald-700 to-emerald-900 p-4 mt-4 shadow-md">
                                  <button className="text-white font-semibold text-sm">
                                    Enviar Messagem
                                  </button>
                                  <Send size={20} className="text-white ml-2" />
                                </div>
                                {/* button-ends */}
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      {/* right-side */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* contact-us-ends */}

          {/* footer-starts */}
          <footer className="px-4 bg-black pt-20 pb-20 lg:px-10">
            <div>
              <div className="pt-10">
                {/* grid-starts */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
                  {/* logo-starts */}
                  <div className="flex items-center gap-3 mb-8 lg:mb-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center">
                      <Plus className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl text-white">
                        Saúde São José
                      </p>
                      <p className="text-1xl text-white">
                        Secretaria Municipal de Saúde
                      </p>
                    </div>
                  </div>
                  {/* logo-ends */}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full lg:w-[70%] mx-auto text-center">
                    <div className="flex flex-col">
                      <p className="text-white font-bold">Links Rápidos</p>
                      <a href="" className="text-gray-500">
                        Início
                      </a>
                      <a href="" className="text-gray-500">
                        Indicadores
                      </a>
                      <a href="" className="text-gray-500">
                        Serviços
                      </a>
                      <a href="" className="text-gray-500">
                        Unidades
                      </a>
                    </div>

                    <div className="flex flex-col">
                      <p className="text-white font-bold">Serviços</p>
                      <a href="" className="text-gray-500">
                        Agendamento Online
                      </a>
                      <a href="" className="text-gray-500">
                        Cartão SUS
                      </a>
                      <a href="" className="text-gray-500">
                        Vacinação
                      </a>
                      <a href="" className="text-gray-500">
                        Ouvidoria
                      </a>
                    </div>

                    <div className="flex flex-col text-center">
                      <p className="text-white font-bold">Institucional</p>
                      <a href="" className="text-gray-500">
                        Sobre a Secretaria
                      </a>
                      <a href="" className="text-gray-500">
                        Transparência
                      </a>
                      <a href="" className="text-gray-500">
                        Legislação
                      </a>
                      <a href="" className="text-gray-500">
                        Política de Privacidade
                      </a>
                    </div>
                  </div>
                </div>
                {/* grid-ends */}

                {/*  */}
                <div className="flex flex-col lg:flex-row lg:justify-between mt-20 border-t">
                  <div className="text-center mt-10">
                    <p className="text-gray-500">
                      2025 Secretaria Municipal de Saúde de São José. Todos os
                      direitos reservados.
                    </p>
                  </div>
                  <div className="flex justify-center mt-10 text-center">
                    <Building className="mr-2 text-gray-500" />
                    <p className="text-gray-500">
                      Prefeitura Municipal de São José - SC
                    </p>
                  </div>
                </div>
                {/*  */}
                {/*  */}
                <div className="flex flex-1 justify-center items-center w-full">
                  <div className="flex flex-1 w-full">
                    <p className="text-gray-500">
                      Desenvolvido por{" "}
                      <a
                        href="https://www.linkedin.com/in/vitor-alex-souza-oliveira-73972b288/"
                        target="_blank" // Opens in a new tab
                        rel="noopener noreferrer" // Security: prevents the new tab from accessing your app's window
                        className="underline hover:text-blue-500 cursor-pointer"
                      >
                        Vitor Alex
                      </a>
                    </p>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>
          </footer>
          {/* footer-starts */}
        </div>
      </div>
      <LoginPopUpUI
        isOpen={isAuthOpen}
        setIsOpen={setIsAuthOpen}
        // selectedTask={selectedTask}
      />
      <RegisterPopUpUI
        isOpen={isRegisterOpen}
        setIsOpen={setIsRegisterOpen}
        // selectedTask={selectedTask}
      />
    </main>
  );
};

/* ================= COMPONENTS ================= */

const HealthBars = () => {
  return (
    <div className="flex items-end justify-between h-28 w-full">
      <div className="w-12 h-12 bg-emerald-700 rounded-t-xl" />
      <div className="w-12 h-16 bg-emerald-700 rounded-t-xl" />
      <div className="w-12 h-9 bg-emerald-700 rounded-t-xl" />
      <div className="w-12 h-22 bg-emerald-700 rounded-t-xl" />
      <div className="w-12 h-16 bg-emerald-700 rounded-t-xl" />
      <div className="w-12 h-10 bg-emerald-700 rounded-t-xl" />
    </div>
  );
};

const Section = ({ title, badge, children }) => (
  <section className="px-10 py-24 text-center bg-emerald-50">
    <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm mb-4">
      {badge}
    </span>
    <h2 className="text-4xl font-bold mb-12">
      {title.split(" ").slice(0, -1).join(" ")}{" "}
      <span className="italic text-emerald-700">
        {title.split(" ").slice(-1)}
      </span>
    </h2>
    {children}
  </section>
);

const StatUnit = ({ value, label }) => (
  <div className="flex items-center justify-center sm:border-r pr-12 text-gray-300">
    <div className="flex-col">
      <p className="text-center text-5xl font-bold text-emerald-700">{value}</p>
      <p className="text-center text-sm text-gray-600">{label}</p>
      <div className="flex border-b sm:boder-none md:border-none lg:border-none mt-10 justify-center items-center"></div>
    </div>
  </div>
);

const StatAtend = ({ value, label }) => (
  <div className="flex items-center justify-center sm:border-r pr-12 text-gray-300">
    <div className="flex-col">
      <p className="text-center text-5xl font-bold text-emerald-700">{value}</p>
      <p className="text-center text-sm text-gray-600">{label}</p>
      <div className="flex border-b sm:boder-none md:border-none lg:border-none mt-10 justify-center items-center"></div>
    </div>
  </div>
);

const StatVac = ({ value, label }) => (
  <div className="flex items-center justify-center border-none sm:border-r md:border-r-none lg:border-r-none pr-12 text-gray-300">
    <div className="flex-col">
      <p className="text-center text-5xl font-bold text-emerald-700">{value}</p>
      <p className="text-center text-sm text-gray-600">{label}</p>
      <div className="flex border-b sm:boder-none md:border-none lg:border-none mt-10 justify-center items-center"></div>
    </div>
  </div>
);

const Card = ({ title, subtitle, note }) => (
  <div className="bg-white p-6 rounded-xl shadow text-left">
    <p className="text-2xl font-bold mb-2">{title}</p>
    <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
      {note}
    </span>
  </div>
);

const Service = ({ title }) => (
  <div className="bg-white p-6 rounded-xl shadow text-left">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-500">Saiba mais →</p>
  </div>
);

const Unit = ({ name, hours }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-gray-500">{hours}</p>
  </div>
);

const News = ({ title }) => (
  <div className="bg-white p-6 rounded-xl shadow text-left">
    <div className="bg-gray-100 h-32 rounded mb-4" />
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-emerald-700 mt-2">Ler mais →</p>
  </div>
);

export default SystemHomePageUI;