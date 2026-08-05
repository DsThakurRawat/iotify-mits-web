import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

export default function LabPreview() {
  return (
    <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-black text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 circuit-bg pointer-events-none" />

      {/* Glow Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,207,255,0.15) 0%, rgba(79,125,255,0.05) 50%, transparent 70%)",
          filter: "blur(130px)",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Text & Pill Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Green label */}
            <span className="eyebrow-badge mb-5 text-xs sm:text-sm tracking-[0.25em]">
              <span className="glow-dot" />
              INTERACTIVE LAB PREVIEW
            </span>

            {/* Heading */}
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[44px] text-white leading-[1.12] tracking-tight mb-6">
              Interactive 3D lab experiences for{" "}
              <span className="text-gradient">modern STEM classrooms.</span>
            </h2>

            {/* Paragraph */}
            <p className="text-muted text-base sm:text-lg leading-relaxed font-body mb-8">
              Experience the future of hands-on technical education. Our hybrid labs combine physical modular hardware kits developed at CIoT MITS with interactive sensor dashboards, allowing students to design, program, and test AI and IoT projects in school.
            </p>

            {/* Three Pill Badges */}
            <div className="flex flex-wrap gap-3">
              {["AI + IoT Labs", "Robotics Kits", "Teacher Training"].map((badge, idx) => (
                <div
                  key={idx}
                  className="tag-badge"
                >
                  <Sparkles size={13} className="text-cyan-primary mr-1.5" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: 3D Robot Node Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative flex justify-center"
          >
            {/* Soft Glow Underneath */}
            <div
              className="absolute -bottom-8 w-[80%] h-12 rounded-full pointer-events-none"
              style={{ background: "rgba(0,207,255,0.2)", filter: "blur(50px)" }}
            />

            {/* Floating 3D Robot Node Card */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ rotateY: 8, rotateX: -5, scale: 1.02 }}
              className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl glass-card p-6 shadow-2xl overflow-hidden cursor-pointer group [transform-style:preserve-3d]"
            >
              {/* Circuit Grid Background */}
              <div className="absolute inset-0 circuit-bg pointer-events-none" />

              <div className="relative h-full flex flex-col justify-between z-10">
                {/* Top Node Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="circuit-dot animate-ping" />
                    <span className="text-xs font-mono text-white/90">CIoT Sensor Network v3.0</span>
                  </div>
                  <span className="tag-badge text-[10px]">
                    ACTIVE
                  </span>
                </div>

                {/* Robot Graphic Center */}
                <div className="relative py-8 flex flex-col items-center justify-center text-center">
                  <div className="relative w-28 h-28 rounded-2xl border border-cyan-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                    style={{ background: "rgba(0,207,255,0.12)", boxShadow: "0 0 40px rgba(0,207,255,0.25)" }}>
                    <Bot size={54} className="text-cyan-primary group-hover:rotate-6 transition-transform" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-primary flex items-center justify-center text-black font-bold text-[10px]">
                      AI
                    </div>
                  </div>
                  
                  <span className="mt-4 font-mono font-bold text-white text-base tracking-wide">
                    Autonomous Spatial AI Rover
                  </span>
                  <span className="text-xs text-muted font-body mt-1">
                    LiDAR Telemetry • Obstacle Avoidance • ROS2 Nodes
                  </span>
                </div>

                {/* Bottom Status Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.08] text-center">
                  {[
                    { label: "Sensors", value: "12 Nodes" },
                    { label: "Latency", value: "4ms", accent: true },
                    { label: "Status", value: "Active" },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                      <span className="text-[10px] text-muted block font-mono">{m.label}</span>
                      <span className={`text-xs font-bold ${m.accent ? "text-cyan-primary" : "text-white"}`}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner Glow */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "rgba(0,207,255,0.15)", filter: "blur(50px)" }} />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
