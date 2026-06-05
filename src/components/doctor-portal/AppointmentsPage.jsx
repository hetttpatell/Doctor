import { useState, useMemo, useEffect } from "react";
import { getAppointments, updateAppointmentStatus } from "../../data/appointments";
import { ChevronDown, ChevronUp, Search, Calendar, Phone, Mail, FileText, Check } from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [expandedAptId, setExpandedAptId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setAppointments(getAppointments());
  }, []);

  const drId = "dr-001"; // Demo doctor Dr. Priya Sharma
  const todayStr = useMemo(() => new Date().toISOString().split("T")[0], []);

  // Filter and search appointments
  const filteredApts = useMemo(() => {
    let result = appointments.filter((apt) => apt.doctorId === drId);

    // Apply Active Tab Filter
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activeTab === "today") {
      result = result.filter((apt) => apt.date === todayStr);
    } else if (activeTab === "week") {
      result = result.filter((apt) => {
        const diff = new Date(apt.date) - new Date(todayStr);
        return diff >= 0 && diff <= 7 * 86400000;
      });
    } else if (activeTab === "upcoming") {
      result = result.filter((apt) => new Date(apt.date) > today && apt.status !== "cancelled" && apt.status !== "completed");
    } else if (activeTab === "past") {
      result = result.filter((apt) => new Date(apt.date) < today || apt.status === "completed");
    } else if (activeTab === "cancelled") {
      result = result.filter((apt) => apt.status === "cancelled");
    }

    // Apply Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (apt) =>
          apt.patientName.toLowerCase().includes(q) ||
          apt.date.includes(q) ||
          (apt.patientPhone && apt.patientPhone.includes(q))
      );
    }

    return result;
  }, [appointments, activeTab, searchQuery, todayStr, drId]);

  // Paginated appointments
  const paginatedApts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return filteredApts.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredApts, currentPage]);

  const totalPages = Math.ceil(filteredApts.length / itemsPerPage) || 1;

  const handleUpdateStatus = (id, status) => {
    const updated = updateAppointmentStatus(id, status);
    setAppointments(updated);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border border-green-200/50";
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200/50";
      case "cancelled":
        return "bg-red-50 text-red-700 border border-red-200/50";
      case "completed":
        return "bg-blue-50 text-blue-700 border border-blue-200/50";
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200";
    }
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past / Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const formatSelectedDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6 text-left">
      <h2 className="font-serif text-2xl font-semibold text-color-text-primary mb-2 select-none">
        Manage Appointments
      </h2>

      {/* Filter Tabs Bar */}
      <div className="flex items-center justify-start overflow-x-auto scrollbar-none gap-2 pb-2 w-full select-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(1);
            }}
            className={`filter-pill shrink-0 ${
              activeTab === tab.id
                ? "bg-color-portal-accent text-white"
                : "bg-color-portal-surface border border-color-border text-color-text-secondary hover:bg-color-portal-accent/10 hover:text-color-portal-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative max-w-md w-full select-none">
        <span className="absolute left-3.5 top-3.5 text-color-text-muted">
          <Search className="w-4.5 h-4.5" />
        </span>
        <input
          type="text"
          placeholder="Search by patient name, phone, or date (YYYY-MM-DD)..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="input-field portal-input pl-11 focus-blue"
        />
      </div>

      {/* Appointments List Container */}
      <div className="bg-color-portal-surface border border-color-border/60 rounded-lg shadow-sm flex flex-col">
        {paginatedApts.length === 0 ? (
          <div className="p-12 text-center text-color-text-muted select-none">
            No appointments matched your query.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-body-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-color-border/60 select-none">
                    <th className="p-4 w-6"></th>
                    <th className="p-4 font-semibold text-color-text-primary w-40">Date & Time</th>
                    <th className="p-4 font-semibold text-color-text-primary">Patient</th>
                    <th className="p-4 font-semibold text-color-text-primary capitalize">Specialty</th>
                    <th className="p-4 font-semibold text-color-text-primary max-w-xs truncate">Concern</th>
                    <th className="p-4 font-semibold text-color-text-primary w-32">Status</th>
                    <th className="p-4 font-semibold text-color-text-primary w-32 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApts.map((apt) => {
                    const isExpanded = expandedAptId === apt.id;
                    return (
                      <optgroup key={apt.id} className="border-b border-color-border/40 last:border-none">
                        <tr
                          className={`hover:bg-slate-50/50 cursor-pointer ${
                            isExpanded ? "bg-slate-50/30" : ""
                          }`}
                          onClick={() => setExpandedAptId(isExpanded ? null : apt.id)}
                        >
                          <td className="p-4">
                            {isExpanded ? (
                              <ChevronUp className="w-4.5 h-4.5 text-color-text-muted" />
                            ) : (
                              <ChevronDown className="w-4.5 h-4.5 text-color-text-muted" />
                            )}
                          </td>
                          <td className="p-4 font-semibold">
                            <div className="text-color-portal-accent">{apt.time}</div>
                            <div className="text-[10px] text-color-text-muted font-normal mt-0.5">
                              {formatSelectedDate(apt.date)}
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-color-text-primary">
                            {apt.patientName}
                          </td>
                          <td className="p-4 text-color-text-secondary capitalize">
                            {apt.specialty}
                          </td>
                          <td className="p-4 text-color-text-secondary max-w-xs truncate">
                            {apt.symptoms}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${getStatusBadgeClass(apt.status)}`}>
                              {apt.status}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {apt.status === "confirmed" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateStatus(apt.id, "completed");
                                }}
                                className="text-color-portal-accent hover:underline text-caption font-bold focus-blue"
                              >
                                Mark Complete
                              </button>
                            )}
                            {apt.status === "pending" && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUpdateStatus(apt.id, "confirmed");
                                }}
                                className="text-green-600 hover:underline text-caption font-bold"
                              >
                                Confirm
                              </button>
                            )}
                            {apt.status === "completed" && (
                              <span className="text-color-text-muted text-caption flex items-center justify-center gap-1">
                                <Check className="w-3.5 h-3.5 text-color-success" />
                                Done
                              </span>
                            )}
                            {apt.status === "cancelled" && (
                              <span className="text-color-error text-caption">Cancelled</span>
                            )}
                          </td>
                        </tr>

                        {/* Expandable Panel Row */}
                        {isExpanded && (
                          <tr className="bg-slate-50/40 select-none">
                            <td colSpan={7} className="p-6 border-t border-color-border/30">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left text-body-sm text-color-text-primary">
                                <div className="flex flex-col gap-2">
                                  <h5 className="font-bold text-[10px] text-color-text-muted uppercase tracking-widest leading-none mb-1">
                                    Contact Info
                                  </h5>
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-color-portal-accent shrink-0" />
                                    <span>{apt.patientPhone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-color-portal-accent shrink-0" />
                                    <span>{apt.patientEmail || "No Email Provided"}</span>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                  <h5 className="font-bold text-[10px] text-color-text-muted uppercase tracking-widest leading-none mb-1">
                                    Clinical Summary / Symptoms
                                  </h5>
                                  <div className="flex gap-2 items-start bg-white border border-color-border p-3.5 rounded-lg">
                                    <FileText className="w-4 h-4 text-color-text-muted mt-0.5 shrink-0" />
                                    <p className="italic text-color-text-secondary leading-relaxed">
                                      &ldquo;{apt.symptoms || "No details provided."}&rdquo;
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </optgroup>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden flex flex-col gap-4 p-4">
              {paginatedApts.map((apt) => (
                <div
                  key={apt.id}
                  className="border border-color-border/60 hover:border-color-portal-accent/40 rounded-lg p-4 bg-slate-50/20 text-left flex flex-col gap-3.5"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="font-semibold text-color-text-primary">{apt.patientName}</span>
                      <span className="text-caption text-color-portal-accent font-semibold mt-0.5">
                        {apt.time} &middot; {formatSelectedDate(apt.date)}
                      </span>
                    </div>
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${getStatusBadgeClass(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>

                  <div className="text-body-sm text-color-text-secondary border-t border-b border-color-border/40 py-2">
                    <p className="font-semibold text-[10px] text-color-text-muted uppercase tracking-widest mb-1 select-none">Symptoms</p>
                    <p className="italic">&ldquo;{apt.symptoms}&rdquo;</p>
                  </div>

                  <div className="flex items-center justify-between text-caption text-color-text-muted select-none">
                    <span>Phone: {apt.phone || apt.patientPhone}</span>
                    <div className="flex gap-2">
                      {apt.status === "confirmed" && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, "completed")}
                          className="btn-portal-primary py-1 px-3 text-caption font-bold focus-blue"
                        >
                          Mark Complete
                        </button>
                      )}
                      {apt.status === "pending" && (
                        <button
                          onClick={() => handleUpdateStatus(apt.id, "confirmed")}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-caption"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-4 select-none">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="btn-secondary py-1.5 px-4 text-caption disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-caption text-color-text-secondary font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="btn-secondary py-1.5 px-4 text-caption disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
