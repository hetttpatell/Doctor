import { useState, useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { doctors } from "../../data/doctors";
import { specialties } from "../../data/specialties";
import DoctorCard from "./DoctorCard";

export default function DoctorsSection({ onSelectDoctor }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);

  const filteredDoctors = useMemo(() => {
    if (activeFilter === "all") return doctors;
    return doctors.filter((doc) => doc.specialty === activeFilter);
  }, [activeFilter]);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".doctors-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
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
      id="doctors-section"
      ref={sectionRef}
      className="py-24 bg-color-bg-primary"
    >
      <div className="container-main">
        {/* Section Header */}
        <div className="doctors-reveal flex flex-col items-center text-center gap-2 mb-12">
          <span className="text-label text-color-accent font-semibold uppercase tracking-widest">
            Medical Professionals
          </span>
          <h2 className="text-section text-color-text-primary">
            Our Consultant Specialists
          </h2>
          <p className="text-body text-color-text-secondary max-w-xl mt-1">
            Access board-certified experts dedicated to delivering precise care.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="doctors-reveal flex items-center justify-start md:justify-center overflow-x-auto scrollbar-none gap-2 pb-6 mb-8 w-full select-none">
          <button
            onClick={() => setActiveFilter("all")}
            className={`filter-pill shrink-0 ${
              activeFilter === "all"
                ? "bg-color-accent text-white"
                : "bg-color-bg-secondary border border-color-border text-color-text-secondary hover:bg-color-accent-light hover:text-color-accent"
            }`}
          >
            All Specialists
          </button>
          {specialties.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setActiveFilter(spec.id)}
              className={`filter-pill shrink-0 ${
                activeFilter === Math.floor(spec.id) || activeFilter === spec.id
                  ? "bg-color-accent text-white"
                  : "bg-color-bg-secondary border border-color-border text-color-text-secondary hover:bg-color-accent-light hover:text-color-accent"
              }`}
            >
              {spec.name}
            </button>
          ))}
        </div>

        {/* Doctors Grid - 2x4 on mobile view for 8 doctors */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 min-h-[300px]">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="doctors-reveal">
              <DoctorCard
                doctor={doc}
                onBook={() => onSelectDoctor(doc.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
