import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import Department from "./pages/Department/Department";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Layout from "./Component/Layout/Layout";
import Doctor from "./pages/Doctors/Doctor";
import HospitalAdminDashboard from "./pages/hospitalAdmin/Dashboard";
import AddNewStaff from "./pages/hospitalAdmin/AddNewStaff";
import EditViewStaff from "./pages/hospitalAdmin/EditViewStaff";
import PatientRecord from "./pages/hospitalAdmin/PatientRecord";
import RecordAuditLogs from "./pages/hospitalAdmin/RecordAuditLogs";
import StaffManagement from "./pages/hospitalAdmin/StaffManagement";
import ViewRecords from "./pages/hospitalAdmin/ViewRecords";
import ReceptionistDashboard from "./pages/receptionist/Dashboard";
import RegisteredPatient from "./pages/receptionist/RegisteredPatient";
import NewRegistration from "./pages/receptionist/NewRegistration";
import PatientRegistration from "./pages/receptionist/PatientRegistration";
import DoctorDashboard from "./pages/doctor/Dashboard";
import AssignedRecords from "./pages/doctor/AssignedRecords";
import PatientDetail from "./pages/Doctor/PatientDetail";
import TriageDashboard from "./pages/triage/Dashboard";
import ProcessPatient from "./pages/triage/PatientForm";
import UnassignedPatients from "./pages/triage/UnassignedPatient";
import DashboardLaboratorist from "./pages/labratorist/DashboardLaboratorist";
import LabRequests from "./pages/labratorist/LabRequests";
import LabForm from "./pages/labratorist/LabForm";
import AuthPage from "./pages/Auth/Auth";
import Patient from "./pages/Patient/Patient";
import Sidebar from "./components/layoutComponents/Sidebar";

const AppRoutes = ({ userRole }) => {
  const staffRoles = [
    "Admin",
    "HospitalAdministrator",
    "Receptionist",
    "Doctor",
    "Triage",
    "LabTechnician"
  ];

  const isStaffUser = staffRoles.includes(userRole);
  const isPatient = userRole === "Patient";

  return (
    <div className="flex">
      {/* Sidebar only for staff users on their routes */}
      {isStaffUser && (
        <div className="fixed top-0 left-0 h-full w-80 z-50 overflow-hidden">
          <Sidebar />
        </div>
      )}

      <div className={`flex-1 ${isStaffUser ? "ml-80" : ""}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/department" element={<Layout><Department /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/showDoctor" element={<Layout><Doctor /></Layout>} />
          <Route path="/login" element={<AuthPage />} />

          

          {/* Hospital Admin Routes */}
          {isStaffUser && userRole === "HospitalAdministrator" && (
            <>
              <Route path="/hospital-admin/dashboard" element={<HospitalAdminDashboard />} />
              <Route path="/hospital-admin/add-staff" element={<AddNewStaff />} />
              <Route path="/hospital-admin/edit-staff" element={<EditViewStaff />} />
              <Route path="/hospital-admin/patient-records" element={<PatientRecord />} />
              <Route path="/hospital-admin/audit-logs" element={<RecordAuditLogs />} />
              <Route path="/hospital-admin/staff-management" element={<StaffManagement />} />
              <Route path="/hospital-admin/view-records" element={<ViewRecords />} />
              <Route path="/hospital-admin" element={<Navigate to="/hospital-admin/dashboard" />} />
            </>
          )}

          {/* Receptionist Routes */}
          {isStaffUser && userRole === "Receptionist" && (
            <>
              <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
              <Route path="/receptionist/registration" element={<PatientRegistration />} />
              <Route path="/receptionist/registered/:faydaID" element={<RegisteredPatient />} />
              <Route path="/receptionist/newRegistration" element={<NewRegistration />} />
              <Route path="/receptionist" element={<Navigate to="/receptionist/dashboard" />} />
            </>
          )}

          {/* Triage Routes */}
          {isStaffUser && userRole === "Triage" && (
            <>
              <Route path="/triage/dashboard" element={<TriageDashboard />} />
              <Route path="/triage/process/:id" element={<ProcessPatient />} />
              <Route path="/triage/unassigned" element={<UnassignedPatients />} />
              <Route path="/triage" element={<Navigate to="/triage/dashboard" />} />
            </>
          )}

          {/* Doctor Routes */}
          {isStaffUser && userRole === "Doctor" && (
            <>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/assigned-records" element={<AssignedRecords />} />
              <Route path="/doctor/records/:patientId" element={<PatientDetail />} />
              <Route path="/doctor" element={<Navigate to="/doctor/dashboard" />} />
            </>
          )}

          {/* Lab Technician Routes */}
          {isStaffUser && userRole === "LabTechnician" && (
            <>
              <Route path="/laboratorist/dashboard" element={<DashboardLaboratorist />} />
              <Route path="/laboratorist/patientList" element={<LabRequests />} />
              <Route path="/laboratorist/requests/:id" element={<LabForm />} />
              <Route path="/laboratorist" element={<Navigate to="/laboratorist/dashboard" />} />
            </>
          )}

          {/* Patient Route */}
          {isPatient && (
            <Route path="/user" element={<Patient />} />
          )}

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;