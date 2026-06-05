import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { doctors } from "../data/hospitalData";

gsap.registerPlugin(ScrollTrigger);

export default function DoctorsSection({ onSelectDoctor }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".doctors-header",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );

        gsap.fromTo(
          ".doctor-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".doctor-cards-grid",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  // High-end medical color palettes for doctor avatar nodes
  const avatarPalettes = [
    "from-blue-600 to-indigo-600 text-white",
    "from-teal-600 to-emerald-600 text-white",
    "from-violet-600 to-purple-600 text-white",
    "from-cyan-600 to-blue-500 text-white",
    "from-indigo-600 to-violet-500 text-white",
    "from-emerald-600 to-teal-500 text-white",
  ];

  return (
    <section ref={containerRef} id="doctors" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="doctors-header text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100/30 text-teal-600 rounded-full px-4.5 py-1.5 text-xs font-bold font-display uppercase tracking-wider mb-4 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Medical Team
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Consult Our Board-Certified Specialists
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Highly decorated physicians equipped with global healthcare experience, dedicated to your long-term wellness.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="doctor-cards-grid grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
          {doctors.map((doc, idx) => (
            <article
              key={doc.id}
              className="doctor-card group bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-500/15 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {/* Premium Styled Avatar */}
                  <div
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr flex items-center justify-center text-sm sm:text-lg font-black shrink-0 font-display shadow-md shadow-slate-200 ${avatarPalettes[idx % avatarPalettes.length]}`}
                  >
                    {doc.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs xs:text-sm sm:text-lg font-black text-slate-900 truncate font-display">
                      {doc.name}
                    </h3>
                    <p className="text-blue-600 text-[10px] sm:text-xs font-bold font-display uppercase tracking-wider mt-0.5 truncate">
                      {doc.specialty}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pb-4 border-b border-slate-50 sm:space-y-3 sm:pb-6">
                  <div className="flex items-center gap-1.5 sm:gap-2.5 text-slate-500 text-[10px] sm:text-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-slate-400 shrink-0 sm:w-4 sm:h-4">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="font-semibold text-slate-600 truncate">{doc.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2.5 text-[10px] sm:text-sm flex-wrap">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-slate-400 shrink-0 sm:w-4 sm:h-4">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span className="text-slate-600 font-semibold truncate">{doc.availability}</span>
                    {doc.availability === "24/7 On-Call" && (
                      <span className="inline-flex items-center gap-0.5 bg-green-50 text-green-600 text-[8px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-green-100">
                        <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Active
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Book Interactive CTA */}
              <button
                type="button"
                onClick={() => onSelectDoctor(doc.id)}
                className="mt-4 w-full py-2 sm:py-3 rounded-xl bg-slate-50 hover:bg-blue-600 group-hover:bg-blue-600 text-slate-700 hover:text-white group-hover:text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer text-center font-display border border-slate-100 hover:border-blue-600"
              >
                Book Now
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
