import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Check } from "lucide-react";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingStep3 from "./BookingStep3";
import BookingSuccess from "./BookingSuccess";

export default function BookingWizard({ bookingState }) {
  const stepContainerRef = useRef(null);

  const {
    currentStep,
    setCurrentStep,
    completedSteps,
    showSuccess,
    errors,
    setErrors,
    formData,
    updateField,
    handleNext,
    handleBack,
    resetBooking,
  } = bookingState;

  // Animate step transitions
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Slide step content in from the right on forward, or left on backward
    gsap.fromTo(
      stepContainerRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [currentStep, showSuccess]);

  const steps = [
    { number: 1, label: "Specialty" },
    { number: 2, label: "Doctor & Time" },
    { number: 3, label: "Your Info" },
  ];

  return (
    <div className="bg-color-surface border border-color-border rounded-xl p-6 md:p-10 shadow-xl w-full">
      {/* Step Progress Indicator (top of card) */}
      {!showSuccess && (
        <div className="flex items-center justify-between mb-10 select-none max-w-md mx-auto relative">
          {/* Step Connect Lines */}
          <div className="absolute top-4 left-4 right-4 h-0.5 bg-color-border z-0">
            <div
              className="h-full bg-color-accent transition-all duration-300"
              style={{
                width: `${
                  currentStep === 1
                    ? "0%"
                    : currentStep === 2
                    ? "50%"
                    : "100%"
                }`,
              }}
            />
          </div>

          {/* Steps */}
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.number);
            const isActive = currentStep === step.number;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center gap-2 relative z-10"
              >
                {/* Step Circle */}
                <div
                  className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-body-sm font-semibold transition-colors duration-200 ${
                    isCompleted
                      ? "bg-color-success text-white"
                      : isActive
                      ? "bg-color-accent text-white"
                      : "bg-color-surface border-2 border-color-border text-color-text-muted"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  ) : (
                    step.number
                  )}
                </div>
                {/* Step Label */}
                <span
                  className={`text-caption font-semibold ${
                    isActive || isCompleted
                      ? "text-color-accent"
                      : "text-color-text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Step Content Wrapper */}
      <div ref={stepContainerRef} className="min-h-[320px] mb-8">
        {showSuccess ? (
          <BookingSuccess formData={formData} onBookAnother={resetBooking} />
        ) : (
          <>
            {currentStep === 1 && (
              <BookingStep1
                selectedSpecialty={formData.specialty}
                onSelectSpecialty={(val) => updateField("specialty", val)}
                error={errors.specialty}
              />
            )}
            {currentStep === 2 && (
              <BookingStep2
                formData={formData}
                updateField={updateField}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <BookingStep3
                formData={formData}
                updateField={updateField}
                errors={errors}
                setErrors={setErrors}
                onGoToStep={(s) => setCurrentStep(s)}
              />
            )}
          </>
        )}
      </div>

      {/* Back / Continue Buttons Bar */}
      {!showSuccess && (
        <div className="flex justify-between items-center pt-5 border-t border-color-border/60">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-secondary min-h-[40px] px-6"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={handleNext}
            className="btn-primary min-h-[40px] px-6"
          >
            <span>{currentStep === 3 ? "Confirm Booking" : "Continue"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
