import { useState, useRef, useEffect } from "react";
import { hospitalDetails, doctors, timeSlots } from "../data/hospitalData";

const STEPS = [
  { id: 1, label: "Specialty" },
  { id: 2, label: "Doctor & Time" },
  { id: 3, label: "Details" },
];

export default function BookingPortal({ highlightTrigger, onHighlightEnd, preSelectedSpecialty, preSelectedDoctor, onBookingComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
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

  const portalRef = useRef(null);

  // Handle external highlight triggers (like clicking "Book Now" in navbar)
  useEffect(() => {
    if (highlightTrigger) {
      setIsHighlighted(true);
      // Scroll to portal
      portalRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      
      const timer = setTimeout(() => {
        setIsHighlighted(false);
        if (onHighlightEnd) onHighlightEnd();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightTrigger, onHighlightEnd]);

  // Handle pre-selections from doctor/specialty cards
  useEffect(() => {
    if (preSelectedSpecialty) {
      setFormData(prev => ({ ...prev, specialty: preSelectedSpecialty, doctor: "" }));
      setCurrentStep(2);
      setCompletedSteps([1]);
    }
  }, [preSelectedSpecialty]);

  useEffect(() => {
    if (preSelectedDoctor) {
      const doc = doctors.find(d => d.id === preSelectedDoctor);
      if (doc) {
        setFormData(prev => ({
          ...prev,
          specialty: doc.specialtyId,
          doctor: doc.id
        }));
        setCurrentStep(2);
        setCompletedSteps([1]);
      }
    }
  }, [preSelectedDoctor]);

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1 && !formData.specialty) {
      newErrors.specialty = "Please select a specialty department.";
    }
    if (step === 2) {
      if (!formData.doctor) newErrors.doctor = "Please select a physician.";
      if (!formData.date) newErrors.date = "Please select an appointment date.";
      if (!formData.time) newErrors.time = "Please select a convenient time slot.";
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
    setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
    if (currentStep === 3) {
      setShowSuccess(true);
      if (onBookingComplete) {
        onBookingComplete(formData);
      }
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep(prev => prev - 1);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const resetPortal = () => {
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
  };

  // Date limit (minimum tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const filteredDoctors = formData.specialty
    ? doctors.filter(d => d.specialtyId === formData.specialty)
    : doctors;

  const currentSpecialtyDetails = hospitalDetails.specialties.find(
    s => s.id === formData.specialty
  );

  return (
    <div
      ref={portalRef}
      id="booking-portal"
      className={`glass-panel text-white rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-300 w-full relative ${
        isHighlighted ? "portal-spotlight-active scale-[1.01]" : ""
      }`}
    >
      {/* Glow highlight indicator */}
      {isHighlighted && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
          Active Portal
        </div>
      )}

      {/* Portal Header */}
      <div className="mb-6">
        <h3 className="text-xl md:text-2xl font-bold tracking-wide">
          {showSuccess ? "Appointment Secured" : "Instant Booking Portal"}
        </h3>
        <p className="text-slate-400 text-xs md:text-sm mt-1">
          {showSuccess 
            ? "Your visit is officially scheduled. Check details below." 
            : "Complete 3 simple steps to confirm your clinical consultation."
          }
        </p>
      </div>

      {/* Progress Bar */}
      {!showSuccess && (
        <div className="mb-8" role="progressbar" aria-label="Booking steps progress">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Step {currentStep} of 3
            </span>
            <span className="text-xs text-blue-400 font-semibold">
              {STEPS[currentStep - 1].label}
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-full transition-all duration-300" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps Content */}
      <div className="min-h-[280px]">
        {showSuccess ? (
          <SuccessView formData={formData} onDone={resetPortal} />
        ) : (
          <div>
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

      {/* Footer Navigation */}
      {!showSuccess && (
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>{currentStep === 3 ? "Confirm Appointment" : "Continue"}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Step 1: Specialty Selection ─── */
function Step1Specialty({ formData, updateField, errors }) {
  const specialtyIcons = {
    "gen-med": (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    emergency: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    cardio: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  };

  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-semibold text-slate-300 mb-2">
        Select Specialty Department
      </legend>
      {errors.specialty && (
        <p className="text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg" role="alert">
          {errors.specialty}
        </p>
      )}
      <div className="space-y-3">
        {hospitalDetails.specialties.map((spec) => {
          const isSelected = formData.specialty === spec.id;
          return (
            <label
              key={spec.id}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/5"
                  : "border-white/5 bg-white/20 hover:border-white/10 hover:bg-white/20"
              }`}
            >
              <input
                type="radio"
                name="portal-specialty"
                value={spec.id}
                checked={isSelected}
                onChange={() => {
                  updateField("specialty", spec.id);
                  updateField("doctor", "");
                }}
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isSelected ? "bg-blue-600 text-white" : "bg-white/5 text-slate-300"
              }`}>
                {specialtyIcons[spec.id]}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{spec.title}</span>
                  {isSelected && (
                    <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed truncate md:whitespace-normal">
                  {spec.desc}
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ─── Step 2: Doctor, Date, and Time Slot Selection ─── */
function Step2DoctorTime({ formData, updateField, filteredDoctors, minDate, errors }) {
  return (
    <div className="space-y-5">
      {/* Doctor List */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Choose Physician
        </label>
        {errors.doctor && (
          <p className="text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg mb-2" role="alert">
            {errors.doctor}
          </p>
        )}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
          {filteredDoctors.map((doc) => {
            const isSelected = formData.doctor === doc.id;
            return (
              <button
                key={doc.id}
                type="button"
                onClick={() => updateField("doctor", doc.id)}
                className={`p-3 rounded-xl border-2 text-left shrink-0 w-40 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-500/10 shadow-md"
                    : "border-white/5 bg-white/20 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold font-display">
                    {doc.initials}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 truncate w-24">
                    {doc.specialty}
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white truncate">{doc.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1">{doc.experience}</p>
                <p className="text-[10px] text-teal-400 font-semibold mt-0.5">{doc.availability}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date Picker */}
      <div>
        <label htmlFor="portal-date" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Appointment Date
        </label>
        {errors.date && (
          <p className="text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg mb-2" role="alert">
            {errors.date}
          </p>
        )}
        <input
          id="portal-date"
          type="date"
          min={minDate}
          value={formData.date}
          onChange={(e) => updateField("date", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white/20 text-white text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.date ? "border-rose-500/40" : "border-white/10"
          }`}
          style={{ colorScheme: "dark" }}
        />
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Available Slots
        </label>
        {errors.time && (
          <p className="text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg mb-2" role="alert">
            {errors.time}
          </p>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {timeSlots.map((slot) => {
            const isSelected = formData.time === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => updateField("time", slot)}
                className={`py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer focus:outline-none ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-white/20 text-slate-300 hover:bg-white/20 border border-white/5"
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

/* ─── Step 3: Patient Information Form ─── */
function Step3PatientInfo({ formData, updateField, errors }) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-slate-300 mb-2">
        Patient Contact Information
      </p>

      <div>
        <label htmlFor="portal-name" className="block text-xs font-semibold text-slate-400 mb-1">
          Full Name <span className="text-rose-400">*</span>
        </label>
        <input
          id="portal-name"
          type="text"
          placeholder="Enter patient's full name"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white/20 text-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? "border-rose-500/50" : "border-white/10"
          }`}
          autoComplete="name"
        />
        {errors.name && (
          <p className="text-rose-400 text-[10px] mt-1 font-semibold" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="portal-phone" className="block text-xs font-semibold text-slate-400 mb-1">
          Phone Number <span className="text-rose-400">*</span>
        </label>
        <input
          id="portal-phone"
          type="tel"
          placeholder="+91 98XXX XXXXX"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white/20 text-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.phone ? "border-rose-500/50" : "border-white/10"
          }`}
          autoComplete="tel"
        />
        {errors.phone && (
          <p className="text-rose-400 text-[10px] mt-1 font-semibold" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="portal-email" className="block text-xs font-semibold text-slate-400 mb-1">
          Email <span className="text-slate-500 text-[10px]">(Optional)</span>
        </label>
        <input
          id="portal-email"
          type="email"
          placeholder="patient@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          className={`w-full px-4 py-2.5 rounded-xl border bg-white/20 text-white text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? "border-rose-500/50" : "border-white/10"
          }`}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-rose-400 text-[10px] mt-1 font-semibold" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="portal-notes" className="block text-xs font-semibold text-slate-400 mb-1">
          Additional Notes <span className="text-slate-500 text-[10px]">(Optional)</span>
        </label>
        <textarea
          id="portal-notes"
          rows={2}
          placeholder="Symptoms, clinical details, or special assistance requests..."
          value={formData.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/20 text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
    </div>
  );
}

/* ─── Success Confirmation View ─── */
function SuccessView({ formData, onDone }) {
  const selectedDoc = doctors.find(d => d.id === formData.doctor);
  const selectedSpec = hospitalDetails.specialties.find(s => s.id === formData.specialty);

  // Format date nicely
  const formatDate = (dateStr) => {
    try {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="text-center py-4">
      {/* Checkmark animation container */}
      <div className="w-16 h-16 mx-auto bg-teal-500/15 border border-teal-500/30 rounded-full flex items-center justify-center mb-4">
        <svg className="w-8 h-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h4 className="text-lg font-bold text-white mb-1">
        Booking Confirmed!
      </h4>
      <p className="text-slate-400 text-xs mb-6 max-w-xs mx-auto leading-relaxed">
        Your consultation schedule has been reserved in our system. A verification call will be sent shortly.
      </p>

      {/* Summary Box */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-4 text-left space-y-2.5 mb-6">
        <SummaryRow label="Patient Name" value={formData.name} />
        <SummaryRow label="Department" value={selectedSpec?.title || ""} />
        <SummaryRow label="Consultant" value={selectedDoc?.name || ""} />
        <SummaryRow label="Date" value={formatDate(formData.date)} />
        <SummaryRow label="Time Slot" value={formData.time} />
        <SummaryRow label="Contact Info" value={formData.phone} />
      </div>

      <button
        type="button"
        onClick={onDone}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-teal-600/10"
      >
        Book Another Appointment
      </button>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-xs gap-3">
      <span className="text-slate-400 font-semibold uppercase tracking-wider shrink-0">
        {label}
      </span>
      <span className="text-white font-bold text-right truncate max-w-[180px]">
        {value}
      </span>
    </div>
  );
}
