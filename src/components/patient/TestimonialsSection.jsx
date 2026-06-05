import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const quoteContainerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".testimonial-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      });
    },
    { scope: sectionRef }
  );

  const handlePrev = () => {
    animateTransition(() => {
      setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    }, -20);
  };

  const handleNext = () => {
    animateTransition(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 20);
  };

  const animateTransition = (updateStateFn, xOffset) => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      updateStateFn();
      return;
    }

    gsap.to(quoteContainerRef.current, {
      opacity: 0,
      x: -xOffset,
      duration: 0.2,
      onComplete: () => {
        updateStateFn();
        gsap.fromTo(
          quoteContainerRef.current,
          { opacity: 0, x: xOffset },
          { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  };

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials-section"
      ref={sectionRef}
      className="py-24 bg-color-bg-secondary overflow-hidden"
    >
      <div className="container-main max-w-4xl flex flex-col items-center relative">
        {/* Quote Icon Overlay */}
        <div className="absolute top-12 left-6 md:left-20 text-color-accent opacity-15 pointer-events-none select-none">
          <svg
            className="w-24 h-24"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.595 2.823-4.595 6.3h4.8v9.55h-10.183zm-12.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.596 2.823-4.596 6.3h4.8v9.55h-10.2z" />
          </svg>
        </div>

        {/* Section Header */}
        <div className="testimonial-reveal flex flex-col items-center text-center gap-2 mb-12 relative z-10">
          <span className="text-label text-color-accent font-semibold uppercase tracking-widest">
            Patient Stories
          </span>
          <h2 className="text-section text-color-text-primary">
            Experiences That Inspire
          </h2>
        </div>

        {/* Testimonial Active Display */}
        <div
          ref={quoteContainerRef}
          className="testimonial-reveal flex flex-col items-center text-center max-w-2xl relative z-10 px-6"
        >
          {/* Quote Text */}
          <p className="font-serif text-2xl md:text-3xl italic font-normal text-color-text-primary leading-[1.4] mb-8">
            &ldquo;{current.text}&rdquo;
          </p>

          {/* User Details Row */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-10 h-10 rounded-full object-cover shadow-sm"
              loading="lazy"
            />
            <div className="flex flex-col text-left">
              <span className="font-sans text-body font-semibold text-color-text-primary">
                {current.name}
              </span>
              <span className="font-sans text-body-sm text-color-text-secondary">
                {current.procedure}
              </span>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5 text-color-accent mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-color-accent"
                strokeWidth={2}
              />
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="testimonial-reveal flex items-center justify-between w-full max-w-xs mt-4 relative z-10">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="w-12 h-12 rounded-full bg-color-surface border border-color-border shadow-sm text-color-accent flex items-center justify-center hover:bg-color-accent-light transition-colors cursor-pointer focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Dot Indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentIndex) {
                    const direction = index > currentIndex ? 20 : -20;
                    animateTransition(() => setCurrentIndex(index), direction);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer focus:outline-none ${
                  index === currentIndex ? "bg-color-accent" : "bg-color-border"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="w-12 h-12 rounded-full bg-color-surface border border-color-border shadow-sm text-color-accent flex items-center justify-center hover:bg-color-accent-light transition-colors cursor-pointer focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
