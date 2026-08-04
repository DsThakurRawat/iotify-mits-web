import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import kit1 from "../../assets/images/kit1.jpeg";
import kit2 from "../../assets/images/kit2.jpeg";
import kit3 from "../../assets/images/kit3.jpeg";
import kit4 from "../../assets/images/kit4.jpeg";

const PRODUCTS = [
  {
    image: kit1,
    category: "In-House IoT Kit",
    title: "CIoT Sensor Explorer Kit",
    desc: "Modular sensor learning suite developed at MITS with ESP32 microcontrollers, OLED displays, and real-time sensor nodes.",
    specs: ["ESP32-WROOM", "10+ Sensor Nodes", "Breadboard Interface"],
  },
  {
    image: kit2,
    category: "Edge AI Module",
    title: "CIoT Edge AI Suite",
    desc: "Camera-enabled computer vision and neural inference kit designed for school & undergraduate AI lab experiments.",
    specs: ["Camera Module", "Edge Vision", "MicroPython AI"],
  },
  {
    image: kit3,
    category: "Robotics Platform",
    title: "CIoT Autonomous Rover",
    desc: "Mobile robotics platform engineered for obstacle avoidance, ultrasonic distance sensing, and motor driver control.",
    specs: ["Distance Sensors", "DC Motor Chassis", "Bluetooth Control"],
  },
  {
    image: kit4,
    category: "Embedded Systems",
    title: "CIoT Telemetry & Mesh Kit",
    desc: "Wireless sensor communication kit for environmental telemetry, LoRaWAN mesh experiments, and firmware programming.",
    specs: ["LoRa 868MHz", "Environment Sensors", "Low Power"],
  },
];

export default function HardwareSection({ onNavigate }) {
  return (
    <section className="relative px-6 py-20 lg:py-28 bg-black text-white overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 circuit-bg opacity-30 pointer-events-none" />

      {/* Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(0,207,255,0.12)_0%,_rgba(0,207,255,0.05)_50%,_transparent_70%)] blur-[140px]"
      />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Header with Top-Right Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-left"
          >
            <span className="eyebrow-badge mb-4 text-xs sm:text-sm tracking-[0.25em] font-mono">
              <span className="glow-dot" />
              IN-HOUSE LEARNING KITS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight text-white">
              Designed at CIoT.{" "}
              <span className="text-cyan-primary">Built for hands-on learning.</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onNavigate && onNavigate("research")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.03] border border-cyan-primary/30 hover:border-cyan-primary text-white hover:text-cyan-primary font-body font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(0,207,255,0.15)] self-start md:self-auto"
          >
            Explore Kits & Modules
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* 4 In-House Hardware Kit Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {PRODUCTS.map((prod) => (
            <motion.div
              key={prod.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="glass-card spotlight-card group rounded-3xl border border-white/[0.09] overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-cyan-primary/50 hover:shadow-[0_15px_40px_-10px_rgba(0,207,255,0.25)]"
            >
              <div>
                {/* Product Image with Hover Zoom */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/60">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-black/80 backdrop-blur-md text-cyan-primary border border-cyan-primary/30">
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cyan-primary transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-4">
                    {prod.desc}
                  </p>
                </div>
              </div>

              {/* Specs Pills */}
              <div className="px-6 pb-6 pt-0 border-t border-white/[0.06] mt-auto">
                <div className="flex flex-wrap gap-1.5 pt-4">
                  {prod.specs.map((spec) => (
                    <span key={spec} className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] text-white/80 border border-white/[0.08]">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
