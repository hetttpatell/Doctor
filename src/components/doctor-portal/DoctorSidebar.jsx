import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  FolderHeart,
  User,
  LogOut,
} from "lucide-react";

export default function DoctorSidebar({ doctor, onLogout }) {
  const menuItems = [
    { label: "Dashboard", path: "/doctor", icon: LayoutDashboard, end: true },
    { label: "My Appointments", path: "/doctor/appointments", icon: CalendarDays },
    { label: "Manage Availability", path: "/doctor/availability", icon: Clock },
    { label: "Patient Records", path: "/doctor/records", icon: FolderHeart },
    { label: "My Profile", path: "/doctor/profile", icon: User },
  ];

  return (
    <>
      {/* Desktop Sidebar (fixed left, 260px wide) */}
      <aside className="hidden md:flex flex-col w-[260px] h-screen bg-color-portal-sidebar text-white fixed top-0 left-0 z-40 select-none">
        {/* Profile Card */}
        <div className="p-6 border-b border-white/10 flex items-center gap-4 text-left">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-color-portal-accent"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-sans font-semibold text-sm truncate">{doctor.name}</span>
            <span className="font-sans text-[11px] text-slate-400 truncate">{doctor.specialty} Specialist</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 text-left">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg text-body-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white/8 border-l-[3px] border-color-portal-accent pl-[13px]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="flex items-center gap-4 px-4 py-3 rounded-lg text-body-sm font-semibold w-full text-slate-400 hover:text-white hover:bg-white/5 transition-all text-left cursor-pointer focus:outline-none"
          >
            <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Tab Bar (bottom tab bar, collapses on mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-color-portal-sidebar border-t border-white/10 flex items-center justify-around z-40 select-none">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `p-2.5 rounded-lg transition-colors flex items-center justify-center ${
                  isActive ? "text-color-portal-accent bg-white/5" : "text-slate-400"
                }`
              }
              title={item.label}
            >
              <Icon className="w-6 h-6" strokeWidth={1.5} />
            </NavLink>
          );
        })}
        <button
          onClick={onLogout}
          className="p-2.5 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer focus:outline-none"
          title="Logout"
        >
          <LogOut className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>
    </>
  );
}
