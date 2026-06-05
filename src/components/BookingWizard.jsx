import { useState, useRef, useEffect, useCallback, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  hospitalDetails,
  doctors,
  timeSlots,
} from "../data/hospitalData";

const STEPS = [
  { id: 1, label: "Specialty" },
  { id: 2, label: "Doctor & Time" },
  { id: 3, label: "Your Details" },
];

function StepIndicator({ currentStep, completedSteps }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8" role="list" aria-label="Booking steps">
      {STEPS.map((step, idx) => {
        const isActive = step.id === currentStep;
        const isCompleted = completedSteps.includes(step.id);
        return (
          <div key={step.id} className="flex items-center gap-2" role="listitem">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                isCompleted
                  ? "bg-green-500 text-white"
                  : isActive
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-400"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              {isCompleted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                step.id
              )}
            </div>
            <span
              className={`text-sm font-medium hidden sm:inline ${
                isActive ? "text-slate-800" : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
            {idx < STEPS.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 rounded-full mx-1 transition-colors duration-300 ${
                  isCompleted ? "bg-green-500" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BookingWizard({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    specialty: "",
    doctor: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const successRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Trap focus and handle Escape
  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  // GSAP animations
  useGSAP(
    () => {
      if (!isOpen) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
        );
      });
    },
    { scope: modalRef, dependencies: [isOpen] }
  );

  // Step change animation
  useGSAP(
    () => {
      if (!isOpen || !contentRef.current) return;
      const stepEl = contentRef.current.querySelector(".wizard-step");
      if (!stepEl) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          stepEl,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }
        );
      });
    },
    { scope: modalRef, dependencies: [currentStep, showSuccess] }
  );

  const handleClose = useCallback(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentStep(1);
          setCompletedSteps([]);
          setShowSuccess(false);
          setErrors({});
          setFormData({
            specialty: "",
            doctor: "",
            date: "",
            time: "",
            name: "",
            phone: "",
            email: "",
            notes: "",
          });
          onClose();
        },
      });
      tl.to(contentRef.current, { opacity: 0, y: 20, duration: 0.25, ease: "power2.in" });
      tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      setCurrentStep(1);
      setCompletedSteps([]);
      setShowSuccess(false);
      setErrors({});
      setFormData({
        specialty: "",
        doctor: "",
        date: "",
        time: "",
        name: "",
        phone: "",
        email: "",
        notes: "",
      });
      onClose();
    });
  }, [onClose]);

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1 && !formData.specialty) {
      newErrors.specialty = "Please select a specialty.";
    }
    if (step === 2) {
      if (!formData.doctor) newErrors.doctor = "Please select a doctor.";
      if (!formData.date) newErrors.date = "Please select a date.";
      if (!formData.time) newErrors.time = "Please select a time slot.";
    }
    if (step === 3) {
      if (!formData.name.trim()) newErrors.name = "Full name is required.";
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      } else if (!/^[+\d\s()-]{7,}$/.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number.";
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;
    setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
    if (currentStep === 3) {
      setShowSuccess(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const filteredDoctors = formData.specialty
    ? doctors.filter((d) => d.specialtyId === formData.specialty)
    : doctors;

  if (!isOpen) return null;

  return (
    <div ref={modalRef} className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Book an appointment">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          ref={contentRef}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b border-slate-100 rounded-t-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">
                {showSuccess ? "Booking Confirmed" : "Book Appointment"}
              </h2>
              <button
                type="button"
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close booking dialog"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {!showSuccess && (
              <StepIndicator
                currentStep={currentStep}
                completedSteps={completedSteps}
              />
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {showSuccess ? (
              <SuccessView
                ref={successRef}
                formData={formData}
                doctors={doctors}
                specialties={hospitalDetails.specialties}
                onClose={handleClose}
              />
            ) : (
              <div className="wizard-step">
                {currentStep === 1 && (
                  <Step1Specialty
                    formData={formData}
                    updateField={updateField}
                    errors={errors}
                  />
                )}
                {currentStep === 2 && (
                  <Step2DoctorTime
                    formData={formData}
                    updateField={updateField}
                    filteredDoctors={filteredDoctors}
                    minDate={minDate}
                    errors={errors}
                  />
                )}
                {currentStep === 3 && (
                  <Step3PatientInfo
                    formData={formData}
                    updateField={updateField}
                    errors={errors}
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {!showSuccess && (
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-slate-100 rounded-b-2xl flex items-center justify-between gap-3">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {currentStep === 3 ? "Confirm Booking" : "Continue"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 1: Select Specialty ─── */
function Step1Specialty({ formData, updateField, errors }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-base font-semibold text-slate-800 mb-1">
        Select a Specialty
      </legend>
      <p className="text-sm text-slate-500 mb-4">
        Choose the department for your visit.
      </p>
      {errors.specialty && (
        <p className="text-red-600 text-sm font-medium" role="alert">
          {errors.specialty}
        </p>
      )}
      <div className="space-y-2">
        {hospitalDetails.specialties.map((spec) => {
          const isSelected = formData.specialty === spec.id;
          return (
            <label
              key={spec.id}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <input
                type="radio"
                name="specialty"
                value={spec.id}
                checked={isSelected}
                onChange={() => {
                  updateField("specialty", spec.id);
                  updateField("doctor", "");
                }}
                className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <div className="text-sm font-semibold text-slate-800">
                  {spec.title}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{spec.desc}</div>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ─── Step 2: Select Doctor & Time ─── */
function Step2DoctorTime({
  formData,
  updateField,
  filteredDoctors,
  minDate,
  errors,
}) {
  const avatarColors = [
    "bg-blue-100 text-blue-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-600",
    "bg-purple-100 text-purple-600",
    "bg-rose-100 text-rose-600",
    "bg-cyan-100 text-cyan-600",
  ];

  return (
    <div className="space-y-6">
      {/* Doctor */}
      <fieldset>
        <legend className="text-base font-semibold text-slate-800 mb-1">
          Choose a Doctor
        </legend>
        {errors.doctor && (
          <p className="text-red-600 text-sm font-medium mt-1" role="alert">
            {errors.doctor}
          </p>
        )}
        <div className="space-y-2 mt-3">
          {filteredDoctors.map((doc, idx) => {
            const isSelected = formData.doctor === doc.id;
            return (
              <label
                key={doc.id}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200 hover:border-blue-200"
                }`}
              >
                <input
                  type="radio"
                  name="doctor"
                  value={doc.id}
                  checked={isSelected}
                  onChange={() => updateField("doctor", doc.id)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${avatarColors[idx % avatarColors.length]}`}
                >
                  {doc.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">
                    {doc.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {doc.experience} · {doc.availability}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Date */}
      <div>
        <label
          htmlFor="booking-date"
          className="block text-sm font-semibold text-slate-800 mb-2"
        >
          Preferred Date
        </label>
        {errors.date && (
          <p className="text-red-600 text-sm font-medium mb-1" role="alert">
            {errors.date}
          </p>
        )}
        <input
          id="booking-date"
          type="date"
          min={minDate}
          value={formData.date}
          onChange={(e) => updateField("date", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border-2 text-sm text-slate-800 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.date ? "border-red-300" : "border-slate-200"
          }`}
        />
      </div>

      {/* Time Slots */}
      <div>
        <span className="block text-sm font-semibold text-slate-800 mb-2">
          Available Time Slots
        </span>
        {errors.time && (
          <p className="text-red-600 text-sm font-medium mb-1" role="alert">
            {errors.time}
          </p>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" role="radiogroup" aria-label="Time slots">
          {timeSlots.map((slot) => {
            const isSelected = formData.time === slot;
            return (
              <button
                key={slot}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => updateField("time", slot)}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 border border-slate-200"
                }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Patient Details ─── */
function Step3PatientInfo({ formData, updateField, errors }) {
  return (
    <div className="space-y-5">
      <p className="text-base font-semibold text-slate-800">
        Your Information
      </p>

      <div>
        <label htmlFor="patient-name" className="block text-sm font-medium text-slate-700 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="patient-name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border-2 text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? "border-red-300" : "border-slate-200"
          }`}
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-red-600 text-xs mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="patient-phone" className="block text-sm font-medium text-slate-700 mb-1.5">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          id="patient-phone"
          type="tel"
          placeholder="+91 98XXX XXXXX"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border-2 text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.phone ? "border-red-300" : "border-slate-200"
          }`}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-red-600 text-xs mt-1" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="patient-email" className="block text-sm font-medium text-slate-700 mb-1.5">
          Email <span className="text-slate-400 text-xs">(optional)</span>
        </label>
        <input
          id="patient-email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border-2 text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? "border-red-300" : "border-slate-200"
          }`}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="patient-notes" className="block text-sm font-medium text-slate-700 mb-1.5">
          Additional Notes <span className="text-slate-400 text-xs">(optional)</span>
        </label>
        <textarea
          id="patient-notes"
          rows={3}
          placeholder="Any symptoms, conditions, or special requests..."
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 transition-colors duration-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
}

/* ─── Success View ─── */

const SuccessView = forwardRef(function SuccessView(
  { formData, doctors: allDoctors, specialties, onClose },
  ref
) {
  const selectedDoc = allDoctors.find((d) => d.id === formData.doctor);
  const selectedSpec = specialties.find((s) => s.id === formData.specialty);

  return (
    <div ref={ref} className="wizard-step text-center py-4">
      {/* Checkmark */}
      <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-5">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16A34A"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Appointment Booked!
      </h3>
      <p className="text-slate-500 text-sm mb-8">
        Your appointment has been confirmed. We will send you a reminder before
        your visit.
      </p>

      {/* Summary */}
      <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3 mb-8">
        <SummaryRow label="Patient" value={formData.name} />
        <SummaryRow label="Specialty" value={selectedSpec?.title || ""} />
        <SummaryRow label="Doctor" value={selectedDoc?.name || ""} />
        <SummaryRow
          label="Date & Time"
          value={`${formData.date} at ${formData.time}`}
        />
        <SummaryRow label="Phone" value={formData.phone} />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Done
      </button>
    </div>
  );
});

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-sm font-medium text-slate-800 text-right">
        {value}
      </span>
    </div>
  );
}
