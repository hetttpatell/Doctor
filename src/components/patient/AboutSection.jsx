import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
      });
    },
    { scope: sectionRef }
  );

  const features = [
    "State-of-the-art diagnostic laboratories",
    "NABH & NABL certified quality standards",
    "Paperless fully-encrypted electronic records",
    "Dedicated 24/7 cardiac and trauma response teams",
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="py-24 bg-color-bg-secondary"
    >
      <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Image with floating accent pill */}
        <div className="about-reveal relative flex justify-center lg:justify-start">
          <div className="relative aspect-[4/5] w-full max-w-md rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600"
              alt="Aarjav Hospital Modern Corridor"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Overlapping Est. Pill Badge */}
            <div className="absolute bottom-6 left-6 bg-color-surface border border-color-border shadow-md px-4 py-2 rounded-full z-10">
              <span className="text-label text-color-text-primary font-semibold">
                Est. 2004 &middot; Ahmedabad
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Copy */}
        <div className="about-reveal flex flex-col gap-6 text-left">
          {/* Overline */}
          <span className="text-label text-color-accent font-semibold uppercase tracking-widest">
            About Aarjav Hospital
          </span>

          {/* Headline */}
          <h2 className="text-section text-color-text-primary leading-tight">
            A Legacy of Healing,<br />
            Built on Science.
          </h2>

          {/* Body Paragraphs */}
          <div className="flex flex-col gap-4 text-body text-color-text-secondary leading-[1.8]">
            <p>
              Since 2004, Aarjav Hospital has established itself as Ahmedabad&apos;s premier multi-specialty healthcare institution. We coordinate medical expertise, advanced treatment research, and patient care into a unified, high-precision framework.
            </p>
            <p>
              Our practitioners are board-certified specialists who prioritize evidence-based protocols, treating every individual with detailed attention and clinical exactness.
            </p>
          </div>

          {/* Blockquote Mission Statement */}
          <blockquote className="border-l-2 border-color-accent pl-6 my-2 italic text-body text-color-text-primary">
            &ldquo;To provide clinical care of Swiss hospitality standard, driven by scientific rigor, and designed around the patient&apos;s peace of mind.&rdquo;
          </blockquote>

          {/* Features List */}
          <ul className="flex flex-col gap-3 mt-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-body-sm text-color-text-secondary">
                <span className="w-5 h-5 rounded-full bg-color-accent-light text-color-accent flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Link */}
          <div className="mt-4">
            <a href="#booking-section" className="btn-secondary">
              Learn Our Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
