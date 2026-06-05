import { useState, useMemo } from "react";
import { specialties } from "../../data/specialties";
import { doctors } from "../../data/doctors";

export default function HeroBookingCard({ onPrefill }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const filteredDoctors = useMemo(() => {
    if (!selectedSpecialty) return doctors;
    return doctors.filter((doc) => doc.specialty === selectedSpecialty);
  }, [selectedSpecialty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPrefill({
      specialty: selectedSpecialty,
      doctor: selectedDoctor,
      date,
      name,
      phone,
    });
  };

  // Get tomorrow's date for minimum input date
  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  }, []);

  return (
    <div className="bg-color-surface rounded-xl p-5 xs:p-6 sm:p-8 shadow-xl max-w-md w-full border border-color-border/60">
      <div className="flex flex-col gap-1.5 mb-4 sm:mb-6">
        <h3 className="font-serif text-xl sm:text-2xl text-color-text-primary font-semibold">
          Quick Appointment
        </h3>
        <div className="h-0.5 w-12 bg-color-accent" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
        {/* Specialty Selection */}
        <div>
          <label className="block text-label text-color-text-primary font-medium mb-1">
            Select Specialty
          </label>
          <select
            value={selectedSpecialty}
            onChange={(e) => {
              setSelectedSpecialty(e.target.value);
              setSelectedDoctor(""); // Reset doctor on specialty change
            }}
            className="input-field py-1.5 sm:py-2.5 text-body-sm h-10 sm:h-11"
            required
          >
            <option value="">Choose Department...</option>
            {specialties.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-label text-color-text-primary font-medium mb-1">
            Select Doctor
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="input-field py-1.5 sm:py-2.5 text-body-sm h-10 sm:h-11"
            disabled={!selectedSpecialty}
          >
            <option value="">Any Specialist</option>
            {filteredDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-label text-color-text-primary font-medium mb-1">
            Preferred Date
          </label>
          <input
            type="date"
            min={minDate}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field py-1.5 sm:py-2.5 text-body-sm h-10 sm:h-11"
            required
          />
        </div>

        {/* Patient Name and Phone side-by-side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-label text-color-text-primary font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field py-1.5 sm:py-2.5 text-body-sm h-10 sm:h-11"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-label text-color-text-primary font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field py-1.5 sm:py-2.5 text-body-sm h-10 sm:h-11"
              required
              autoComplete="tel"
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary w-full text-center mt-2 cursor-pointer">
          Check Available Slots &rarr;
        </button>
      </form>
    </div>
  );
}
