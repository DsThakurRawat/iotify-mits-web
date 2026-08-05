import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Cpu, Zap, Eye, Radio } from "lucide-react";
import NeuralNetSVG from "./shared/NeuralNetSVG";
import jetson from "../assets/images/jetson.png";

const WORDS = ["Embedded Systems", "IoT Kits", "AIoT", "Computer Vision", "Edge Intelligence"];

function TypewriterText() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[idx];
    let timeout;
    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % WORDS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span className="text-gradient">
      {displayed}
      <span className="typing-cursor" />
    </span>
  );
}

const floatingCards = [
 
];

export default function Hero({ onNavigate }) {
  const stagger = {
    container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
    item: {
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    },
  };

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden">

      <div className="mx-auto max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-[52%_48%] gap-16 items-center relative z-10">

        {/* ── LEFT COLUMN ── */}
        <motion.div
          variants={stagger.container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          {/* Badge */}


          {/* Heading */}
          <motion.h1
            variants={stagger.item}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] leading-[1.06] tracking-tight text-white mb-4"
          >
            <br className="hidden lg:block" />
            Future of{" "}

            <TypewriterText />
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={stagger.item}
            className="text-muted text-base sm:text-lg leading-relaxed max-w-[520px] mb-10"
          >
            IoTify Lab
            An Innovation, Outreach and Hands-on Technology Learning Initiative of MITS–Deemed to be University, Gwalior Powered by the Centre for Internet of Things (CIoT)
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-4 mb-14">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("research")}
              className="btn-primary text-sm"
            >
              Explore Research
              <ArrowRight size={15} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("projects")}
              className="btn-glass text-sm"
            >
              View Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("about")}
              className="btn-outline-cyan text-sm"
            >
              About the Lab
            </motion.button>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={stagger.item} className="flex flex-wrap items-center gap-8">
            {[
              { val: "50+", label: "Live Projects" },
              { val: "120+", label: "Researchers" },
              { val: "18+", label: "Publications" },
              { val: "8", label: "Domain Areas" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-start">
                <span className="font-mono font-bold text-2xl text-white">{s.val}</span>
                <span className="text-xs text-muted font-body tracking-wide mt-0.5">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          whileTap={{ scale: 1 }}
          className="relative flex items-center justify-center"
        >
          {/* Teal radial glow behind board — matches reference image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 55% 55%, rgba(0,180,220,0.22) 0%, rgba(0,100,180,0.1) 45%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* Floating particles */}
          {[
            { size: "w-2 h-2", pos: "top-[8%] left-[10%]", delay: "0s" },
            { size: "w-1.5 h-1.5", pos: "bottom-[15%] right-[8%]", delay: "1.8s" },
            { size: "w-1 h-1", pos: "top-[55%] right-[5%]", delay: "3.2s" },
            { size: "w-2.5 h-2.5", pos: "bottom-[30%] left-[5%]", delay: "0.8s" },
          ].map((dot, i) => (
            <span
              key={i}
              className={`absolute ${dot.size} ${dot.pos} rounded-full bg-cyan-primary animate-float`}
              style={{
                boxShadow: "0 0 10px rgba(0,207,255,0.8)",
                animationDelay: dot.delay,
              }}
            />
          ))}

          {/* Floating data cards */}
          {floatingCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
                className={`absolute ${card.pos} z-20`}
              >
                <div
                  className="animate-float glass-card px-4 py-3 flex items-center gap-3 min-w-[160px]"
                  style={{ animationDelay: card.delay, borderRadius: "16px" }}
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-primary/10 border border-cyan-primary/20 text-cyan-primary flex-shrink-0">
                    <Icon size={16} />
                  </span>
                  <div>
                    <div className="text-[10px] text-muted font-display tracking-widest uppercase">{card.label}</div>
                    <div className="text-xs font-semibold text-white font-display">{card.value}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Main Jetson image — smooth float, locked on tap */}
          <motion.div
            className="relative w-full max-w-[480px] cursor-pointer"
            animate={{ y: [0, -16, 0] }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              default: { type: "spring", stiffness: 200, damping: 25 }
            }}
            whileHover="hover"
            style={{ willChange: "transform" }}
          >
            <motion.img
              src={jetson}
              alt="NVIDIA Jetson embedded AI platform"
              className="w-full h-auto object-contain drop-shadow-[0_40px_80px_rgba(0,207,255,0.3)]"
              draggable="false"
              variants={{
                hover: {
                  scale: 0.88,
                  skewX: -8,
                  rotateY: 15,
                  rotateX: -10,
                  filter: "brightness(1.2) drop-shadow(0px 30px 60px rgba(0,207,255,0.6))",
                }
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{
                mixBlendMode: "screen",
                WebkitTouchCallout: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
            {/* Glow beneath */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[55%] h-10 bg-cyan-primary/25 blur-3xl rounded-full"
              variants={{
                hover: {
                  scale: 1.25,
                  opacity: 0.95,
                  backgroundColor: "rgba(0, 207, 255, 0.45)",
                }
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            />
          </motion.div>

          {/* Neural net overlay (subtle, bottom) */}
          <div className="absolute bottom-0 left-0 right-0 h-48 opacity-20 pointer-events-none">
            <NeuralNetSVG className="w-full h-full" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] font-display tracking-[0.3em] uppercase">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-cyan-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
