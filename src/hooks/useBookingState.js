import { useState, useCallback } from "react";
import { doctors } from "../data/doctors";

const INITIAL_FORM_STATE = {
  specialty: "",
  doctor: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

export function useBookingState() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setShowSuccess(false);
    setErrors({});
    setFormData(INITIAL_FORM_STATE);
  }, []);

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  const prefillBooking = useCallback((specId, docId) => {
    setFormData((prev) => {
      let resolvedSpec = specId || prev.specialty;
      if (docId) {
        const docObj = doctors.find((d) => d.id === docId);
        if (docObj) {
          resolvedSpec = docObj.specialty;
        }
      }
      return {
        ...prev,
        specialty: resolvedSpec,
        doctor: docId || "",
      };
    });
    // Move to step 2 (selecting doctor/time) directly if specialty/doctor is selected
    setCurrentStep(2);
    setCompletedSteps([1]);
  }, []);

  const validateStep = useCallback((step) => {
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
  }, [formData]);

  const handleNext = useCallback(() => {
    if (!validateStep(currentStep)) return false;
    
    setCompletedSteps((prev) => [...new Set([...prev, currentStep])]);
    if (currentStep === 3) {
      setShowSuccess(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
    return true;
  }, [currentStep, validateStep]);

  const handleBack = useCallback(() => {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  return {
    currentStep,
    setCurrentStep,
    completedSteps,
    setCompletedSteps,
    showSuccess,
    setShowSuccess,
    errors,
    setErrors,
    formData,
    setFormData,
    updateField,
    prefillBooking,
    handleNext,
    handleBack,
    resetBooking,
  };
}
