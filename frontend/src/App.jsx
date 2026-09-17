import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./app/routing/routes.constants.js";

// ---

// -------------
// >>> ADMIN <<<
// -------------
import AdminHomeUI from "./features/admin/pages/AdminHomeUI.jsx";

// --------------------------------------------
// >>> ADMINISTRATIVE-MANAGEMENT-DEPARTMENT <<<
// --------------------------------------------
import AdministrativeManagementDepartmentHomeUI from "./features/administrative-management-department/pages/AdministrativeManagementDepartmentHomeUI.jsx";
import DIRACFormUI from "./features/administrative-management-department/pages/DIRACFormUI.jsx";
import RHFormUI from "./features/administrative-management-department/pages/RHFormUI.jsx";

// -----------------------------
// >>> EMERGENCY-AND-URGENCY <<<
// -----------------------------
import EmergencyAndUrgentCareHomeUI from "./features/emergency-and-urgency-care-department/pages/EmergencyAndUrgencyCareHomeUI.jsx";

// ----------------------------------------
// >>> HEALTH-EDUCATION-SUPERINTENDENCY <<<
// ----------------------------------------
import HealthEducationDepartmentHomeUI from "./features/health-education-department/pages/HealthEducationDepartmentHomeUI.jsx";

// -------------------------------------
// >>> HEALTH-SURVEILANCE-DEPARTMENT <<<
// -------------------------------------
import HealthSurveillanceDepartmentHomeUI from "./features/health-surveillance-department/pages/HealthSurveillanceDepartmentHomeUI.jsx";
import VISAFormUI from "./features/health-surveillance-department/pages/VISAFormUI.jsx";
import VIEPFormUI from "./features/health-surveillance-department/pages/VIEPFormUI.jsx";

// -----------------------------
// >>> MUNICIPAL-HEALTH-FUND <<<
// -----------------------------
import MunicipalHealthFundHomeUI from "./features/muncipal-health-fund/pages/MunicipalHealthFundHomeUI.jsx";

// ---------------------
// >>> MUNICIPAL-LAB <<<
// ---------------------
import MunicipalLaboratoryHomeUI from "./features/municipal-laboratory/pages/MunicipalLaboratoryHomeUI.jsx";
import LABFormUI from "./features/municipal-laboratory/pages/LABFormUI.jsx";

// ------------------------------
// >>> PHARMACEUTICAL-SERVICE <<<
// ------------------------------
import PharmaceuticalServicesHomeUI from "./features/pharmaceutical-services/pages/PharmaceuticalServicesHomeUI.jsx";

// -------------------------
// >>> PRIMARY ATTENTION <<<
// -------------------------
import PrimaryAttentionHomeUI from "./features/primary-attention/pages/PrimaryAttentionHomeUI.jsx";
import SyphilisHomeUI from "./features/primary-attention/pages/SyphilisHomeUI.jsx";
import SBCFormUI from "./features/primary-attention/pages/SBCFormUI.jsx";
import SBFormUI from "./features/primary-attention/pages/SBFormUI.jsx";
import SDMFormUI from "./features/primary-attention/pages/SDMFormUI.jsx";
import SISABFormUI from "./features/primary-attention/pages/SISABFormUI.jsx";
import SdCFormUI from "./features/primary-attention/pages/SdCFormUI.jsx";
import TABFormUI from "./features/primary-attention/pages/TABFormUI.jsx";
import PAFormUI from "./features/primary-attention/pages/PAFormUI.jsx";
import CaseReportSyphilisFormUI from "./features/primary-attention/pages/CaseReportSyphilisFormUI.jsx";

// ----------------------------------
// >>> REGULATORY SUPERINTENDENCY <<<
// ----------------------------------
import RegulatorySuperintendencyHomeUI from "./features/regularoty-superintendency/pages/RegulatorySuperintendencyHomeUI.jsx";

// ------------
// >>> SAMU <<<
// ------------
import SAMUHomeUI from "./features/samu/pages/SAMUHomeUI.jsx";
import SAMUFormUI from "./features/samu/pages/SAMUFormUI.jsx";

// -----------------------------
// >>> SPECIALIZED ATTENTION <<<
// -----------------------------
import SpecializedAttentionHomeUI from "./features/specialized-attention/pages/SpecializedAttentionHomeUI.jsx";
import AEFormUI from "./features/specialized-attention/pages/AEFormUI.jsx";


// ----------------------------
// >>> STRATEGIC DEPARTMENT <<<
// ----------------------------
import StrategicDepartmentHomeUI from "./features/strategic-department/pages/StrategicDepartmentHomeUI.jsx";
import DCNTFormUI from "./features/strategic-department/pages/DCNTFormUI.jsx";
import PSEFormUI from "./features/strategic-department/pages/PSEFormUI.jsx";
import SMPFormUI from "./features/strategic-department/pages/SMPFormUI.jsx";


