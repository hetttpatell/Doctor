import { useState, useEffect } from "react";
import { Clock, Plus, Trash2, Calendar, Check, Copy } from "lucide-react";

export default function ManageAvailability() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM"
  ];

  // Initialize weekly schedule
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem("aarjav_doctor_schedule");
    if (saved) return JSON.parse(saved);

    const initial = {};
    days.forEach((day) => {
      // By default, enable Mon-Fri 10 AM to 5 PM
      initial[day] = timeSlots.reduce((acc, slot) => {
        const isWeekend = day === "Saturday" || day === "Sunday";
        const isDefaultHour =
          !isWeekend &&
          (slot.includes("10:") ||
            slot.includes("11:") ||
            slot.includes("12:") ||
            slot.includes("02:") ||
            slot.includes("03:") ||
            slot.includes("04:") ||
            slot === "05:00 PM");
        acc[slot] = isDefaultHour;
        return acc;
      }, {});
    });
    return initial;
  });

  // Overrides list
  const [overrides, setOverrides] = useState(() => {
    const saved = localStorage.getItem("aarjav_doctor_overrides");
    if (saved) return JSON.parse(saved);
    return [
      { id: "ov-1", date: "2026-06-15", type: "blocked", label: "National Holiday - Block off" },
      { id: "ov-2", date: "2026-06-22", type: "custom", label: "Custom Hours (10:00 AM - 01:00 PM)" },
    ];
  });

  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [newOverrideDate, setNewOverrideDate] = useState("");
  const [newOverrideType, setNewOverrideType] = useState("blocked");
  const [newOverrideLabel, setNewOverrideLabel] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleCell = (day, slot) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day][slot],
      },
    }));
  };

  const handleCopyMonday = () => {
    setSchedule((prev) => {
      const mondaySlots = { ...prev["Monday"] };
      const updated = { ...prev };
      // Copy to Tuesday, Wednesday, Thursday, Friday
      ["Tuesday", "Wednesday", "Thursday", "Friday"].forEach((day) => {
        updated[day] = { ...mondaySlots };
      });
      return updated;
    });
  };

  const handleAddOverride = (e) => {
    e.preventDefault();
    if (!newOverrideDate) return;

    const item = {
      id: `ov-${Date.now()}`,
      date: newOverrideDate,
      type: newOverrideType,
      label:
        newOverrideType === "blocked"
          ? newOverrideLabel || "Vacation / Block off"
          : newOverrideLabel || "Custom Schedule Hours",
    };

    setOverrides((prev) => [...prev, item]);
    setNewOverrideDate("");
    setNewOverrideLabel("");
    setShowOverrideModal(false);
  };

  const handleRemoveOverride = (id) => {
    setOverrides((prev) => prev.filter((ov) => ov.id !== id));
  };

  const handleSaveAll = () => {
    localStorage.setItem("aarjav_doctor_schedule", JSON.stringify(schedule));
    localStorage.setItem("aarjav_doctor_overrides", JSON.stringify(overrides));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col gap-8 text-left relative">
      {/* Header and Save Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div className="flex flex-col">
          <h2 className="font-serif text-2xl font-semibold text-color-text-primary">
            Configure Availability
          </h2>
          <p className="text-body-sm text-color-text-secondary mt-1">
            Toggle recurring slots and set custom calendar exception dates.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="btn-portal-primary flex items-center justify-center gap-2 max-sm:fixed max-sm:bottom-20 max-sm:right-6 max-sm:z-40 focus-blue"
        >
          {isSaved ? (
            <>
              <Check className="w-4.5 h-4.5" />
              Saved Availability
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Side: Weekly Schedule Editor (65%) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-color-portal-surface border border-color-border/60 rounded-lg p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-color-border/60 mb-6 select-none">
              <h3 className="font-serif text-lg font-semibold text-color-text-primary">
                Weekly Slots Configuration
              </h3>
              <button
                onClick={handleCopyMonday}
                className="btn-secondary py-2 px-3 text-caption font-bold flex items-center gap-1.5 focus-blue"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Mon to Weekdays
              </button>
            </div>

            {/* Availability Slot Grid */}
            <div className="overflow-x-auto w-full select-none">
              <table className="w-full text-left border-collapse text-body-sm min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-color-border/60">
                    <th className="p-3 font-semibold text-color-text-primary w-24">Day</th>
                    <th className="p-3 font-semibold text-color-text-primary">Slots Availability (Toggle Active)</th>
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day} className="border-b border-color-border/40 last:border-none">
                      <td className="p-3 font-bold text-color-text-primary">{day.substring(0, 3)}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5 py-1">
                          {timeSlots.map((slot) => {
                            const active = schedule[day]?.[slot];
                            return (
                              <button
                                key={slot}
                                onClick={() => handleToggleCell(day, slot)}
                                className={`px-2 py-1 rounded text-[10px] font-semibold transition-all cursor-pointer ${
                                  active
                                    ? "bg-color-portal-accent text-white"
                                    : "bg-slate-100 border border-color-border text-color-text-secondary hover:bg-slate-200"
                                }`}
                              >
                                {slot.replace(":00", "").replace(" AM", "a").replace(" PM", "p")}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Date-Specific Overrides (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-color-portal-surface border border-color-border/60 rounded-lg p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-color-border/60 mb-6 select-none">
              <h3 className="font-serif text-lg font-semibold text-color-text-primary">
                Date-Specific Overrides
              </h3>
              <button
                onClick={() => setShowOverrideModal(true)}
                className="btn-secondary py-1.5 px-2.5 text-caption font-bold flex items-center gap-1 focus-blue"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Override
              </button>
            </div>

            {/* Overrides List */}
            {overrides.length === 0 ? (
              <div className="py-6 text-center text-color-text-muted text-caption select-none">
                No custom schedule overrides defined.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {overrides.map((ov) => (
                  <div
                    key={ov.id}
                    className={`flex items-center justify-between p-3.5 border rounded-lg text-body-sm text-left ${
                      ov.type === "blocked"
                        ? "bg-red-50/20 border-red-200/50"
                        : "bg-color-portal-accent/5 border-color-portal-accent/20"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <Calendar className={`w-4 h-4 shrink-0 mt-0.5 ${ov.type === "blocked" ? "text-color-error" : "text-color-portal-accent"}`} />
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-color-text-primary truncate">{ov.label}</span>
                        <span className="text-caption text-color-text-secondary mt-0.5 font-mono">
                          {ov.date}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveOverride(ov.id)}
                      className="p-1.5 rounded-lg text-color-text-muted hover:text-color-error hover:bg-slate-100 transition-colors shrink-0 cursor-pointer focus-blue"
                      title="Remove override"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Override Creation Modal Overlay */}
      {showOverrideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setShowOverrideModal(false)} />
          <div className="relative bg-white border border-color-border/60 shadow-xl rounded-xl p-6 max-w-sm w-full text-left">
            <h3 className="font-serif text-lg font-semibold text-color-text-primary mb-4">
              Add Availability Override
            </h3>

            <form onSubmit={handleAddOverride} className="flex flex-col gap-4">
              {/* Date Select */}
              <div>
                <label className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                  Select Date
                </label>
                <input
                  type="date"
                  value={newOverrideDate}
                  onChange={(e) => setNewOverrideDate(e.target.value)}
                  className="input-field portal-input focus-blue"
                  required
                />
              </div>

              {/* Type select */}
              <div>
                <label className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                  Override Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center justify-center border border-color-border p-2.5 rounded-lg text-caption font-semibold cursor-pointer has-[:checked]:bg-red-50 has-[:checked]:border-red-400">
                    <input
                      type="radio"
                      name="override-type"
                      checked={newOverrideType === "blocked"}
                      onChange={() => setNewOverrideType("blocked")}
                      className="sr-only"
                    />
                    <span>Block Off Date</span>
                  </label>
                  <label className="flex items-center justify-center border border-color-border p-2.5 rounded-lg text-caption font-semibold cursor-pointer has-[:checked]:bg-color-portal-accent/5 has-[:checked]:border-color-portal-accent/40">
                    <input
                      type="radio"
                      name="override-type"
                      checked={newOverrideType === "custom"}
                      onChange={() => setNewOverrideType("custom")}
                      className="sr-only"
                    />
                    <span>Custom Hours</span>
                  </label>
                </div>
              </div>

              {/* Label */}
              <div>
                <label className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                  Description / Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vacation, Conference, Half-day"
                  value={newOverrideLabel}
                  onChange={(e) => setNewOverrideLabel(e.target.value)}
                  className="input-field portal-input focus-blue"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowOverrideModal(false)}
                  className="bg-white hover:bg-slate-100 text-color-text-secondary border border-color-border font-bold py-2 rounded-lg flex-1 text-center justify-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-portal-primary flex-1 py-2 font-bold focus-blue"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
