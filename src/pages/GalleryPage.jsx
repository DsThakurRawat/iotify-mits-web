import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ZoomIn, ChevronLeft, ChevronRight, Play, Pause, 
  Globe, Grid, Search, Zap, Cpu, Maximize2, Sparkles 
} from "lucide-react";

import kit1 from "../assets/images/kit1.jpeg";
import kit2 from "../assets/images/kit2.jpeg";
import kit3 from "../assets/images/kit3.jpeg";
import kit4 from "../assets/images/kit4.jpeg";
import kit5 from "../assets/images/kit5.jpeg";
import kit6 from "../assets/images/kit6.jpeg";
import kit7 from "../assets/images/kit7.jpeg";
import kit8 from "../assets/images/kit8.jpeg";
import kit9 from "../assets/images/kit9.jpeg";
import kit10 from "../assets/images/kit10.png";
import kit11 from "../assets/images/kit11.jpeg";
import kit12 from "../assets/images/kit12.jpeg";
import kit13 from "../assets/images/kit13.jpeg";
import kit14 from "../assets/images/kit14.jpeg";

const ALL_IMAGES = [
  { id: 1, src: kit1, title: "Defect Detection Setup", category: "Computer Vision", desc: "YOLO v8 inference running on Jetson Nano", sticker: "LIVE DEMO", specs: "60 FPS • Jetson Orin Nano" },
  { id: 2, src: kit2, title: "Smart Energy Dashboard", category: "IoT", desc: "Real-time energy monitoring across campus", specs: "MQTT • InfluxDB • Grafana" },
  { id: 3, src: kit3, title: "Warehouse Robot", category: "Robotics", desc: "AWR-1 navigating autonomously with LiDAR SLAM", sticker: "WOW!", specs: "ROS 2 • LiDAR 360" },
  { id: 4, src: kit4, title: "Predictive Maintenance Rig", category: "Industry 4.0", desc: "Vibration sensor array on industrial motor", sticker: "FEATURED", specs: "10kHz Sampling • Vibration AI" },
  { id: 5, src: kit5, title: "Lab Workstation", category: "Lab", desc: "Development station with Jetson boards", specs: "Dual RTX 4090 • CUDA 12" },
  { id: 6, src: kit6, title: "PCB Lab", category: "Lab", desc: "Custom embedded board assembly", specs: "SMD Soldering • KiCAD 8" },
  { id: 7, src: kit7, title: "Precision Agri Node", category: "IoT", desc: "Soil sensor nodes for agricultural deployment", sticker: "POPULAR", specs: "LoRaWAN • Solar Powered" },
  { id: 8, src: kit8, title: "Surgical Vision System", category: "Computer Vision", desc: "Medical instrument detection prototype", sticker: "HOT!", specs: "99.2% Acc • TensorRT" },
  { id: 9, src: kit9, title: "6-DOF Robot Arm", category: "Robotics", desc: "Robot arm assembly with MoveIt2", specs: "Inverse Kinematics • MoveIt2" },
  { id: 10, src: kit10, title: "Traffic Analytics", category: "Edge AI", desc: "Multi-camera deployment on Jetson AGX", sticker: "HOT!", specs: "4x 4K Streams • DeepStream" },
  { id: 11, src: kit11, title: "Power Grid Analytics", category: "AI", desc: "Anomaly detection visualization dashboard", sticker: "WOW!", specs: "LSTM Model • Real-time AI" },
  { id: 12, src: kit12, title: "CNC Digital Twin", category: "Industry 4.0", desc: "Real-time CNC machine digital twin interface", specs: "OPC-UA • Unity 3D Engine" },
  { id: 13, src: kit13, title: "Workshop Session", category: "Lab", desc: "Hands-on IoT workshop with students", specs: "50+ Attendees • ESP32 Lab" },
  { id: 14, src: kit14, title: "Research Presentation", category: "Lab", desc: "Annual research symposium presentation", specs: "IEEE Format • Best Paper" },
];

