import { LogOut, Menu } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import GSidebar from "./GSidebar";

const GNavbar = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate(ROUTES.UBS_FORQUILHAS);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogOut = () => {
    navigate(ROUTES.HOME);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main>
      <section>
        <div className="flex flex-1 justify-between items-center bg-gray-50 px-10 py-5 border-b border-gray-300">
          {/*  */}
          <div
            onClick={handleNavigateHome}
            className="flex items-center cursor-pointer"
          >
            <img
              src="/src/assets/pmsj.png"
              className="mr-4 w-22 h-auto"
              alt=""
            />
            <p className="font-semibold">Secretaria Municipal da Saúde</p>
          </div>
          <GSidebar />
          {/*  */}

        </div>


      </section>
    </main>
  );
};

export default GNavbar;