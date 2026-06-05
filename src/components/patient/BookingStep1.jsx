import * as Icons from "lucide-react";
import { specialties } from "../../data/specialties";

export default function BookingStep1({ selectedSpecialty, onSelectSpecialty, error }) {
  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Choose Specialty</legend>
      <div className="flex flex-col gap-1 text-left">
        <h4 className="font-serif text-lg font-semibold text-color-text-primary">
          Select Clinical Specialty
        </h4>
        <p className="text-body-sm text-color-text-secondary">
          Select the medical department representing your symptoms or care needs.
        </p>
      </div>

      {error && (
        <p className="text-color-error text-label font-medium bg-red-50 border border-color-error/20 px-3 py-2 rounded-md" role="alert">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {specialties.map((spec) => {
          const isSelected = selectedSpecialty === spec.id;
          const Icon = Icons[spec.icon] || Icons.HelpCircle;

          return (
            <label
              key={spec.id}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-center select-none ${
                isSelected
                  ? "border-color-accent bg-color-accent-light/35 shadow-sm"
                  : "border-color-border hover:border-color-accent/40 bg-color-surface"
              }`}
            >
              <input
                type="radio"
                name="step1-specialty"
                value={spec.id}
                checked={isSelected}
                onChange={() => onSelectSpecialty(spec.id)}
                className="sr-only"
              />
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                isSelected ? "bg-color-accent text-white" : "bg-color-bg-secondary text-color-text-secondary"
              }`}>
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="font-serif text-body-sm font-semibold text-color-text-primary">
                {spec.name}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
