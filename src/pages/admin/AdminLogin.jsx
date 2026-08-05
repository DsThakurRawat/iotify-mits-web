import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft, AlertTriangle, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Field, Input, Panel } from "../../components/admin/ui";
import logo from "../../assets/images/logo1.png";

export default function AdminLogin({ onNavigate }) {
  const { login, adminProfile, loading, authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in? Skip the form.
  useEffect(() => {
    if (!loading && adminProfile) onNavigate("admin-dashboard");
  }, [loading, adminProfile, onNavigate]);

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
      // The API answers a wrong email and a wrong password identically, so
      // this message can be shown verbatim without leaking which it was.
      toast.error(error.message || "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[400px]"
      >
        <div className="flex items-center gap-2.5 mb-7">
          <img src={logo} alt="" className="w-8 h-8 object-contain" />
          <div>
            <p className="a-title text-[15px] leading-none">IoTify Lab</p>
            <p className="a-label mt-1.5 leading-none">Admin Portal</p>
          </div>
        </div>

        <Panel className="p-7 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--a-accent), transparent)",
              opacity: 0.5,
            }}
          />

          <h1 className="a-title text-xl mb-1.5">Sign in</h1>
          <p className="a-muted text-sm mb-6">
            Use the email and password issued to you by a Super Admin.
          </p>

          {authError && (
            <div
              className="mb-5 flex items-start gap-2.5 rounded-xl px-4 py-3"
              style={{
                background: "rgba(234,179,8,0.06)",
                border: "1px solid rgba(234,179,8,0.25)",
              }}
              role="alert"
            >
              <AlertTriangle size={15} className="mt-0.5 shrink-0" style={{ color: "#FFD166" }} />
              <p className="text-xs leading-relaxed" style={{ color: "#F5E3B0" }}>
                {authError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field label="Email" htmlFor="admin-email" required>
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            <Field label="Password" htmlFor="admin-password" required>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="a-icon-btn absolute right-1.5 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <Button type="submit" variant="primary" loading={submitting} className="mt-2 w-full py-2.5">
              {submitting ? "Signing in…" : "Continue"}
            </Button>
          </form>

          <p className="a-muted text-[11px] leading-relaxed mt-6 flex items-start gap-2">
            <ShieldCheck size={13} className="mt-px shrink-0" style={{ color: "var(--a-accent)" }} />
            Sessions last 12 hours. Student records are never exposed publicly.
          </p>
        </Panel>

        <button
          onClick={() => onNavigate("home")}
          className="a-btn a-btn-ghost a-btn-sm mt-5 mx-auto flex"
        >
          <ArrowLeft size={14} />
          Back to website
        </button>
      </motion.div>
    </div>
  );
}
