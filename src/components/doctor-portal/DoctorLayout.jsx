import { Outlet } from "react-router-dom";
import DoctorSidebar from "./DoctorSidebar";

export default function DoctorLayout({ doctor, onLogout, onUpdateProfile }) {
  return (
    <div className="min-h-screen bg-color-portal-bg text-color-text-primary flex">
      {/* Sidebar Navigation */}
      <DoctorSidebar doctor={doctor} onLogout={onLogout} />

      {/* Main Content Area */}
      <main className="flex-grow md:pl-[260px] pb-20 md:pb-0 min-h-screen flex flex-col">
        <header className="bg-white border-b border-color-border/60 py-5 px-6 md:px-8 flex items-center justify-between shadow-xs select-none">
          <div className="flex flex-col text-left">
            <h1 className="text-body font-bold text-color-text-primary leading-tight">
              Clinical Portal
            </h1>
            <span className="text-caption text-color-text-secondary">
              Aarjav Hospital Staff Console
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-body-sm font-semibold text-color-text-secondary hidden sm:inline">
              Welcome, {doctor.name}
            </span>
            <div className="w-8 h-8 rounded-full bg-color-portal-accent/15 text-color-portal-accent flex items-center justify-center font-bold text-xs uppercase">
              {doctor.name.split(" ").pop().substring(0, 2)}
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <Outlet context={{ doctor, onLogout, onUpdateProfile }} />
        </div>
      </main>
    </div>
  );
}
