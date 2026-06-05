import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientHomePage from "./pages/PatientHomePage";
import DoctorPortalPage from "./pages/DoctorPortalPage";
import DoctorDashboard from "./components/doctor-portal/DoctorDashboard";
import AppointmentsPage from "./components/doctor-portal/AppointmentsPage";
import ManageAvailability from "./components/doctor-portal/ManageAvailability";
import PatientRecords from "./components/doctor-portal/PatientRecords";
import DoctorProfile from "./components/doctor-portal/DoctorProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Patient Facing Pages */}
        <Route path="/" element={<PatientHomePage />} />

        {/* Doctor Portal Staff Pages */}
        <Route path="/doctor" element={<DoctorPortalPage />}>
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="availability" element={<ManageAvailability />} />
          <Route path="records" element={<PatientRecords />} />
          <Route path="profile" element={<DoctorProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
