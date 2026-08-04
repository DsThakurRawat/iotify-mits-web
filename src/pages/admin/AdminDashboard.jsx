import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Armchair,
  CalendarClock,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useCollection, toDate, formatDateTime } from "../../lib/useCollection";
import { useAuth } from "../../contexts/AuthContext";

const COLORS = ["#00CFFF", "#4F7DFF", "#7DF9FF", "#FFBB28", "#FF8042", "#8884d8"];

const tooltipStyle = {
  backgroundColor: "#0A0E14",
  borderColor: "rgba(255,255,255,0.1)",
  borderRadius: "8px",
};

function StatCard({ label, value, icon: Icon, color, index, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="glass-card p-5 rounded-2xl"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-11 h-11 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0 ${color}`}
        >
          <Icon size={22} />
        </div>
        <div className="min-w-0">
          <div className="text-muted text-[11px] uppercase tracking-wider font-display mb-1 truncate">
            {label}
          </div>
          <div className="font-display font-bold text-2xl text-white">
            {loading ? "…" : value}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AdminDashboard({ onNavigate }) {
  const { adminProfile } = useAuth();
  const [workshops, loadingWorkshops] = useCollection("workshops");
  const [registrations, loadingRegs, error] = useCollection("registrations");

  const loading = loadingWorkshops || loadingRegs;

  const stats = useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayStr = new Date().toISOString().split("T")[0];

    const upcoming = workshops.filter((w) => (w.date || "") >= todayStr);

    // Anything not rejected occupies a seat.
    const takenByWorkshop = {};
    registrations.forEach((r) => {
      if (r.status === "Rejected") return;
      takenByWorkshop[r.workshopId] = (takenByWorkshop[r.workshopId] || 0) + 1;
    });

    const availableSeats = upcoming.reduce((sum, w) => {
      const total = Number(w.seats) || 0;
      return sum + Math.max(0, total - (takenByWorkshop[w.id] || 0));
    }, 0);

    return {
      workshops: workshops.length,
      upcoming: upcoming.length,
      totalRegs: registrations.length,
      pending: registrations.filter((r) => (r.status || "Pending") === "Pending").length,
      todayRegs: registrations.filter((r) => {
        const d = toDate(r.createdAt);
        return d && d >= startOfToday;
      }).length,
      availableSeats,
      upcomingList: [...upcoming]
        .sort((a, b) => (a.date || "").localeCompare(b.date || ""))
        .slice(0, 5)
        .map((w) => ({ ...w, taken: takenByWorkshop[w.id] || 0 })),
    };
  }, [workshops, registrations]);

  const charts = useMemo(() => {
    // Registration trend — last 7 days.
    const trendMap = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      trendMap[d.toLocaleDateString("en-US", { month: "short", day: "numeric" })] = 0;
    }

    const deptMap = {};
    const wsMap = {};
    const yearMap = {};

    registrations.forEach((r) => {
      const d = toDate(r.createdAt);
      if (d) {
        const key = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (trendMap[key] !== undefined) trendMap[key]++;
      }
      if (r.department) deptMap[r.department] = (deptMap[r.department] || 0) + 1;
      if (r.year) yearMap[r.year] = (yearMap[r.year] || 0) + 1;
      const ws = r.workshopTitle || r.workshopId || "Unknown";
      wsMap[ws] = (wsMap[ws] || 0) + 1;
    });

    const toSortedArray = (map, valueKey = "count") =>
      Object.entries(map)
        .map(([name, v]) => ({ name, [valueKey]: v }))
        .sort((a, b) => b[valueKey] - a[valueKey]);

    return {
      trend: Object.entries(trendMap).map(([name, count]) => ({ name, count })),
      departments: toSortedArray(deptMap).slice(0, 5),
      workshops: toSortedArray(wsMap, "value").slice(0, 6),
      years: toSortedArray(yearMap).sort((a, b) => a.name.localeCompare(b.name)),
    };
  }, [registrations]);

  const recentRegs = useMemo(
    () =>
      [...registrations]
        .sort(
          (a, b) =>
            (toDate(b.createdAt)?.getTime() || 0) - (toDate(a.createdAt)?.getTime() || 0)
        )
        .slice(0, 6),
    [registrations]
  );

  const statCards = [
    { label: "Total Workshops", value: stats.workshops, icon: Calendar, color: "text-blue-400" },
    { label: "Upcoming", value: stats.upcoming, icon: CalendarClock, color: "text-cyan-bright" },
    { label: "Registrations", value: stats.totalRegs, icon: Users, color: "text-purple-400" },
    { label: "Today", value: stats.todayRegs, icon: Clock, color: "text-cyan-400" },
    { label: "Pending Approval", value: stats.pending, icon: CheckCircle, color: "text-yellow-400" },
    { label: "Seats Available", value: stats.availableSeats, icon: Armchair, color: "text-green-400" },
  ];

  const hasData = registrations.length > 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display font-bold text-3xl text-white">Dashboard</h1>
        <p className="text-muted text-sm mt-1">
          Welcome back, {adminProfile?.name?.split(" ")[0] || "admin"}.
        </p>
      </div>

      {error && (
        <div className="glass-card rounded-2xl p-4 text-sm text-red-400 border border-red-500/20">
          Could not load data. Check your Firebase configuration and Firestore rules.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} loading={loading} />
        ))}
      </div>

      {/* Charts */}
      {!loading && hasData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display font-semibold text-lg text-white mb-6">
              Registration Trend (7 Days)
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.trend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "#00CFFF" }} />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#00CFFF"
                    strokeWidth={3}
                    dot={{ fill: "#00CFFF", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display font-semibold text-lg text-white mb-6">
              Workshop Popularity
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.workshops}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {charts.workshops.map((entry, i) => (
                      <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display font-semibold text-lg text-white mb-6">
              Top Departments
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.departments} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="rgba(255,255,255,0.8)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={90}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={tooltipStyle}
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {charts.departments.map((entry, i) => (
                      <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="font-display font-semibold text-lg text-white mb-6">
              Year Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.years}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.4)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={tooltipStyle}
                  />
                  <Bar dataKey="count" fill="#4F7DFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming workshops */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg text-white">
            Upcoming Workshops
          </h2>
          <button
            onClick={() => onNavigate?.("admin-workshops")}
            className="text-xs text-cyan-primary hover:text-cyan-bright transition-colors flex items-center gap-1"
          >
            Manage <ArrowRight size={14} />
          </button>
        </div>
        {loading ? (
          <div className="p-10 text-center text-muted text-sm">Loading…</div>
        ) : stats.upcomingList.length === 0 ? (
          <div className="p-10 text-center text-muted text-sm">
            No upcoming workshops scheduled.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {stats.upcomingList.map((w) => {
              const total = Number(w.seats) || 0;
              const left = Math.max(0, total - w.taken);
              return (
                <div
                  key={w.id}
                  className="p-4 px-6 flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{w.title}</p>
                    <p className="text-muted text-xs">
                      {w.date}
                      {w.time && ` · ${w.time}`}
                      {w.venue && ` · ${w.venue}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted">
                      <span className="text-white font-medium">{left}</span> of{" "}
                      {total || "∞"} seats left
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full font-medium ${
                        w.status === "Published"
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : w.status === "Closed"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                      }`}
                    >
                      {w.status || "Draft"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Recent registrations */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
          <h2 className="font-display font-semibold text-lg text-white">
            Recent Registrations
          </h2>
          <button
            onClick={() => onNavigate?.("admin-registrations")}
            className="text-xs text-cyan-primary hover:text-cyan-bright transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-muted text-sm">Loading data…</div>
        ) : recentRegs.length === 0 ? (
          <div className="p-10 text-center text-muted text-sm">
            No registrations yet. They will appear here as students book workshops.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/[0.05] text-muted text-xs uppercase tracking-wider font-display">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Workshop</th>
                  <th className="p-4 font-medium">When</th>
                  <th className="p-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRegs.map((reg) => (
                  <tr key={reg.id} className="border-b border-white/[0.02]">
                    <td className="p-4">
                      <div className="text-white font-medium">{reg.name}</div>
                      <div className="text-muted text-xs">{reg.email}</div>
                    </td>
                    <td className="p-4 text-white/80">
                      {reg.workshopTitle || reg.workshopId}
                    </td>
                    <td className="p-4 text-muted text-xs whitespace-nowrap">
                      {formatDateTime(reg.createdAt)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          reg.status === "Approved"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : reg.status === "Rejected"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        }`}
                      >
                        {reg.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
