import { useState, useMemo, useEffect } from "react";
import { getAppointments, updateAppointmentStatus } from "../../data/appointments";
import { Calendar, CheckCircle2, AlertCircle, XCircle, Users, ArrowRight, X } from "lucide-react";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [selectedApt, setSelectedApt] = useState(null);

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Doctor ID filter - for demo let's assume dr-001 (Dr. Priya Sharma)
  const drId = "dr-001";

  const doctorApts = useMemo(() => {
    return appointments.filter((apt) => apt.doctorId === drId);
  }, [appointments, drId]);

  // Today's appointments for this doctor
  const todayApts = useMemo(() => {
    return doctorApts.filter((apt) => apt.date === todayStr);
  }, [doctorApts, todayStr]);

  // Upcoming appointments (next 7 days, excluding today)
  const upcomingApts = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysLater = new Date(today.getTime() + 7 * 86400000);
    sevenDaysLater.setHours(23, 59, 59, 999);

    return doctorApts
      .filter((apt) => {
        const d = new Date(apt.date);
        return apt.date !== todayStr && d >= today && d <= sevenDaysLater;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [doctorApts, todayStr]);

  // KPI Metrics calculations
  const stats = useMemo(() => {
    const todayCount = todayApts.length;
    const pendingCount = doctorApts.filter((apt) => apt.status === "pending").length;
    const weekCount = doctorApts.filter((apt) => {
      const diff = new Date(apt.date) - new Date(todayStr);
      return diff >= 0 && diff <= 7 * 86400000;
    }).length;
    const totalPatients = new Set(doctorApts.map((a) => a.patientPhone)).size;

    return [
      { label: "Today's Appointments", value: todayCount, icon: Calendar },
      { label: "Pending Confirmations", value: pendingCount, icon: AlertCircle },
      { label: "This Week Total", value: weekCount, icon: CheckCircle2 },
      { label: "Total Patients Served", value: totalPatients, icon: Users },
    ];
  }, [todayApts, doctorApts, todayStr]);

  const handleUpdateStatus = (id, status) => {
    const updated = updateAppointmentStatus(id, status);
    setAppointments(updated);
    if (selectedApt && selectedApt.id === id) {
      setSelectedApt({ ...selectedApt, status });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border border-green-200/50";
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200/50";
      case "cancelled":
        return "bg-red-50 text-red-700 border border-red-200/50";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-8 text-left">
      {/* 4 Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-color-portal-surface border border-color-border/60 rounded-lg p-6 shadow-sm flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-bold text-color-portal-accent leading-none">
                  {stat.value}
                </span>
                <span className="font-sans text-caption text-color-text-secondary mt-1.5 uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-color-portal-accent/10 text-color-portal-accent flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule panel */}
      <div className="bg-color-portal-surface border border-color-border/60 rounded-lg shadow-sm flex flex-col">
        <div className="p-6 border-b border-color-border/60 flex items-center justify-between select-none">
          <h2 className="font-serif text-xl font-semibold text-color-text-primary">
            Today&apos;s Consultations
          </h2>
          <span className="text-caption bg-color-portal-accent/10 text-color-portal-accent font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>

        {todayApts.length === 0 ? (
          <div className="p-12 text-center text-color-text-muted select-none">
            No consultations scheduled for today.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-body-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-color-border/60 select-none">
                  <th className="p-4 font-semibold text-color-text-primary w-28">Time</th>
                  <th className="p-4 font-semibold text-color-text-primary">Patient Name</th>
                  <th className="p-4 font-semibold text-color-text-primary max-md:hidden">Concern/Symptoms</th>
                  <th className="p-4 font-semibold text-color-text-primary w-32">Status</th>
                  <th className="p-4 font-semibold text-color-text-primary w-24 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {todayApts.map((apt) => (
                  <tr key={apt.id} className="border-b border-color-border/40 last:border-none hover:bg-slate-50/50">
                    <td className="p-4 font-semibold text-color-portal-accent">{apt.time}</td>
                    <td className="p-4 font-medium text-color-text-primary">{apt.patientName}</td>
                    <td className="p-4 text-color-text-secondary max-md:hidden truncate max-w-xs">{apt.symptoms}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-caption font-semibold uppercase tracking-wider ${getStatusBadgeClass(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => setSelectedApt(apt)}
                        className="text-color-portal-accent hover:underline text-caption font-bold cursor-pointer focus-blue"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upcoming (Next 7 Days) */}
      <div className="bg-color-portal-surface border border-color-border/60 rounded-lg shadow-sm p-6 flex flex-col">
        <h3 className="font-serif text-lg font-semibold text-color-text-primary mb-5 select-none">
          Upcoming Schedule (Next 7 Days)
        </h3>

        {upcomingApts.length === 0 ? (
          <div className="py-6 text-center text-color-text-muted select-none">
            No upcoming consultations for the next week.
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {upcomingApts.map((apt) => (
              <div
                key={apt.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-color-border/60 hover:border-color-portal-accent/40 rounded-lg bg-slate-50/30 transition-all gap-4"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className="bg-white border border-color-border px-3 py-2 rounded-lg text-center shrink-0 min-w-[70px] shadow-xs select-none">
                    <span className="block text-[10px] uppercase tracking-wider text-color-text-muted font-bold">
                      {new Date(apt.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="block font-serif text-xl font-bold text-color-portal-accent mt-0.5 leading-none">
                      {new Date(apt.date).getDate()}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-body-sm font-semibold text-color-text-primary">{apt.patientName}</span>
                    <span className="text-caption text-color-text-secondary mt-0.5">
                      {apt.time} &middot; {apt.symptoms.substring(0, 50)}...
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${getStatusBadgeClass(apt.status)}`}>
                    {apt.status}
                  </span>
                  <button
                    onClick={() => setSelectedApt(apt)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-color-portal-accent cursor-pointer focus-blue flex items-center gap-1 text-caption font-bold"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Side Sliding Drawer Detail Overlay */}
      {selectedApt && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none" role="dialog" aria-modal="true">
          {/* Drawer backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedApt(null)}
          />

          {/* Drawer Panel container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-xl flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="px-6 py-5 border-b border-color-border flex items-center justify-between bg-slate-50">
                <h3 className="font-serif text-lg font-semibold text-color-text-primary">
                  Consultation Details
                </h3>
                <button
                  onClick={() => setSelectedApt(null)}
                  className="p-1.5 -mr-1.5 rounded-lg text-color-text-muted hover:text-color-text-primary hover:bg-slate-200 transition-all cursor-pointer focus-blue"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 flex-1 flex flex-col gap-6 overflow-y-auto text-left">
                {/* Status indicator */}
                <div className="flex items-center justify-between pb-4 border-b border-color-border/60">
                  <span className="text-caption text-color-text-secondary uppercase tracking-widest font-semibold">
                    Current Status
                  </span>
                  <span className={`inline-flex px-3 py-1 rounded-full text-caption font-bold uppercase tracking-wider ${getStatusBadgeClass(selectedApt.status)}`}>
                    {selectedApt.status}
                  </span>
                </div>

                {/* Patient Information Block */}
                <div className="flex flex-col gap-4 text-body-sm text-color-text-primary">
                  <h4 className="font-sans font-bold text-slate-400 uppercase tracking-widest text-[10px] leading-none mb-1">
                    Patient Profile
                  </h4>
                  <div className="flex justify-between items-center">
                    <span className="text-color-text-secondary font-medium">Name:</span>
                    <span className="font-semibold">{selectedApt.patientName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-color-text-secondary font-medium">Phone:</span>
                    <a href={`tel:${selectedApt.patientPhone}`} className="font-semibold text-color-portal-accent hover:underline">{selectedApt.patientPhone}</a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-color-text-secondary font-medium">Email:</span>
                    <a href={`mailto:${selectedApt.patientEmail}`} className="font-semibold text-color-portal-accent hover:underline">{selectedApt.patientEmail || "N/A"}</a>
                  </div>
                </div>

                {/* Appointment Schedule Block */}
                <div className="flex flex-col gap-4 text-body-sm text-color-text-primary pt-4 border-t border-color-border/60">
                  <h4 className="font-sans font-bold text-slate-400 uppercase tracking-widest text-[10px] leading-none mb-1">
                    Consultation Schedule
                  </h4>
                  <div className="flex justify-between items-center">
                    <span className="text-color-text-secondary font-medium">Date:</span>
                    <span className="font-semibold">
                      {new Date(selectedApt.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-color-text-secondary font-medium">Time Slot:</span>
                    <span className="font-semibold text-color-portal-accent">{selectedApt.time}</span>
                  </div>
                </div>

                {/* Concern / Notes Block */}
                <div className="flex flex-col gap-2 pt-4 border-t border-color-border/60 text-left">
                  <h4 className="font-sans font-bold text-slate-400 uppercase tracking-widest text-[10px] leading-none mb-2">
                    Symptoms / Patient Concern
                  </h4>
                  <p className="text-body-sm text-color-text-secondary leading-relaxed bg-slate-50 border border-color-border/40 p-4 rounded-lg italic">
                    &ldquo;{selectedApt.symptoms || "No additional comments provided."}&rdquo;
                  </p>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-color-border bg-slate-50 flex flex-col gap-3">
                {selectedApt.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateStatus(selectedApt.id, "confirmed")}
                      className="btn-portal-primary flex-1 py-3 text-center justify-center font-bold"
                    >
                      Confirm Appointment
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedApt.id, "cancelled")}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-4 py-3 rounded-lg flex-1 text-center justify-center transition-colors cursor-pointer"
                    >
                      Cancel Slot
                    </button>
                  </div>
                )}
                {selectedApt.status === "confirmed" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdateStatus(selectedApt.id, "completed")}
                      className="btn-portal-primary flex-1 py-3 text-center justify-center font-bold bg-green-600 hover:bg-green-700"
                    >
                      Mark as Completed
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedApt.id, "cancelled")}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold px-4 py-3 rounded-lg flex-1 text-center justify-center transition-colors cursor-pointer"
                    >
                      Cancel Slot
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setSelectedApt(null)}
                  className="bg-white hover:bg-slate-100 text-color-text-secondary border border-color-border font-bold py-3 rounded-lg w-full text-center justify-center transition-colors cursor-pointer"
                >
                  Close Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
