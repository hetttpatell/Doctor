import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { hospitalDetails } from "../data/hospitalData";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".contact-header",
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
          ".contact-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".contact-grid",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const contactItems = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Visit Our Campus",
      content: hospitalDetails.address,
      action: {
        label: "Launch Directions",
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospitalDetails.address)}`,
      },
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: "Direct Hotlines",
      content: hospitalDetails.phone,
      action: {
        label: "Place Call Now",
        href: `tel:${hospitalDetails.phone.replace(/\s/g, "")}`,
      },
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Admissions Hours",
      content: hospitalDetails.hours,
      action: null,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-24 lg:py-32 bg-white relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="contact-header text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 rounded-full px-4.5 py-1.5 text-xs font-bold font-display uppercase tracking-wider mb-4 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Location Hub
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Seamless Care, Close to You
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Conveniently situated in South Bopal with 24/7 emergency trauma response vehicles standing by.
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Information Cards Column */}
          <div className="lg:col-span-2 space-y-4">
            {contactItems.map((item, idx) => (
              <div
                key={idx}
                className="contact-card bg-slate-50 rounded-3xl p-6 border border-slate-100/50 hover:border-blue-500/15 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/5">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 mb-1 font-display">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">
                      {item.content}
                    </p>
                    {item.action ? (
                      <a
                        href={item.action.href}
                        target={item.action.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-blue-600 text-xs font-bold hover:gap-2 transition-all duration-200 cursor-pointer"
                      >
                        {item.action.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Accepting Emergencies
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Section */}
          <div className="contact-card lg:col-span-3">
            <div className="w-full h-80 lg:h-full min-h-[320px] rounded-3xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 relative group">
              <iframe
                title="Aarjav Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.8!2d72.47!3d23.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSouth+Bopal%2C+Ahmedabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[40%] contrast-[110%] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
