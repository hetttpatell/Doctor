import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { specialties } from "../../data/specialties";
import SpecialtyCard from "./SpecialtyCard";

export default function SpecialtiesSection({ onSelectSpecialty }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".specialties-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="specialties-section"
      ref={sectionRef}
      className="py-24 bg-color-bg-primary"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="specialties-reveal flex flex-col items-center text-center gap-2 mb-12">
          <span className="text-label text-color-accent font-semibold uppercase tracking-widest">
            Our Departments
          </span>
          <h2 className="text-section text-color-text-primary">
            Specialized Clinical Services
          </h2>
          <p className="text-body text-color-text-secondary max-w-xl mt-1">
            World-class medical departments staffed by leading board-certified physicians.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialties.map((spec) => (
            <div key={spec.id} className="specialties-reveal">
              <SpecialtyCard
                specialty={spec}
                onClick={() => onSelectSpecialty(spec.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
