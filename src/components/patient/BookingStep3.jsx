import { specialties } from "../../data/specialties";
import { doctors } from "../../data/doctors";
import { AlertCircle } from "lucide-react";

export default function BookingStep3({
  formData,
  updateField,
  errors,
  setErrors,
  onGoToStep,
}) {
  const selectedDoc = doctors.find((d) => d.id === formData.doctor);
  const selectedSpec = specialties.find((s) => s.id === formData.specialty);

  const formatSelectedDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const handleBlur = (field, value) => {
    const newErrors = { ...errors };
    if (field === "name" && !value.trim()) {
      newErrors.name = "Full name is required.";
    } else if (field === "name") {
      delete newErrors.name;
    }

    if (field === "phone" && !value.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (field === "phone" && !/^[+\d\s()-]{7,}$/.test(value.trim())) {
      newErrors.phone = "Please enter a valid phone number (minimum 7 digits).";
    } else if (field === "phone") {
      delete newErrors.phone;
    }

    if (field === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (field === "email") {
      delete newErrors.email;
    }

    setErrors(newErrors);
  };

  return (
    <div className="space-y-6">
      {/* Read-Only Summary Card */}
      <div className="bg-color-bg-secondary border border-color-border/80 rounded-xl p-5 text-left flex flex-col gap-3.5 select-none">
        <div className="flex justify-between items-center pb-2.5 border-b border-color-border">
          <h5 className="font-serif text-sm font-semibold uppercase tracking-wider text-color-text-primary">
            Appointment Summary
          </h5>
          <button
            type="button"
            onClick={() => onGoToStep(2)}
            className="text-body-sm font-semibold text-color-accent hover:underline cursor-pointer focus:outline-none"
          >
            Edit Details
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-body-sm">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-color-text-muted">Specialty</span>
            <span className="font-semibold text-color-text-primary mt-0.5">{selectedSpec?.name || "N/A"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-color-text-muted">Physician</span>
            <span className="font-semibold text-color-text-primary mt-0.5">{selectedDoc?.name || "N/A"}</span>
          </div>
          <div className="flex flex-col col-span-2">
            <span className="text-[10px] uppercase tracking-widest text-color-text-muted">Schedule</span>
            <span className="font-semibold text-color-text-primary mt-0.5">
              {formatSelectedDate(formData.date)} at {formData.time || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Patient Information Form Fields */}
      <fieldset className="space-y-4">
        <legend className="sr-only">Enter Patient Details</legend>
        <div className="flex flex-col gap-1 text-left mb-2">
          <h4 className="font-serif text-lg font-semibold text-color-text-primary">
            Patient Information
          </h4>
          <p className="text-body-sm text-color-text-secondary">
            Please enter the official records for the consulting patient.
          </p>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="wizard-name" className="block text-body-sm font-semibold text-color-text-primary mb-1.5 text-left">
            Full Name <span className="text-color-error">*</span>
          </label>
          <input
            id="wizard-name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={(e) => handleBlur("name", e.target.value)}
            className={`input-field ${errors.name ? "error" : ""}`}
            required
            autoComplete="name"
          />
          {errors.name && (
            <p className="text-color-error text-label font-medium mt-1.5 flex items-center gap-1.5 text-left" role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="wizard-phone" className="block text-body-sm font-semibold text-color-text-primary mb-1.5 text-left">
            Phone Number <span className="text-color-error">*</span>
          </label>
          <input
            id="wizard-phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={(e) => handleBlur("phone", e.target.value)}
            className={`input-field ${errors.phone ? "error" : ""}`}
            required
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="text-color-error text-label font-medium mt-1.5 flex items-center gap-1.5 text-left" role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="wizard-email" className="block text-body-sm font-semibold text-color-text-primary mb-1.5 text-left">
            Email Address <span className="text-color-text-muted text-[10px]">(Optional)</span>
          </label>
          <input
            id="wizard-email"
            type="email"
            placeholder="john@email.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={(e) => handleBlur("email", e.target.value)}
            className={`input-field ${errors.email ? "error" : ""}`}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-color-error text-label font-medium mt-1.5 flex items-center gap-1.5 text-left" role="alert">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="wizard-dob" className="block text-body-sm font-semibold text-color-text-primary mb-1.5 text-left">
            Date of Birth <span className="text-color-text-muted text-[10px]">(Optional)</span>
          </label>
          <input
            id="wizard-dob"
            type="date"
            value={formData.dob || ""}
            onChange={(e) => updateField("dob", e.target.value)}
            className="input-field"
          />
        </div>

        {/* Symptoms / Notes */}
        <div>
          <label htmlFor="wizard-notes" className="block text-body-sm font-semibold text-color-text-primary mb-1.5 text-left">
            Symptoms / Consultation Notes <span className="text-color-text-muted text-[10px]">(Optional)</span>
          </label>
          <textarea
            id="wizard-notes"
            rows={3}
            maxLength={300}
            placeholder="Describe clinical symptoms or special assistance requirements (max 300 chars)..."
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            className="input-field resize-none py-3"
          />
          <span className="block text-right text-[10px] text-color-text-muted mt-1 select-none">
            {formData.notes.length}/300
          </span>
        </div>
      </fieldset>
    </div>
  );
}