// -------------------
// >>> SYSTEM HOME <<<
// -------------------
import SystemHomePageUI from "./features/system-home/pages/SystemHomePageUI.jsx";

// -------------
// >>> USERS <<<
// -------------

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ADMIN */}
        <Route path={ROUTES.ADMIN_HOME_UI} element={<AdminHomeUI />} />

        {/* ADMINISTRATIVE-MANAGEMENT-DEPARTMENT */}
        <Route
          path={ROUTES.ADMINISTRATIVE_MANAGEMENT_DEPTO_HOME_UI}
          element={<AdministrativeManagementDepartmentHomeUI />}
        />
        <Route path={ROUTES.DIRAC_FORM_UI} element={<DIRACFormUI />} />
        <Route path={ROUTES.RH_FORM_UI} element={<RHFormUI />} />

        {/* EMERGENCY-AND-URGENCY */}
        <Route
          path={ROUTES.EMERGENCY_AND_URGENCY_HOME_UI}
          element={<EmergencyAndUrgentCareHomeUI />}
        />

        {/* HEALTH-EDUCATION-SUPERINTENDENCY */}
        <Route
          path={ROUTES.HEALTH_EDUCATION_DEPARTMENT_HOME_UI}
          element={<HealthEducationDepartmentHomeUI />}
        />

        {/* HEALTH-SURVEILANCE-DEPARTMENT */}
        <Route
          path={ROUTES.HEALTH_SURVEILLANCE_DEPARTMENT_HOME_UI}
          element={<HealthSurveillanceDepartmentHomeUI />}
        />
        <Route path={ROUTES.VISA_FORM_UI} element={<VISAFormUI />} />
        <Route path={ROUTES.VIEP_FORM_UI} element={<VIEPFormUI />} />

        {/* MUNNICIPAL-HEALTH-FUND */}
        <Route
          path={ROUTES.MUNICIPAL_HEALTH_FUND_HOME_UI}
          element={<MunicipalHealthFundHomeUI />}
        />

        {/* MUNICIPAL-LAB */}
        <Route
          path={ROUTES.MUNICIPAL_LAB_HOME_UI}
          element={<MunicipalLaboratoryHomeUI />}
        />
        <Route path={ROUTES.LAB_FORM_UI} element={<LABFormUI />} />

        {/* PHARMA-SERVICES */}
        <Route
          path={ROUTES.PHARMACEUTICAL_SERVICE_HOME_UI}
          element={<PharmaceuticalServicesHomeUI />}
        />

        {/* PRIMARY ATTENTION */}
        <Route
          path={ROUTES.PRIMARY_ATTENTION_HOME_UI}
          element={<PrimaryAttentionHomeUI />}
        />
        <Route path={ROUTES.SYPHILIS_HOME_UI} element={<SyphilisHomeUI />} />
        <Route path={ROUTES.SBC_FORM_UI} element={<SBCFormUI />} />
        <Route path={ROUTES.SB_FORM_UI} element={<SBFormUI />} />
        <Route path={ROUTES.SDM_FORM_UI} element={<SDMFormUI />} />
        <Route path={ROUTES.SISAB_FORM_UI} element={<SISABFormUI />} />
        <Route path={ROUTES.SdC_FORM_UI} element={<SdCFormUI />} />
        <Route path={ROUTES.TAB_FORM_UI} element={<TABFormUI />} />
        <Route path={ROUTES.PA_FORM_UI} element={<PAFormUI />} />
        <Route path={ROUTES.CASE_REPORT_SYPHILIS_FORM_UI} element={<CaseReportSyphilisFormUI />} />

        {/* REGULATORY-SUPERINTENDENCY */}
        <Route path={ROUTES.REGULATORY_SUPERINTENDENCY_HOME_UI} element={<RegulatorySuperintendencyHomeUI />} />

        {/* SAMU */}
        <Route path={ROUTES.SAMU_HOME_UI} element={<SAMUHomeUI />} />
        <Route path={ROUTES.SAMU_FORM_UI} element={<SAMUFormUI />} />


        {/* SPECIALIZED ATTENTION */}
        <Route path={ROUTES.SPECIALIZED_ATTENTION_HOME_UI} element={<SpecializedAttentionHomeUI />} />
        <Route path={ROUTES.AE_FORM_UI} element={<AEFormUI />} />

        {/* STRATEGIC DEPARTMENT */}
        <Route path={ROUTES.DCNT_FORM_UI} element={<DCNTFormUI />} />
        <Route path={ROUTES.SMP_FORM_UI} element={<SMPFormUI />} />
        <Route path={ROUTES.PSE_FORM_UI} element={<PSEFormUI />} />
        <Route path={ROUTES.STRATEGIC_DEPARTMENT_HOME_UI} element={<StrategicDepartmentHomeUI />} />

        {/* SYSTEM */}
        <Route path={ROUTES.SYSTEM_HOME} element={<SystemHomePageUI />} />

        {/* USERS */}
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
