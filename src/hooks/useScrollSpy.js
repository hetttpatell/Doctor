import { useState, useEffect } from "react";

export function useScrollSpy(selectors, options = {}) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = selectors.map((sel) => document.querySelector(sel)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px", // triggers when section is in the middle viewport
        threshold: 0.1,
        ...options,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [selectors, options]);

  return activeId;
}
