import { Star } from "lucide-react";

export default function DoctorCard({ doctor, onBook }) {
  // Generate star array
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="group bg-color-surface border border-color-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Doctor Photo */}
      <div className="relative aspect-[3/4] overflow-hidden bg-color-bg-secondary w-full">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Info Container */}
      <div className="p-3.5 sm:p-6 flex flex-col gap-2.5 sm:gap-3 text-left">
        {/* Name and Designation */}
        <div>
          <h3 className="font-serif text-sm xs:text-base sm:text-lg font-semibold text-color-text-primary group-hover:text-color-accent transition-colors duration-200 line-clamp-1">
            {doctor.name}
          </h3>
          <p className="text-[11px] xs:text-xs sm:text-body-sm text-color-text-secondary mt-0.5 leading-tight truncate">
            {doctor.designation}
          </p>
        </div>

        {/* Specialty and Experience */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          <span className="inline-flex text-[9px] xs:text-label text-color-accent bg-color-accent-light px-2 py-0.5 rounded-full font-medium capitalize">
            {doctor.specialty}
          </span>
          <span className="text-[10px] xs:text-caption sm:text-body-sm text-color-text-secondary font-medium shrink-0">
            {doctor.experience} Yrs Exp
          </span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1 flex-wrap">
          <div className="flex items-center gap-0.5 text-color-accent shrink-0">
            {stars.map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                  star <= Math.floor(doctor.rating) ? "fill-color-accent" : ""
                }`}
                strokeWidth={2}
              />
            ))}
          </div>
          <span className="text-[11px] sm:text-body-sm font-semibold text-color-text-primary ml-0.5 shrink-0">
            {doctor.rating}
          </span>
          <span className="text-[9px] xs:text-caption text-color-text-muted shrink-0">
            ({doctor.reviewCount})
          </span>
        </div>

        {/* Availability Timing */}
        <div className="pt-2 border-t border-color-border text-[10px] sm:text-caption text-color-text-muted flex justify-between items-center">
          <span>Fee:</span>
          <span className="font-semibold text-color-text-primary">&#8377;{doctor.consultationFee}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-3.5 pb-3.5 sm:px-6 sm:pb-6 pt-0">
        <button
          onClick={onBook}
          className="btn-primary-sm w-full text-center text-xs sm:text-body-sm py-1.5 sm:py-2 px-2 sm:px-4 min-h-[34px] sm:min-h-[38px] cursor-pointer"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
