import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore.js";
import {
  LayoutDashboardIcon,
  ClipboardCheckIcon,
  ListChecksIcon,
  Building2,
  RssIcon,
  PhoneIcon,
  LogOut,
  Menu,
  X,
  DoorOpen,
  DoorClosed,
} from "lucide-react";
import { ROUTES } from "../routing/routes.constants.js";

import logoPmsj3 from "../../assets/logoPmsj3.png";
// import LogoutPopUp from "../../features/auth/pages/LogoutPopUp";

const ACTIVE_ICONS = {
  "/administrative_management_depto/home": <DoorOpen size={20} />,
  "/strategic_department/home": <DoorOpen size={20} />,
  "/emergency_and_urgency/home": <DoorOpen size={20} />,
  "/health_education_superintendency/home": <DoorOpen size={20} />,
  "/health_surveillance_department/home": <DoorOpen size={20} />,
  "/municipal_laboratory/home": <DoorOpen size={20} />,
  "/municipal_health_fund/home": <DoorOpen size={20} />,
  "/pharmaceutical_services/home": <DoorOpen size={20} />,
  "/primary_attention/home": <DoorOpen size={20} />,
  "/regulatory_superintendency/home": <DoorOpen size={20} />,
  "/samu/home": <DoorOpen size={20} />,
  "/specialized_attention/home": <DoorOpen size={20} />,
  "/strategic_department/home": <DoorOpen size={20} />,
};

const INACTIVE_ICONS = {
  "/administrative_management_depto/home": <DoorClosed size={20} />,
  "/strategic_department/home": <DoorClosed size={20} />,
  "/emergency_and_urgency/home": <DoorClosed size={20} />,
  "/health_education_superintendency/home": <DoorClosed size={20} />,
  "/health_surveillance_department/home": <DoorClosed size={20} />,
  "/municipal_laboratory/home": <DoorClosed size={20} />,
  "/municipal_health_fund/home": <DoorClosed size={20} />,
  "/pharmaceutical_services/home": <DoorClosed size={20} />,
  "/primary_attention/home": <DoorClosed size={20} />,
  "/regulatory_superintendency/home": <DoorClosed size={20} />,
  "/samu/home": <DoorClosed size={20} />,
  "/specialized_attention/home": <DoorClosed size={20} />,
  "/strategic_department/home": <DoorClosed size={20} />,
};

const MENU_ITEMS = [
  {
    label: "Assistência Farmacêutica",
    path: "/pharmaceutical_services/home",
  },
  {
    label: "Atenção Especializada",
    path: "/specialized_attention/home",
  },
  {
    label: "Atenção Primária",
    path: "/primary_attention/home",
  },
  {
    label: "Departamento de Gestão Estratégica",
    path: "/strategic_department/home",
  },
  {
    label: "Fundo Municipal de Saúde",
    path: "/municipal_health_fund/home",
  },

  {
    label: "Gestão Administrativa",
    path: "/administrative_management_depto/home",
  },
  {
    label: "Laboratório Municipal",
    path: "/municipal_laboratory/home",
  },
  {
    label: "SAMU",
    path: "/samu/home",
  },
  {
    label: "Superintendência de Educação em Saúde",
    path: "/health_education_superintendency/home",
  },
  {
    label: "Superintendência de Regulação",
    path: "/regulatory_superintendency/home",
  },
  {
    label: "Superintendência de Vigilância em Saúde",
    path: "/health_surveillance_department/home",
  },

  {
    label: "Urgência & Emergência",
    path: "/emergency_and_urgency/home",
  },

  { icon: <LogOut size={20} />, label: "Sair" },
];

const GSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const logout = useAuthStore((state) => state.logout);

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleItemClick = (item) => {
    setIsOpen(false);
    window.scrollTo(0, 0);

    if (item.label === "Sair") {
      logout();
      navigate("/");
      return;
    }

    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      {/* Hamburger toggle — always visible */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        className="z-40 p-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
      >
        <Menu size={24} />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`
          fixed top-0 left-0 h-full w-80 bg-white z-50
          flex flex-col shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex justify-end mt-6 mr-6">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
            className="text-gray-500 hover:text-gray-800 hover:bg-gray-100 p-1 rounded-md transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center pb-4 border-b border-gray-100">
          <button
            onClick={() => {
              navigate("/dashboard/admin");
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-start cursor-pointer"
            aria-label="Ir para o início"
          >
            <img src={logoPmsj3} alt="PMSJ Logo" className="w-44 h-auto" />
            <p className="text-gray-400 text-xs mt-1">
              SGS - Sistema de Gestão da Saúde
            </p>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col px-4 py-4 space-y-1 overflow-y-auto flex-1">
          {MENU_ITEMS.map((item) => {
            const isActive = item.path && location.pathname === item.path;
            const IconComponent = item.path
              ? (isActive
                  ? ACTIVE_ICONS[item.path]
                  : INACTIVE_ICONS[item.path]) || item.icon
              : item.icon;

            return (
              <button
                key={item.label}
                onClick={() => handleItemClick(item)}
                className={`
          flex items-center gap-3 w-full text-left
          px-3 py-2.5 rounded-md text-sm font-medium
          transition-colors cursor-pointer
          ${isActive ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"}
        `}
              >
                <span
                  className={`shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`}
                >
                  {IconComponent}
                </span>
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default GSidebar;