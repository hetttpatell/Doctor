import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroBookingCard from "./HeroBookingCard";

export default function HeroSection({ onPrefillQuickBook }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".hero-overline", { y: 16, opacity: 0, duration: 0.5 })
        .from(".hero-headline", { y: 24, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".hero-subline", { y: 16, opacity: 0, duration: 0.5 }, "-=0.4")
        .from(".hero-stat-item", { y: 12, opacity: 0, duration: 0.4, stagger: 0.1 }, "-=0.3")
        .from(".hero-cta-btn", { y: 12, opacity: 0, duration: 0.4, stagger: 0.1 }, "-=0.2")
        .from(".hero-booking-card-wrapper", { y: 20, opacity: 0, duration: 0.6, scale: 0.98 }, "-=0.5");
    },
    { scope: containerRef }
  );

  const handleScrollTo = (e, selector) => {
    e.preventDefault();
    const el = document.querySelector(selector);
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

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 lg:py-0 overflow-hidden bg-slate-950"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920"
          alt="Aarjav Hospital Exterior"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Editorial dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent max-lg:bg-black/65" />
      </div>

      <div className="container-main relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Headings & Copy */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-white text-left">
          {/* Overline tag */}
          <div className="hero-overline self-start">
            <span className="inline-flex items-center text-label text-color-accent-light bg-white/10 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-sm">
              NABH Accredited &middot; Est. 2004
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline text-hero tracking-wide">
            Trusted Care,<br />
            Delivered with <span className="italic">Precision.</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-subline text-body-lg text-white/70 max-w-xl leading-relaxed">
            Advanced diagnostics and specialist consultations in Ahmedabad &mdash; designed around you.
          </p>

          {/* Stats Row */}
          <div className="hero-stats flex items-center gap-6 md:gap-8 py-4 my-2 border-y border-white/10 self-start">
            <div className="hero-stat-item flex flex-col">
              <span className="font-serif text-3xl md:text-4xl font-bold text-white leading-none">25+</span>
              <span className="text-label text-white/60 mt-1 uppercase tracking-wider">Specialties</span>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="hero-stat-item flex flex-col">
              <span className="font-serif text-3xl md:text-4xl font-bold text-white leading-none">4.9★</span>
              <span className="text-label text-white/60 mt-1 uppercase tracking-wider">Rating</span>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div className="hero-stat-item flex flex-col">
              <span className="font-serif text-3xl md:text-4xl font-bold text-white leading-none">50k+</span>
              <span className="text-label text-white/60 mt-1 uppercase tracking-wider">Patients Served</span>
            </div>
          </div>

          {/* CTA Row */}
          <div className="hero-cta-row flex flex-wrap gap-4 mt-2">
            <a
              href="#booking-section"
              onClick={(e) => handleScrollTo(e, "#booking-section")}
              className="hero-cta-btn btn-primary min-w-[170px]"
            >
              Book Appointment
            </a>
            <a
              href="#doctors-section"
              onClick={(e) => handleScrollTo(e, "#doctors-section")}
              className="hero-cta-btn btn-ghost-white min-w-[170px]"
            >
              View Doctors
            </a>
          </div>
        </div>

        {/* Right Column: Floating Appointment Card */}
        <div className="lg:col-span-5 hero-booking-card-wrapper flex justify-center lg:justify-end lg:-mb-12 relative z-20">
          <HeroBookingCard onPrefill={onPrefillQuickBook} />
        </div>
      </div>
    </section>
  );
}
