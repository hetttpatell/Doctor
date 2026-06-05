import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { hospitalDetails } from "../data/hospitalData";
import BookingPortal from "./BookingPortal";

export default function HeroSection({
  highlightTrigger,
  onHighlightEnd,
  preSelectedSpecialty,
  preSelectedDoctor,
}) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          ".hero-badge",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 }
        )
          .fromTo(
            ".hero-title",
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.4"
          )
          .fromTo(
            ".hero-subtitle",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.5"
          )
          .fromTo(
            ".hero-stats-row",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            ".hero-portal-wrap",
            { opacity: 0, y: 35, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.9 },
            "-=0.6"
          )
          .fromTo(
            ".floating-badge",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15 },
            "-=0.3"
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-clinical-dark pt-28 pb-20"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep Glowing Blobs */}
        <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] bg-blue-600/10 rounded-full glowing-blob" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-teal-500/10 rounded-full glowing-blob" />
        <div className="absolute top-10 left-1/3 w-[300px] h-[300px] bg-indigo-500/5 rounded-full glowing-blob" />

        {/* Tech Mesh Pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hospital Brand Content */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6">
            {/* Rating Pill */}
            <div className="hero-badge inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4.5 py-1.5 backdrop-blur-md">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="#14B8A6"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-white text-xs font-bold font-display uppercase tracking-wider">
                Top Rated Emergency Care ({hospitalDetails.rating})
              </span>
            </div>

            {/* Typography Heading */}
            <h1 className="hero-title text-4xl sm:text-5xl lg:text-[54px] font-black text-white leading-[1.15] tracking-tight">
              Redefining Care with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Advanced Precision
              </span>
            </h1>

            {/* Premium Editorial Subtitle */}
            <p className="hero-subtitle text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              At <strong className="text-white font-bold">{hospitalDetails.name}</strong>, we integrate board-certified physicians, state-of-the-art diagnostic medical facilities, and a seamless online scheduling system. Available for patients 24 hours, 7 days a week.
            </p>

            {/* Glowing Statistics */}
            <div className="hero-stats-row grid grid-cols-3 gap-4 border-t border-white/5 pt-6 max-w-md">
              {[
                { value: "15+", label: "Board Doctors" },
                { value: "24/7", label: "Critical Care" },
                { value: "10K+", label: "Happy Patients" },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-2xl font-black text-white font-display bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 flex-wrap pt-4">
              <span className="floating-badge inline-flex items-center gap-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                NABH Accredited
              </span>
              <span className="floating-badge inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3.5 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                Paperless Registry
              </span>
            </div>
          </div>

          {/* Right Column: Portal Widget */}
          <div className="lg:col-span-6 hero-portal-wrap w-full">
            <BookingPortal
              highlightTrigger={highlightTrigger}
              onHighlightEnd={onHighlightEnd}
              preSelectedSpecialty={preSelectedSpecialty}
              preSelectedDoctor={preSelectedDoctor}
            />
          </div>
        </div>
      </div>

      {/* Parallax separator line & subtle gradient transition to light section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-clinical-light to-transparent" />
    </section>
  );
}
