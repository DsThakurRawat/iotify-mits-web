import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, ArrowLeft, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

const ERROR_MESSAGES = {
  "auth/invalid-email": "That email address doesn't look right.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No admin account found for that email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
  "auth/network-request-failed": "Network error — check your connection.",
  "auth/configuration-not-found":
    "Email/password sign-in is not enabled in your Firebase project.",
};

export default function AdminLogin({ onNavigate }) {
  const { login, currentUser, loading, authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in? Skip the form.
  useEffect(() => {
    if (!loading && currentUser) onNavigate("admin-dashboard");
  }, [loading, currentUser, onNavigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Enter your email and password");
      return;
    }
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success("Signed in");
      onNavigate("admin-dashboard");
    } catch (error) {
      toast.error(ERROR_MESSAGES[error.code] || error.message || "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] glass-card p-8 rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-primary to-transparent opacity-50" />

        <div className="mb-8">
          <div className="w-12 h-12 rounded-xl bg-cyan-primary/10 border border-cyan-primary/20 flex items-center justify-center mb-6">
            <Lock size={24} className="text-cyan-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl text-white mb-2">Admin Login</h1>
          <p className="text-muted text-sm">
            Use the official IoTify Lab admin email and password.
          </p>
        </div>

        {authError && (
          <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-yellow-500/25 bg-yellow-500/[0.06] px-4 py-3">
            <AlertTriangle size={15} className="text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-xs text-yellow-200/90 leading-relaxed">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-cyan-primary/50 focus:bg-white/[0.05] transition-all"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-11 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white text-sm focus:outline-none focus:border-cyan-primary/50 focus:bg-white/[0.05] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary py-3 rounded-xl mt-2 font-semibold disabled:opacity-50"
          >
            {submitting ? "Authenticating…" : "Continue"}
          </button>
        </form>

        <button
          onClick={() => onNavigate("home")}
          className="mt-6 flex items-center gap-2 text-xs text-muted hover:text-white transition-colors mx-auto"
        >
          <ArrowLeft size={14} />
          Back to website
        </button>
      </motion.div>
    </div>
  );
}
