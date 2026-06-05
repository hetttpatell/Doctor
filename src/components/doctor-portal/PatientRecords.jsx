import { useState, useMemo } from "react";
import { Search, Shield, Eye } from "lucide-react";

export default function PatientRecords() {
  const [searchQuery, setSearchQuery] = useState("");

  const mockRecords = [
    { id: "REC-1092", name: "Rohan Desai", age: 42, gender: "Male", condition: "Chronic Angina", lastVisit: "2026-06-05" },
    { id: "REC-2983", name: "Rahul Mehta", age: 37, gender: "Male", condition: "Chest Tightness", lastVisit: "2026-06-05" },
    { id: "REC-4890", name: "Anita Shah", age: 58, gender: "Female", condition: "Hypertension Stage 2", lastVisit: "2026-05-12" },
    { id: "REC-9302", name: "Savita Patel", age: 64, gender: "Female", condition: "Mitral Valve Regurgitation", lastVisit: "2026-04-20" },
  ];

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return mockRecords;
    const q = searchQuery.toLowerCase();
    return mockRecords.filter((r) => r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col gap-6 text-left">
      <div className="flex flex-col select-none">
        <h2 className="font-serif text-2xl font-semibold text-color-text-primary">
          Patient Medical Records
        </h2>
        <p className="text-body-sm text-color-text-secondary mt-1">
          Authorized practitioner archive &mdash; view only mode active.
        </p>
      </div>

      {/* Access banner */}
      <div className="bg-slate-100 border border-color-border/60 p-4 rounded-lg flex items-center gap-3 text-body-sm text-color-text-secondary select-none">
        <Shield className="w-5 h-5 text-color-portal-accent shrink-0" />
        <span>This portal is protected by HIPAA data compliance rules. Access is logged.</span>
      </div>

      {/* Search */}
      <div className="relative max-w-md w-full select-none">
        <span className="absolute left-3.5 top-3.5 text-color-text-muted">
          <Search className="w-4.5 h-4.5" />
        </span>
        <input
          type="text"
          placeholder="Search patient record by name or file ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field portal-input pl-11 focus-blue"
        />
      </div>

      {/* Table */}
      <div className="bg-color-portal-surface border border-color-border/60 rounded-lg shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse text-body-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-color-border/60 select-none">
                <th className="p-4 font-semibold text-color-text-primary">Record ID</th>
                <th className="p-4 font-semibold text-color-text-primary">Patient Name</th>
                <th className="p-4 font-semibold text-color-text-primary">Age / Gender</th>
                <th className="p-4 font-semibold text-color-text-primary">Diagnosis</th>
                <th className="p-4 font-semibold text-color-text-primary">Last Visited</th>
                <th className="p-4 font-semibold text-color-text-primary w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record) => (
                <tr key={record.id} className="border-b border-color-border/40 last:border-none hover:bg-slate-50/50">
                  <td className="p-4 font-mono font-semibold text-color-text-primary">{record.id}</td>
                  <td className="p-4 font-semibold text-color-text-primary">{record.name}</td>
                  <td className="p-4 text-color-text-secondary">{record.age} / {record.gender}</td>
                  <td className="p-4 text-color-text-secondary">{record.condition}</td>
                  <td className="p-4 text-color-text-secondary font-mono">{record.lastVisit}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => alert(`Reviewing clinical record ${record.id} details requires secondary verification code.`)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-color-portal-accent cursor-pointer focus-blue flex items-center justify-center gap-1 mx-auto"
                      title="View record"
                    >
                      <Eye className="w-4.5 h-4.5" />
                      <span className="text-caption font-bold">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
