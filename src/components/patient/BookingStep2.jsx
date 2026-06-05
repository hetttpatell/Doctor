import { useMemo } from "react";
import { doctors } from "../../data/doctors";
import InlineCalendar from "./InlineCalendar";

export default function BookingStep2({
  formData,
  updateField,
  errors,
}) {
  const filteredDoctors = useMemo(() => {
    if (!formData.specialty) return doctors;
    return doctors.filter((doc) => doc.specialty === formData.specialty);
  }, [formData.specialty]);

  // Standard time slots list
  const slots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM"
  ];

  // Mock slot availability logic (e.g. disable some slots on Wednesdays or random index)
  const isSlotUnavailable = (slot, date) => {
    if (!date) return true;
    const d = new Date(date);
    // Disable early slots on Wednesdays or weekends
    const day = d.getDay();
    if (day === 0) return true; // Sunday closed
    if (day === 6 && slot.includes("PM")) return true; // Saturday half day
    
    // Consistent mock busy state
    const hash = (date.charCodeAt(date.length - 1) || 0) + slot.charCodeAt(0);
    return hash % 5 === 0; // 20% of slots busy
  };

  return (
    <fieldset className="space-y-6">
      <legend className="sr-only">Select Physician & Appointment Time</legend>

      {/* 1. Doctor Selection */}
      <div className="flex flex-col gap-1 text-left">
        <h4 className="font-serif text-lg font-semibold text-color-text-primary">
          Choose Consultant Doctor
        </h4>
        <p className="text-body-sm text-color-text-secondary">
          Select from the available specialists in the chosen department.
        </p>
        {errors.doctor && (
          <p className="text-color-error text-label font-medium bg-red-50 border border-color-error/20 px-3 py-1.5 rounded-md mt-1" role="alert">
            {errors.doctor}
          </p>
        )}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none mt-3 select-none w-full">
          {filteredDoctors.map((doc) => {
            const isSelected = formData.doctor === doc.id;
            return (
              <label
                key={doc.id}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 shrink-0 w-36 text-center transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-color-accent bg-color-accent-light/35 shadow-sm"
                    : "border-color-border hover:border-color-accent/40 bg-color-surface"
                }`}
              >
                <input
                  type="radio"
                  name="step2-doctor"
                  value={doc.id}
                  checked={isSelected}
                  onChange={() => updateField("doctor", doc.id)}
                  className="sr-only"
                />
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-14 h-14 rounded-full object-cover object-center mb-3 shadow-xs"
                />
                <span className="font-serif text-body-sm font-semibold text-color-text-primary truncate w-full">
                  {doc.name}
                </span>
                <span className="text-caption text-color-text-secondary mt-0.5 truncate w-full">
                  {doc.designation}
                </span>
                <span className="text-[10px] text-color-accent font-medium mt-1 leading-none">
                  {doc.experience} Yrs Exp
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Date Selection */}
      <div className="flex flex-col gap-1 text-left">
        <h4 className="font-serif text-lg font-semibold text-color-text-primary">
          Select Appointment Date
        </h4>
        <p className="text-body-sm text-color-text-secondary">
          Click on an available date on the calendar.
        </p>
        {errors.date && (
          <p className="text-color-error text-label font-medium bg-red-50 border border-color-error/20 px-3 py-1.5 rounded-md mt-1" role="alert">
            {errors.date}
          </p>
        )}
        <div className="mt-3">
          <InlineCalendar
            selectedDate={formData.date}
            onSelectDate={(formattedDate) => updateField("date", formattedDate)}
          />
        </div>
      </div>

      {/* 3. Time Slots Grid */}
      {formData.date && (
        <div className="flex flex-col gap-1 text-left transition-all duration-300">
          <h4 className="font-serif text-lg font-semibold text-color-text-primary">
            Choose Available Time Slot
          </h4>
          <p className="text-body-sm text-color-text-secondary">
            Select a convenient slot for your physical or virtual consultation.
          </p>
          {errors.time && (
            <p className="text-color-error text-label font-medium bg-red-50 border border-color-error/20 px-3 py-1.5 rounded-md mt-1" role="alert">
              {errors.time}
            </p>
          )}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3 select-none">
            {slots.map((slot) => {
              const isSelected = formData.time === slot;
              const isUnavailable = isSlotUnavailable(slot, formData.date);

              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => !isUnavailable && updateField("time", slot)}
                  disabled={isUnavailable}
                  className={`py-2.5 px-3 rounded-lg text-body-sm font-semibold transition-all duration-150 flex items-center justify-center border focus:outline-none ${
                    isSelected
                      ? "bg-color-accent text-white border-color-accent shadow-sm"
                      : isUnavailable
                      ? "bg-color-bg-secondary text-color-text-muted/60 border-color-border/40 cursor-not-allowed opacity-60"
                      : "bg-color-surface text-color-text-secondary border-color-border hover:border-color-accent/40 cursor-pointer"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </fieldset>
  );
}
