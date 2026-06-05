import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "../data/hospitalData";

gsap.registerPlugin(ScrollTrigger);

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "#14B8A6" : "#E2E8F0"}
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".testimonials-header",
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
          ".testimonial-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".testimonial-cards-grid",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const avatarPalettes = [
    "bg-blue-600/10 text-blue-600",
    "bg-teal-600/10 text-teal-600",
    "bg-purple-600/10 text-purple-600",
    "bg-indigo-600/10 text-indigo-600",
  ];

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="py-24 lg:py-32 bg-clinical-light relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="testimonials-header text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-full px-4.5 py-1.5 text-xs font-bold font-display uppercase tracking-wider mb-4 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Patient Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Loved & Trusted by Patients
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Real stories of compassion, prompt emergency care, and successful treatments from our patient registry.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="testimonial-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t, idx) => (
            <article
              key={t.id}
              className="testimonial-card bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Quotation SVG Icon */}
              <div className="text-blue-500/10 mb-5">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M11.192 10.485s-.57-.73-1.21-1.077c-.443-.24-.954-.424-1.528-.424-1.895 0-3.442 1.577-3.442 3.51 0 1.935 1.547 3.512 3.442 3.512 1.488 0 2.766-.967 3.253-2.316.2-.553.287-1.127.287-1.74 0-1.785-.436-3.856-1.802-5.744L8.718 4.72c-.28-.39-.773-.5-1.144-.247l-.986.67c-.372.253-.477.747-.23 1.137l1.393 2.195c.575.908 1.44 2.01 1.44 2.01zm8.808 0s-.57-.73-1.21-1.077c-.443-.24-.954-.424-1.528-.424-1.895 0-3.442 1.577-3.442 3.51 0 1.935 1.547 3.512 3.442 3.512 1.488 0 2.766-.967 3.253-2.316.2-.553.287-1.127.287-1.74 0-1.785-.436-3.856-1.802-5.744L17.526 4.72c-.28-.39-.773-.5-1.144-.247l-.986.67c-.372.253-.477.747-.23 1.137l1.393 2.195c.575.908 1.44 2.01 1.44 2.01z" />
                </svg>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium italic">
                "{t.text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 font-display ${avatarPalettes[idx % avatarPalettes.length]}`}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-black text-slate-800 font-display">
                      {t.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{t.date}</div>
                  </div>
                </div>
                <StarRating rating={t.rating} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
