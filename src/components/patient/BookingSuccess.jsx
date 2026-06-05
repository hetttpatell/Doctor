import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { Check } from "lucide-react";
import { specialties } from "../../data/specialties";
import { doctors } from "../../data/doctors";

export default function BookingSuccess({ formData, onBookAnother }) {
  const containerRef = useRef(null);

  const selectedDoc = doctors.find((d) => d.id === formData.doctor);
  const selectedSpec = specialties.find((s) => s.id === formData.specialty);

  // Generate unique mock appointment code
  const appointmentCode = useMemo(() => {
    const random = Math.floor(1000 + Math.random() * 9000);
    const dateFormatted = formData.date ? formData.date.replace(/-/g, "") : "20260605";
    return `APT-${dateFormatted}-${random}`;
  }, [formData.date]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  const formatSelectedDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
      return new Date(dateStr).toLocaleDateString("en-US", options);
    } catch {
      return dateStr;
    }
  };

  const handleDownloadPDF = () => {
    // Print-friendly mock download
    const printableText = `
    ==================================================
                 AARJAV HOSPITAL APPOINTMENT
    ==================================================
    Reference Code : ${appointmentCode}
    Patient Name   : ${formData.name}
    Phone Number   : ${formData.phone}
    Department     : ${selectedSpec?.name || "N/A"}
    Consultant     : ${selectedDoc?.name || "N/A"}
    Date           : ${formatSelectedDate(formData.date)}
    Time Slot      : ${formData.time || "N/A"}
    Status         : Confirmed
    ==================================================
    Thank you for choosing Aarjav Hospital Ahmedabad.
    `;
    const element = document.createElement("a");
    const file = new Blob([printableText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `appointment-${appointmentCode}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      ref={containerRef}
      className="text-center py-6 flex flex-col items-center select-none"
    >
      {/* Circle Icon */}
      <div className="w-16 h-16 rounded-full bg-color-accent-light text-color-accent flex items-center justify-center mb-6 shadow-sm">
        <Check className="w-8 h-8" strokeWidth={2.5} />
      </div>

      {/* Headline */}
      <h3 className="font-serif text-2xl md:text-3xl font-semibold text-color-text-primary mb-2">
        Appointment Confirmed!
      </h3>
      <p className="text-body-sm text-color-text-secondary max-w-sm mb-6 leading-relaxed">
        Your slot has been reserved in our system. A clinical validation message has been sent to {formData.phone}.
      </p>

      {/* Booking Reference Code */}
      <div className="mb-8">
        <span className="block text-[10px] uppercase tracking-widest text-color-text-muted mb-2">
          Reference Code
        </span>
        <code className="font-mono text-sm font-semibold bg-color-accent-light text-color-accent px-5 py-2.5 rounded-md">
          {appointmentCode}
        </code>
      </div>

      {/* Summary Box */}
      <div className="w-full bg-color-bg-secondary border border-color-border/60 rounded-xl p-5 text-left flex flex-col gap-3 mb-8 text-body-sm text-color-text-primary">
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-color-text-muted">Patient Name</span>
          <span className="font-semibold">{formData.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-color-text-muted">Physician</span>
          <span className="font-semibold">{selectedDoc?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-color-text-muted">Specialty</span>
          <span className="font-semibold">{selectedSpec?.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest text-color-text-muted">Date & Time</span>
          <span className="font-semibold">
            {formatSelectedDate(formData.date)} at {formData.time}
          </span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={handleDownloadPDF}
          className="btn-secondary flex-1 text-center justify-center"
        >
          Download Confirmation (PDF)
        </button>
        <button
          onClick={onBookAnother}
          className="btn-primary flex-1 text-center justify-center"
        >
          Book Another
        </button>
      </div>
    </div>
  );
}
