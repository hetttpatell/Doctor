const LOCAL_STORAGE_KEY = "aarjav_hospital_appointments";

const INITIAL_APPOINTMENTS = [
  {
    id: "APT-20260605-0012",
    patientName: "Rohan Desai",
    patientEmail: "rohan@email.com",
    patientPhone: "+91 98765 43210",
    doctorId: "dr-001",
    specialty: "cardiology",
    date: new Date().toISOString().split("T")[0], // Today
    time: "10:00 AM",
    symptoms: "Chest discomfort, shortness of breath",
    status: "confirmed",
    createdAt: "2026-06-04T09:22:00Z",
  },
  {
    id: "APT-20260605-0034",
    patientName: "Rahul Mehta",
    patientEmail: "rahul.mehta@yahoo.com",
    patientPhone: "+91 99245 12098",
    doctorId: "dr-001",
    specialty: "cardiology",
    date: new Date().toISOString().split("T")[0], // Today
    time: "11:30 AM",
    symptoms: "Mild chest pressure, routine tracking follow-up",
    status: "pending",
    createdAt: "2026-06-04T14:10:00Z",
  },
  {
    id: "APT-20260606-0045",
    patientName: "Anita Shah",
    patientEmail: "anita.shah@gmail.com",
    patientPhone: "+91 98124 55432",
    doctorId: "dr-001",
    specialty: "cardiology",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    time: "09:30 AM",
    symptoms: "High blood pressure records review",
    status: "confirmed",
    createdAt: "2026-06-05T08:00:00Z",
  },
  {
    id: "APT-20260607-0067",
    patientName: "Ketan Trivedi",
    patientEmail: "ketan@outlook.com",
    patientPhone: "+91 94231 66782",
    doctorId: "dr-002",
    specialty: "neurology",
    date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0], // Day after
    time: "02:00 PM",
    symptoms: "Chronic migraines, request prescription update",
    status: "confirmed",
    createdAt: "2026-06-05T10:15:00Z",
  },
  {
    id: "APT-20260608-0099",
    patientName: "Savita Patel",
    patientEmail: "savita@gmail.com",
    patientPhone: "+91 98982 34321",
    doctorId: "dr-001",
    specialty: "cardiology",
    date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
    time: "04:00 PM",
    symptoms: "Post-surgery recovery routine checkup",
    status: "confirmed",
    createdAt: "2026-06-05T12:00:00Z",
  }
];

export function getAppointments() {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
    return INITIAL_APPOINTMENTS;
  }
  return JSON.parse(data);
}

export function saveAppointment(appointment) {
  const current = getAppointments();
  const updated = [appointment, ...current];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}

export function updateAppointmentStatus(id, newStatus) {
  const current = getAppointments();
  const updated = current.map((apt) =>
    apt.id === id ? { ...apt, status: newStatus } : apt
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}
