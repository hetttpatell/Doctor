import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Upload, Check, User, DollarSign, Languages, FileText } from "lucide-react";

export default function DoctorProfile() {
  const { doctor, onUpdateProfile } = useOutletContext();
  const [name, setName] = useState(doctor.name);
  const [designation, setDesignation] = useState(doctor.designation || "MD, DM (Cardiology)");
  const [specialty, setSpecialty] = useState(doctor.specialty || "Cardiology");
  const [fee, setFee] = useState(doctor.consultationFee || 700);
  const [languages, setLanguages] = useState(doctor.languages ? doctor.languages.join(", ") : "English, Hindi, Gujarati");
  const [bio, setBio] = useState(doctor.bio || "Dr. Priya Sharma is a senior consultant cardiologist with over 14 years of experience.");
  const [avatarPreview, setAvatarPreview] = useState(doctor.avatar);
  const [isSaved, setIsSaved] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);

    const updatedLanguages = languages
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);

    onUpdateProfile({
      ...doctor,
      name,
      designation,
      specialty,
      consultationFee: Number(fee),
      languages: updatedLanguages,
      bio,
      avatar: avatarPreview,
    });

    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 text-left">
      <div className="flex flex-col select-none">
        <h2 className="font-serif text-2xl font-semibold text-color-text-primary">
          My Practitioner Profile
        </h2>
        <p className="text-body-sm text-color-text-secondary mt-1">
          Update your public profile, consultation fee, and photo upload.
        </p>
      </div>

      <div className="bg-color-portal-surface border border-color-border/60 rounded-lg shadow-sm p-6 md:p-8 max-w-3xl w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Avatar Upload / Drag and Drop (Section 11.6) */}
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-color-border/60">
            <div className="relative shrink-0 select-none">
              <img
                src={avatarPreview}
                alt="Practitioner Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-color-portal-accent"
              />
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-color-portal-sidebar border border-white/20 rounded-full flex items-center justify-center text-white cursor-pointer shadow-xs" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 w-full border-2 border-dashed border-color-border hover:border-color-portal-accent/40 rounded-lg p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-50/35 select-none"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
              <Upload className="w-6 h-6 text-color-text-muted mb-2" />
              <span className="text-body-sm font-semibold text-color-text-primary">
                Drag and drop your profile photo here
              </span>
              <span className="text-[10px] text-color-text-muted mt-1">
                Supports JPG, PNG (Max size: 2MB). Click to browse.
              </span>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="profile-name" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                Practitioner Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-color-text-muted select-none">
                  <User className="w-4.5 h-4.5" />
                </span>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field portal-input pl-11 focus-blue"
                  required
                />
              </div>
            </div>

            {/* Designation */}
            <div>
              <label htmlFor="profile-designation" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                Clinical Designation
              </label>
              <input
                id="profile-designation"
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="input-field portal-input focus-blue"
                required
              />
            </div>

            {/* Specialty Select */}
            <div>
              <label htmlFor="profile-specialty" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                Medical Specialty
              </label>
              <input
                id="profile-specialty"
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="input-field portal-input focus-blue"
                required
              />
            </div>

            {/* Consultation Fee */}
            <div>
              <label htmlFor="profile-fee" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                Consultation Fee (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-color-text-muted select-none">
                  <DollarSign className="w-4.5 h-4.5" />
                </span>
                <input
                  id="profile-fee"
                  type="number"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="input-field portal-input pl-11 focus-blue"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Languages */}
            <div className="md:col-span-2">
              <label htmlFor="profile-languages" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                Languages Spoken (comma separated)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-color-text-muted select-none">
                  <Languages className="w-4.5 h-4.5" />
                </span>
                <input
                  id="profile-languages"
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="input-field portal-input pl-11 focus-blue"
                  placeholder="English, Hindi, Gujarati"
                  required
                />
              </div>
            </div>

            {/* Bio Description */}
            <div className="md:col-span-2">
              <label htmlFor="profile-bio" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
                Biography / Professional Summary
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-color-text-muted select-none">
                  <FileText className="w-4.5 h-4.5" />
                </span>
                <textarea
                  id="profile-bio"
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="input-field portal-input pl-11 resize-none py-3 focus-blue"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end select-none">
            <button
              type="submit"
              className="btn-portal-primary flex items-center justify-center gap-2 focus-blue"
            >
              {isSaved ? (
                <>
                  <Check className="w-4.5 h-4.5" />
                  Profile Saved
                </>
              ) : (
                "Save Profile Settings"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
