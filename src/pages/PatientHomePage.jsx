import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBookingState } from "../hooks/useBookingState";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/patient/HeroSection";
import TrustBar from "../components/patient/TrustBar";
import SpecialtiesSection from "../components/patient/SpecialtiesSection";
import AboutSection from "../components/patient/AboutSection";
import DoctorsSection from "../components/patient/DoctorsSection";
import TestimonialsSection from "../components/patient/TestimonialsSection";
import BookingSection from "../components/patient/BookingSection";
import ContactSection from "../components/patient/ContactSection";
import Footer from "../components/layout/Footer";

export default function PatientHomePage() {
  const bookingState = useBookingState();
  const location = useLocation();

  // Handle cross-page navigation scrolling
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const targetId = location.state.scrollTo;
      const el = document.querySelector(targetId);
      if (el) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
      // Clear location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Synchronized smooth scrolling helper for buttons
  const scrollToBookingSection = () => {
    const el = document.getElementById("booking-section");
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePrefillQuickBook = (data) => {
    bookingState.setFormData((prev) => ({
      ...prev,
      specialty: data.specialty || prev.specialty,
      doctor: data.doctor || prev.doctor,
      date: data.date || prev.date,
      name: data.name || prev.name,
      phone: data.phone || prev.phone,
    }));
    // Advance to Step 2 (selecting doctor/time)
    bookingState.setCurrentStep(2);
    bookingState.setCompletedSteps([1]);
    scrollToBookingSection();
  };

  const handleSelectSpecialty = (specId) => {
    bookingState.prefillBooking(specId, null);
    scrollToBookingSection();
  };

  const handleSelectDoctor = (docId) => {
    bookingState.prefillBooking(null, docId);
    scrollToBookingSection();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to Main Content link for accessibility (Section 16) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-color-accent focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:z-50 focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      <Navbar />

      <main id="main-content" className="flex-grow">
        {/* Hero Banner Grid */}
        <HeroSection onPrefillQuickBook={handlePrefillQuickBook} />

        {/* Accreditations Bar */}
        <TrustBar />

        {/* About Hospital Split */}
        <AboutSection />

        {/* Specialty Grid list */}
        <SpecialtiesSection onSelectSpecialty={handleSelectSpecialty} />

        {/* Doctors Grid list */}
        <DoctorsSection onSelectDoctor={handleSelectDoctor} />

        {/* Reviews Quote Slider */}
        <TestimonialsSection />

        {/* Multi-step appointment scheduler card */}
        <BookingSection bookingState={bookingState} />

        {/* Forms Map Grid */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
