import * as Icons from "lucide-react";

export default function SpecialtyCard({ specialty, onClick }) {
  // Dynamically resolve Lucide Icon
  const IconComponent = Icons[specialty.icon] || Icons.HelpCircle;

  return (
    <div
      onClick={onClick}
      className="group bg-color-surface border border-color-border rounded-lg p-6 shadow-sm hover:shadow-md hover:border-color-accent transition-all duration-200 cursor-pointer flex flex-col items-start text-left select-none translate-y-0 hover:-translate-y-1"
    >
      {/* Icon Container */}
      <div className="w-12 h-12 rounded-md bg-color-accent-light text-color-accent flex items-center justify-center">
        <IconComponent className="w-6 h-6" strokeWidth={1.5} />
      </div>

      {/* Name */}
      <h3 className="font-serif text-lg font-semibold text-color-text-primary mt-4">
        {specialty.name}
      </h3>

      {/* Short Description */}
      <p className="text-body-sm text-color-text-secondary mt-1 line-clamp-1 w-full">
        {specialty.shortDescription}
      </p>

      {/* Arrow Indicator */}
      <div className="flex items-center gap-1 text-color-accent text-body-sm font-semibold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <span>Learn More</span>
        <span>&rarr;</span>
      </div>
    </div>
  );
}
