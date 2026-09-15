
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routing/routes.constants";
import pmsj from "../../assets/pmsj.png"

const Footer = () => {

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate(ROUTES.HOME);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <main className="">
      <section>
        <div>
        </div>
      </section>
      <section>
        <div>
        </div>
      </section>
    </main>
  );
};

export default Footer;