const CATEGORIES = ["All", "Computer Vision", "IoT", "Robotics", "Industry 4.0", "Edge AI", "AI", "Lab"];

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState("globe"); // 'globe' or 'grid'
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Filter & Search Logic
  const filteredImages = useMemo(() => {
    return ALL_IMAGES.filter((img) => {
      const matchesCategory = activeFilter === "All" || img.category === activeFilter;
      const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            img.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            img.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Triple datasets for 360 seamless scrolling marquee in Globe View
  const row1 = useMemo(() => [...filteredImages, ...filteredImages, ...filteredImages], [filteredImages]);
  const row2 = useMemo(() => [...filteredImages.slice().reverse(), ...filteredImages.slice().reverse(), ...filteredImages.slice().reverse()], [filteredImages]);
  const row3 = useMemo(() => [...filteredImages, ...filteredImages, ...filteredImages], [filteredImages]);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImg = () => setLightboxIdx((i) => (i - 1 + filteredImages.length) % filteredImages.length);
  const nextImg = () => setLightboxIdx((i) => (i + 1) % filteredImages.length);

  // Lock body scroll and handle keyboard navigation when Lightbox is open
  useEffect(() => {
    if (lightboxIdx !== null) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevImg();
        if (e.key === "ArrowRight") nextImg();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [lightboxIdx, filteredImages.length]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden pt-20 pb-16 selection:bg-cyan-500 selection:text-black">
      
      {/* ── HEADER ── */}
      <section className="relative px-6 pt-4 pb-2 text-center z-20">
        <div className="mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-widest text-cyan-400 px-3.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(0,207,255,0.2)]">
              <Sparkles size={13} className="text-cyan-400" />
              Interactive Lab Visual Showcase
            </span>
            <h1 className="font-black text-4xl sm:text-6xl text-white tracking-tight mb-2">
              Inside the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Lab</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto">
              Explore live deployments, hardware setups, and research prototypes in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTROL PANEL & BAR ── */}
      <section className="relative px-6 py-4 z-20">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 border-y border-white/10 py-3.5 backdrop-blur-md">
          
          {/* View Switcher & Search */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            
            {/* View Mode Toggle */}
            <div className="flex bg-slate-900 border border-white/10 rounded-full p-1">
              <button
                onClick={() => setViewMode("globe")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "globe"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,207,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe size={13} />
                <span>3D Globe</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,207,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Grid size={13} />
                <span>Grid View</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative flex-grow max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-white/10 rounded-full pl-8 pr-3 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X size={12} />
                </button>
              )}
            </div>

          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  activeFilter === cat
                    ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,207,255,0.3)]"
                    : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pause / Play Button for Globe */}
          {viewMode === "globe" && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-950/50 transition-all text-xs font-semibold shadow-[0_0_10px_rgba(0,207,255,0.15)]"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause" : "Rotate"}</span>
            </button>
          )}

        </div>
      </section>

      {/* ── MAIN DISPLAY AREA ── */}
      {viewMode === "globe" ? (
        /* ── MODE 1: 3D CYBER EARTH GLOBE WALL ── */
        <section className="relative py-6 overflow-hidden flex items-center justify-center min-h-[640px]">
          
          {/* Outer Lens Vignette */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.95)_80%)]" />
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-20" />

          {/* 3D Barrel Transformation Canvas */}
          <div 
            className="w-full max-w-[1800px] px-2 transition-all duration-700"
            style={{
              perspective: "750px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div 
              className="flex flex-col gap-3.5 transform-gpu transition-all duration-500"
              style={{
                transform: "rotateX(6deg) rotateY(0deg) scale(0.92) translateZ(-40px)",
                transformStyle: "preserve-3d"
              }}
            >
              
              {/* Row 1 */}
              <div className="flex overflow-hidden relative w-full">
                <motion.div
                  className="flex gap-3 min-w-full flex-nowrap"
                  animate={{ x: isPlaying ? ["0%", "-33.33%"] : "0%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
                >
                  {row1.map((img, i) => (
                    <VideoCard key={`r1-${i}`} img={img} onClick={() => openLightbox(i % filteredImages.length)} />
                  ))}
                </motion.div>
              </div>

              {/* Row 2 */}
              <div className="flex overflow-hidden relative w-full">
                <motion.div
                  className="flex gap-3 min-w-full flex-nowrap"
                  animate={{ x: isPlaying ? ["-33.33%", "0%"] : "0%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 26 }}
                >
                  {row2.map((img, i) => (
                    <VideoCard key={`r2-${i}`} img={img} onClick={() => openLightbox(i % filteredImages.length)} />
                  ))}
                </motion.div>
              </div>

              {/* Row 3 */}
              <div className="flex overflow-hidden relative w-full">
                <motion.div
                  className="flex gap-3 min-w-full flex-nowrap"
                  animate={{ x: isPlaying ? ["0%", "-33.33%"] : "0%" }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                >
                  {row3.map((img, i) => (
                    <VideoCard key={`r3-${i}`} img={img} onClick={() => openLightbox(i % filteredImages.length)} />
                  ))}
                </motion.div>
              </div>

            </div>
          </div>
        </section>
      ) : (
        /* ── MODE 2: TACTICAL HIGH-TECH MASONRY GRID ── */
        <section className="relative px-6 py-8 mx-auto max-w-7xl">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
              <p className="text-slate-400 text-sm">No items matching your filter/search criteria.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredImages.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => openLightbox(idx)}
                    className="group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 backdrop-blur-md cursor-pointer hover:border-cyan-400/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,207,255,0.25)] hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      
                      {img.sticker && (
                        <div className="absolute top-3 left-3 bg-yellow-400 text-black text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded shadow-md border border-black flex items-center gap-1">
                          <Zap size={11} className="fill-black" />
                          {img.sticker}
                        </div>
                      )}

                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-black/70 border border-cyan-400 text-cyan-300 backdrop-blur-md">
                          <Maximize2 size={13} />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                          {img.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{img.specs?.split('•')[0]}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors line-clamp-1">{img.title}</h3>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2">{img.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>
      )}

      {/* ── LIGHTBOX MODAL WITH HUD TECH SPECS (UPDATED TOP MARGIN/PADDING) ── */}
      <AnimatePresence>
        {lightboxIdx !== null && filteredImages[lightboxIdx] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/98 backdrop-blur-2xl p-4 sm:p-6 pt-[100px] overscroll-none select-none mt-24"
            onClick={closeLightbox}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors z-20"
            >
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors z-20"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-colors z-20"
            >
              <ChevronRight size={22} />
            </button>

            {/* Preview Box Container with 100px top offset alignment */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center gap-4 w-full mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_60px_rgba(0,207,255,0.25)] bg-slate-950">
                <img
                  src={filteredImages[lightboxIdx].src}
                  alt={filteredImages[lightboxIdx].title}
                  className="max-w-full max-h-[52vh] object-contain rounded-2xl"
                />
              </div>

              {/* HUD Details Bar */}
              <div className="text-center max-w-xl bg-slate-900/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-2xl w-full">
                <div className="flex items-center justify-between gap-2 mb-2 border-b border-white/10 pb-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono font-semibold">
                    {filteredImages[lightboxIdx].category}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400">
                    <Cpu size={12} />
                    <span>{filteredImages[lightboxIdx].specs || "Lab Hardware Setup"}</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-lg sm:text-xl">{filteredImages[lightboxIdx].title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">{filteredImages[lightboxIdx].desc}</p>
                
                <div className="text-[11px] text-slate-500 font-mono mt-3 flex items-center justify-between">
                  <span>SYSTEM STATUS: ONLINE</span>
                  <span>{lightboxIdx + 1} / {filteredImages.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ── VIDEO CARD TILE COMPONENT (FOR 3D GLOBE) ──
function VideoCard({ img, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 w-48 sm:w-56 h-32 sm:h-36 rounded-xl overflow-hidden cursor-pointer group border border-white/20 bg-slate-900/90 backdrop-blur-md shadow-2xl hover:border-cyan-400 transition-all duration-300 hover:scale-110 hover:z-30"
    >
      <img
        src={img.src}
        alt={img.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 opacity-90 group-hover:opacity-60 transition-opacity" />

      {/* POP STICKER OVERLAY ("WOW!") */}
      {img.sticker && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            animate={{ scale: [0.95, 1.1, 0.95], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="px-2.5 py-0.5 bg-yellow-400 text-black font-black text-xs sm:text-sm tracking-wider uppercase rounded-md border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center gap-1"
          >
            <Zap size={13} className="fill-black" />
            {img.sticker}
          </motion.div>
        </div>
      )}

      <div className="absolute inset-0 border border-transparent group-hover:border-cyan-400/60 rounded-xl transition-all duration-300 pointer-events-none" />

      <div className="absolute inset-0 flex flex-col justify-end p-2.5 z-10">
        <span className="self-start text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-300 bg-black/70 border border-cyan-500/30 px-1.5 py-0.5 rounded mb-1 backdrop-blur-sm">
          {img.category}
        </span>
        <h4 className="font-bold text-white text-xs line-clamp-1 group-hover:text-cyan-300 transition-colors">
          {img.title}
        </h4>
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black/60 border border-cyan-400 text-cyan-300 backdrop-blur-md">
          <ZoomIn size={12} />
        </div>
      </div>
    </div>
  );
}