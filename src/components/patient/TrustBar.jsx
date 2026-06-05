import { Award, Clock, Star, Users } from "lucide-react";

export default function TrustBar() {
  const trustItems = [
    {
      icon: Award,
      title: "NABH Accredited",
      subtitle: "National Accreditation Board",
    },
    {
      icon: Star,
      title: "4.9 / 5.0 Rating",
      subtitle: "Based on 3,200+ reviews",
    },
    {
      icon: Clock,
      title: "24/7 Emergency",
      subtitle: "Round-the-clock care",
    },
    {
      icon: Users,
      title: "80+ Specialists",
      subtitle: "Across 25 departments",
    },
  ];

  return (
    <div className="w-full bg-color-surface border-y border-color-border py-6 relative z-30">
      <div className="container-main">
        <div className="flex overflow-x-auto scrollbar-none items-center justify-between gap-8 md:gap-4 select-none">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 shrink-0 min-w-[200px] md:min-w-0"
              >
                {/* Icon Container */}
                <div className="text-color-text-secondary">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                {/* Text Labels */}
                <div className="flex flex-col text-left">
                  <span className="font-sans text-body-sm font-semibold text-color-text-primary leading-tight">
                    {item.title}
                  </span>
                  <span className="font-sans text-caption text-color-text-muted mt-0.5 leading-none">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
