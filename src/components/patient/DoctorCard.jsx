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
      <div className="p-6 flex flex-col gap-3 text-left">
        {/* Name and Designation */}
        <div>
          <h3 className="font-serif text-lg font-semibold text-color-text-primary group-hover:text-color-accent transition-colors duration-200">
            {doctor.name}
          </h3>
          <p className="text-body-sm text-color-text-secondary mt-0.5 leading-none">
            {doctor.designation}
          </p>
        </div>

        {/* Specialty and Experience */}
        <div className="flex items-center gap-3">
          <span className="inline-flex text-label text-color-accent bg-color-accent-light px-2.5 py-0.5 rounded-full font-medium capitalize">
            {doctor.specialty}
          </span>
          <span className="text-body-sm text-color-text-secondary font-medium">
            {doctor.experience} Years Exp
          </span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 text-color-accent">
            {stars.map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.floor(doctor.rating) ? "fill-color-accent" : ""
                }`}
                strokeWidth={2}
              />
            ))}
          </div>
          <span className="text-body-sm font-semibold text-color-text-primary ml-1">
            {doctor.rating}
          </span>
          <span className="text-caption text-color-text-muted">
            ({doctor.reviewCount} reviews)
          </span>
        </div>

        {/* Availability Timing */}
        <div className="pt-2 border-t border-color-border text-caption text-color-text-muted flex justify-between items-center">
          <span>Consultation Fee:</span>
          <span className="font-semibold text-color-text-primary">&#8377;{doctor.consultationFee}</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-6 pt-0">
        <button
          onClick={onBook}
          className="btn-primary-sm w-full text-center"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
}
