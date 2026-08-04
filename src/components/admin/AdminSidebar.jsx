import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Megaphone,
  Download,
  Settings,
  ScrollText,
  LogOut,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo1.png";

const NAV_ITEMS = [
  { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard, permission: null },
  { id: "admin-workshops", label: "Workshops", icon: Calendar, permission: "workshops:read" },
  { id: "admin-registrations", label: "Registrations", icon: Users, permission: "registrations:read" },
  { id: "admin-announcements", label: "Announcements", icon: Megaphone, permission: "announcements:read" },
  { id: "admin-exports", label: "Exports", icon: Download, permission: "exports:read" },
  { id: "admin-logs", label: "Activity Logs", icon: ScrollText, permission: "settings:read" },
  { id: "admin-settings", label: "Settings", icon: Settings, permission: "settings:read" },
];

function SidebarBody({ currentPage, onNavigate, onCloseMobile, instanceId }) {
  const { logout, adminProfile, can } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate("admin-login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const items = NAV_ITEMS.filter((i) => !i.permission || can(i.permission));

  return (
    <>
      {/* Brand */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/[0.05] shrink-0">
        <div className="flex items-center gap-3">
          <img src={logo} alt="IoTify Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold text-white tracking-wider text-sm">
            Admin Portal
          </span>
        </div>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-muted hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Signed-in identity */}
      {adminProfile && (
        <div className="px-6 py-4 border-b border-white/[0.05] shrink-0">
          <p className="text-white text-sm font-medium truncate">{adminProfile.name}</p>
          <p className="text-[11px] text-cyan-primary uppercase tracking-wider font-display mt-0.5">
            {adminProfile.role}
          </p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1.5 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-cyan-primary/10 text-cyan-primary shadow-[inset_0_0_0_1px_rgba(0,207,255,0.2)]"
                  : "text-muted hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
              {isActive && (
                <motion.div
                  layoutId={`activeIndicator-${instanceId}`}
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cyan-primary rounded-r-md shadow-[0_0_10px_rgba(0,207,255,0.8)]"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/[0.05] shrink-0">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}

export default function AdminSidebar({
  currentPage,
  onNavigate,
  mobileOpen,
  onCloseMobile,
}) {
  return (
    <>
      {/* Desktop: permanently docked */}
      <aside className="hidden lg:flex w-64 h-screen bg-[#05070B]/80 backdrop-blur-xl border-r border-white/[0.05] flex-col fixed left-0 top-0 z-50">
        {/* The desktop aside stays mounted at mobile widths (`hidden`), so each
            instance needs its own layoutId or framer-motion animates between them. */}
        <SidebarBody
          currentPage={currentPage}
          onNavigate={onNavigate}
          instanceId="desktop"
        />
      </aside>

      {/* Mobile: slide-over drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed left-0 top-0 z-[70] w-72 h-screen bg-[#05070B] border-r border-white/[0.08] flex flex-col"
            >
              <SidebarBody
                currentPage={currentPage}
                onNavigate={onNavigate}
                onCloseMobile={onCloseMobile}
                instanceId="mobile"
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
