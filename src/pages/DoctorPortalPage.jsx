import { useState, useEffect } from "react";
import DoctorLogin from "../components/doctor-portal/DoctorLogin";
import DoctorLayout from "../components/doctor-portal/DoctorLayout";

export default function DoctorPortalPage() {
  const [doctor, setDoctor] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if auth session exists in localStorage
    const session = localStorage.getItem("aarjav_doctor_session");
    if (session) {
      setDoctor(JSON.parse(session));
    }
    setCheckingAuth(false);
  }, []);

  const handleLogin = (doctorData) => {
    setDoctor(doctorData);
    localStorage.setItem("aarjav_doctor_session", JSON.stringify(doctorData));
  };

  const handleLogout = () => {
    setDoctor(null);
    localStorage.removeItem("aarjav_doctor_session");
  };

  const handleUpdateProfile = (updatedDoctorData) => {
    setDoctor(updatedDoctorData);
    localStorage.setItem("aarjav_doctor_session", JSON.stringify(updatedDoctorData));
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-color-portal-bg flex items-center justify-center">
        <span className="text-body-sm text-color-text-secondary animate-pulse">
          Loading Staff Session...
        </span>
      </div>
    );
  }

  if (!doctor) {
    return <DoctorLogin onLogin={handleLogin} />;
  }

  // Inject the logged-in doctor profile updates
  return (
    <DoctorLayout
      doctor={doctor}
      onLogout={handleLogout}
      onUpdateProfile={handleUpdateProfile}
    />
  );
}
