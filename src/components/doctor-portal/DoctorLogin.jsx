import { useState } from "react";
import { AlertCircle, Lock, Mail } from "lucide-react";

export default function DoctorLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Mock Authentication
    setTimeout(() => {
      setIsLoading(false);
      // Hardcoded mock credentials: doctor@aarjav.com / doctor123
      if (
        (email.toLowerCase() === "doctor@aarjav.com" && password === "doctor123") ||
        (email.toLowerCase() === "dr.priya@aarjav.com" && password === "doctor123")
      ) {
        onLogin({
          id: "dr-001",
          name: "Dr. Priya Sharma",
          email: email.toLowerCase(),
          specialty: "Cardiology",
          avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150",
        });
      } else {
        setError("Invalid email address or password. Try 'doctor@aarjav.com' with 'doctor123'.");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-color-portal-bg px-4 select-none">
      <div className="w-full max-w-[400px] bg-color-portal-surface border border-color-border/60 rounded-xl p-8 shadow-xl text-left">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-serif text-3xl font-semibold text-color-text-primary">
            Portal Access
          </h2>
          <p className="text-body-sm text-color-text-secondary mt-1.5">
            Aarjav Clinical Staff & Practitioner Login
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-color-error/20 p-3 rounded-lg flex items-start gap-2.5 text-color-error text-label font-medium mb-5" role="alert">
            <AlertCircle className="w-4.5 h-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label htmlFor="portal-email" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-color-text-muted">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <input
                id="portal-email"
                type="email"
                placeholder="doctor@aarjav.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field portal-input pl-11 focus-blue"
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="portal-password" className="block text-body-sm font-semibold text-color-text-primary mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-color-text-muted">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                id="portal-password"
                type="password"
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field portal-input pl-11 focus-blue"
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => alert("Please contact the hospital IT support department (it@aarjavhospital.com) to reset credentials.")}
              className="text-caption font-semibold text-color-portal-accent hover:underline cursor-pointer focus-blue"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-portal-primary w-full text-center py-3 font-semibold mt-2 focus-blue"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-6 pt-5 border-t border-color-border/60 text-center">
          <p className="text-caption text-color-text-muted leading-relaxed">
            Demo Credentials:<br />
            <strong>doctor@aarjav.com</strong> / <strong>doctor123</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
