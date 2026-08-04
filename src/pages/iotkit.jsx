import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ===== COMPLETE KITS DATA (4 TIERS) =====
const KITS = [
  {
    id: "essential",
    tier: "TIER 01",
    badge: "ESSENTIAL",
    category: "Essential",
    badgeColor: "#10b981",
    title: "ARC LABS IoT Essential Kit",
    desc: "Dual-controller trainer with Raspberry Pi Pico, ESP32, sensors, relays, and display modules.",
    tags: ["Raspberry Pi Pico", "ESP32 Wi-Fi + Bluetooth"],
    price: "₹14,999",
    mrp: "₹18,999",
    save: "SAVE ₹4,000",
    thumbnails: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop"
    ],
    specs: {
      controllers: ["Raspberry Pi Pico", "ESP32 Wi-Fi + Bluetooth"],
      sensors: [
        "HC-SR04 Ultrasonic Sensor",
        "DHT Sensor Interface",
        "IR / Digital Sensor Interface",
        "Analog Sensor Input via Potentiometer"
      ],
      display: ["0.96\" OLED Display", "Status LED Indicators", "Active Buzzer"],
      actuators: ["Dual Relay Modules", "Tactile Push Buttons", "Screw Terminal Outputs"],
      connectivity: [
        "Pico GPIO Breakouts",
        "ESP32 GPIO Breakouts",
        "UART / I2C / SPI practice headers",
        "5V & 3.3V Power Rails"
      ]
    },
    included: [
      { code: "HW", title: "Essential Kit Board", desc: "Pre-assembled Pico + ESP32 trainer" },
      { code: "CD", title: "Sample Codes", desc: "Pico, MicroPython, and ESP32 examples" },
      { code: "SP", title: "Technical Support", desc: "ARC LABS support access" }
    ],
    useCases: [
      { id: "01", title: "Pico + ESP32 Training", desc: "Practice GPIO, ADC, I2C display control, and Wi-Fi/Bluetooth IoT with 2 popular controller platforms." },
      { id: "02", title: "Sensor & Automation Labs", desc: "Build distance sensing, buzzer alerts, relay switching, and simple monitoring experiments." },
      { id: "03", title: "Workshop Projects", desc: "Use the onboard modules to complete beginner-friendly embedded and IoT projects without loose wiring." },
      { id: "04", title: "Rapid IoT Prototyping", desc: "Develop telemetry devices and remote actuators in hours instead of days." }
    ]
  },
  {
    id: "lite",
    tier: "TIER 02",
    badge: "BEGINNER",
    category: "Beginner",
    badgeColor: "#06b6d4",
    title: "ARC LABS IoT Lite Kit",
    desc: "Compact, beginner-friendly IoT training board for Arduino & ESP32.",
    tags: ["Arduino UNO", "ESP32", "Dual MCU slots for flexible usage"],
    price: "₹17,999",
    mrp: "₹21,999",
    save: "SAVE ₹4,000",
    thumbnails: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop"
    ],
    specs: {
      controllers: ["Arduino UNO", "ESP32 DevKit"],
      sensors: ["DHT11 Temperature Sensor", "Light Dependent Resistor (LDR)", "HC-SR04 Ultrasonic Sensor"],
      display: ["7-Segment Display", "Status LEDs", "OLED Display"],
      actuators: ["Single Relay Module", "Buzzer"],
      connectivity: ["Breadboard Expansion", "5V Power Rail", "Wi-Fi / Bluetooth"]
    },
    included: [
      { code: "HW", title: "Lite Trainer Board", desc: "Pre-configured dual-MCU entry board" },
      { code: "CD", title: "Arduino & ESP32 Code", desc: "Comprehensive starter code bundle" },
      { code: "SP", title: "Technical Support", desc: "Standard ARC LABS help desk" }
    ],
    useCases: [
      { id: "01", title: "Beginner Embedded Systems", desc: "Learn foundational electronics with Arduino UNO and C++ fundamentals." },
      { id: "02", title: "Basic IoT Projects", desc: "Connect sensors to cloud services using the integrated ESP32 module." }
    ]
  },
  {
    id: "experience",
    tier: "TIER 03",
    badge: "INTERMEDIATE",
    category: "Flagship",
    badgeColor: "#06b6d4",
    isBestSeller: true,
    title: "ARC LABS IoT Experience Kit",
    desc: "All-in-one multi-MCU trainer — the most versatile kit in the lineup.",
    tags: ["Arduino UNO", "ESP32 DevKit", "STM32 DevKit"],
    price: "₹23,999",
    mrp: "₹27,999",
    save: "SAVE ₹4,000",
    thumbnails: [
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop"
    ],
    specs: {
      controllers: ["Arduino UNO", "ESP32 DevKit", "STM32 Nucleo"],
      sensors: ["MPU6050 Gyro", "Ultrasonic HC-SR04", "DHT11 Temp & Humidity", "Gas Sensor MQ135", "BMP180 Barometric"],
      display: ["1.3\" OLED Display", "RGB LED Matrix"],
      actuators: ["Quad Relay Module", "Servo Motor Port", "Stepper Driver"],
      connectivity: ["RS485 Industrial", "CAN Bus Module", "Dual Voltage Rails", "LoRa Module"]
    },
    included: [
      { code: "HW", title: "Multi-MCU Baseboard", desc: "Triple controller workspace with RS485 & LoRa" },
      { code: "CD", title: "Full Code Repository", desc: "Libraries, MicroPython, and STM32 examples" },
      { code: "SP", title: "Priority Support", desc: "Direct engineering support channel" }
    ],
    useCases: [
      { id: "01", title: "Industrial IoT Simulations", desc: "Build MODBUS/RS485 and LoRa node communication systems." },
      { id: "02", title: "Multi-Architecture Labs", desc: "Compare AVR, ARM Cortex, and Xtensa processor performance side-by-side." }
    ]
  },
  {
    id: "pro",
    tier: "TIER 04",
    badge: "ADVANCED",
    category: "Advanced",
    badgeColor: "#8b5cf6",
    title: "ARC LABS IoT Pro Kit",
    desc: "High-performance board for advanced IoT, edge AI, and Raspberry Pi.",
    tags: ["Raspberry Pi 4", "ESP32 DevKit"],
    price: "₹29,999",
    mrp: "₹33,999",
    save: "SAVE ₹4,000",
    thumbnails: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop"
    ],
    specs: {
      controllers: ["Raspberry Pi 4 / 5", "ESP32 DevKit"],
      sensors: ["DHT Sensor", "Ultrasonic HC-SR04", "INA219 Current/Voltage", "Gas Sensor MQ135", "IR Obstacle Sensor"],
      display: ["OLED / TFT Display", "RGB LEDs", "Push Buttons"],
      actuators: ["High Power Relay Outputs", "Buzzer", "Motor Control Interface"],
      connectivity: ["Wi-Fi / Bluetooth", "GSM / 4G", "RS485 Industrial", "Cloud Integration"]
    },
    included: [
      { code: "HW", title: "Pro Edge AI Board", desc: "Integrated Pi 4 + ESP32 expansion station" },
      { code: "CD", title: "Python & Edge AI Code", desc: "OpenCV, MQTT, and TensorFlow Lite examples" },
      { code: "SP", title: "VIP Lab Support", desc: "Full curriculum & lab setup guidance" }
    ],
    useCases: [
      { id: "01", title: "Edge AI & Computer Vision", desc: "Deploy lightweight AI models and camera vision pipelines on Raspberry Pi." },
      { id: "02", title: "Hybrid Cloud Gateways", desc: "Route local sensor data from ESP32 to Raspberry Pi edge servers." }
    ]
  }
];

// ===== FULL COMPARISON MATRIX DATA =====
const COMPARISON_DATA = [
  {
    category: "CONTROLLERS",
    items: [
      { name: "Arduino UNO", essential: false, lite: true, experience: true, pro: false },
      { name: "ESP32", essential: true, lite: true, experience: true, pro: true },
      { name: "STM32", essential: false, lite: false, experience: true, pro: false },
      { name: "Raspberry Pi Pico/W", essential: true, lite: false, experience: false, pro: false },
      { name: "Raspberry Pi 4/5", essential: false, lite: false, experience: false, pro: true }
    ]
  },
  {
    category: "SENSORS & OUTPUTS",
    items: [
      { name: "DHT Sensor", essential: true, lite: true, experience: true, pro: true },
      { name: "Ultrasonic Sensor", essential: true, lite: true, experience: true, pro: true },
      { name: "LDR Sensor", essential: false, lite: true, experience: true, pro: false },
      { name: "OLED / TFT Display", essential: true, lite: true, experience: true, pro: true },
      { name: "Relay Outputs", essential: true, lite: true, experience: true, pro: true }
    ]
  },
  {
    category: "CONNECTIVITY",
    items: [
      { name: "Wi-Fi / Bluetooth", essential: true, lite: true, experience: true, pro: true },
      { name: "LoRa", essential: false, lite: false, experience: true, pro: false },
      { name: "GSM / 4G", essential: false, lite: false, experience: false, pro: true },
      { name: "RS485", essential: false, lite: false, experience: true, pro: true },
      { name: "Cloud Integration", essential: true, lite: true, experience: true, pro: true }
    ]
  },
  {
    category: "SENSORS DETAILED",
    items: [
      { name: "DHT11 Temp & Humidity", essential: true, lite: true, experience: true, pro: true },
      { name: "Ultrasonic HC-SR04", essential: true, lite: true, experience: true, pro: true },
      { name: "BMP180 Barometric", essential: false, lite: false, experience: true, pro: true },
      { name: "INA219 Current/Voltage", essential: false, lite: false, experience: true, pro: false },
      { name: "Gas Sensor MQ135", essential: false, lite: false, experience: true, pro: true },
      { name: "IR Obstacle Sensor", essential: true, lite: true, experience: true, pro: true }
    ]
  },
  {
    category: "APPLICATIONS",
    items: [
      { name: "Beginner IoT Projects", essential: true, lite: true, experience: true, pro: true },
      { name: "Embedded Systems", essential: true, lite: true, experience: true, pro: true },
      { name: "Industrial IoT", essential: false, lite: false, experience: true, pro: true },
      { name: "AI + Edge Computing", essential: false, lite: false, experience: false, pro: true }
    ]
  }
];

// ===== SUB-COMPONENT: INTERACTIVE ASSEMBLY MODAL =====
export function KitModal({ selectedKit, closeModal }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab, setActiveTab] = useState("specifications");

  // Magnifier Zoom State & Ref
  const [zoomStyle, setZoomStyle] = useState({ scale: 1, originX: "50%", originY: "50%" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0, visible: false });
  const viewportRef = useRef(null);

  useEffect(() => {
    if (selectedKit) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedKit]);

  const resetZoom = () => {
    setZoomStyle({ scale: 1, originX: "50%", originY: "50%" });
    setCursorPos((prev) => ({ ...prev, visible: false }));
  };

  const handleThumbSelect = (idx) => {
    setActiveThumb(idx);
    resetZoom();
  };

  const handleMouseMove = (e) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setCursorPos({ x, y, visible: true });
    setZoomStyle({
      scale: 2.2,
      originX: `${xPercent}%`,
      originY: `${yPercent}%`
    });
  };

  const handleMouseLeave = () => {
    resetZoom();
  };

  if (!selectedKit) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] border border-sky-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto mt-24"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full border border-white/10 text-slate-400 hover:text-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Image Inspection Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Thumbnails Column */}
            <div className="md:col-span-2 flex md:flex-col gap-3 order-2 md:order-1">
              {selectedKit.thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  className={`relative rounded-xl overflow-hidden border transition-all ${
                    activeThumb === idx ? "border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]" : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => handleThumbSelect(idx)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>

            {/* Main Viewport (Magnifier) */}
            <div
              className="md:col-span-10 relative overflow-hidden cursor-crosshair rounded-xl border border-white/10 h-72 sm:h-96 order-1 md:order-2"
              ref={viewportRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="w-full h-full transition-transform duration-100 ease-out"
                style={{
                  transform: `scale(${zoomStyle.scale})`,
                  transformOrigin: `${zoomStyle.originX} ${zoomStyle.originY}`
                }}
              >
                <img src={selectedKit.thumbnails[activeThumb]} alt="Kit Assembly Main" className="w-full h-full object-cover" />
              </div>

              {cursorPos.visible && (
                <div
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-sky-400 bg-sky-500/20 flex items-center justify-center text-sky-300"
                  style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Details & Specs Section */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest uppercase text-sky-400 px-3 py-1 rounded-full border border-sky-500/30">
                {selectedKit.tier}
              </span>
              <div className="flex flex-wrap items-baseline justify-between gap-4 mt-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedKit.title}</h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-sky-400">{selectedKit.price}</span>
                  <span className="text-xs text-slate-400">/unit</span>
                  <span className="text-xs text-slate-500 line-through ml-2">MRP {selectedKit.mrp}</span>
                </div>
              </div>
            </div>

            {/* Sub-tags */}
            <div className="flex flex-wrap gap-2">
              {["School Students", "Diploma & Engineering Year 1", "Pico + ESP32 Basics", "Workshop Labs"].map((tag, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-lg border border-white/10 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>

            {/* Spec Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
              {["specifications", "included", "usecases", "compare"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    activeTab === tab
                      ? "bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "specifications" && "Specifications"}
                  {tab === "included" && "What's Included"}
                  {tab === "usecases" && "Use Cases"}
                  {tab === "compare" && "Compare All"}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: Specifications */}
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(selectedKit.specs).map(([key, list], idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-white/10">
                    <h3 className="text-sm font-bold text-sky-400 capitalize mb-3 tracking-wider">{key}</h3>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {list.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-sky-400 font-bold">›</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: What's Included */}
            {activeTab === "included" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedKit.included?.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10 flex items-start gap-4">
                    <div className="px-3 py-1.5 rounded-lg border border-sky-500/30 text-sky-400 font-mono font-bold text-xs">
                      {item.code}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Use Cases */}
            {activeTab === "usecases" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedKit.useCases?.map((uc, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-sky-400 tracking-wider">USE CASE {uc.id}</span>
                    <h4 className="text-sm font-bold text-white mt-1 mb-2">{uc.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{uc.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT: Compare All Modal Table */}
            {activeTab === "compare" && (
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="text-slate-400 uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3">Feature</th>
                      <th className="p-3">IOT ESSENTIAL<br/><span className="text-sky-400">₹14,999</span></th>
                      <th className="p-3">IOT LITE<br/><span className="text-sky-400">₹17,999</span></th>
                      <th className="p-3">IOT EXPERIENCE<br/><span className="text-sky-400">₹23,999</span></th>
                      <th className="p-3">IOT PRO<br/><span className="text-sky-400">₹29,999</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {COMPARISON_DATA.map((section, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <tr className="text-sky-400 font-bold uppercase text-[10px] tracking-widest border-b border-white/10">
                          <td colSpan="5" className="p-2 px-3">{section.category}</td>
                        </tr>
                        {section.items.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/5">
                            <td className="p-3 font-medium text-white">{row.name}</td>
                            <td className="p-3">{row.essential ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                            <td className="p-3">{row.lite ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                            <td className="p-3">{row.experience ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                            <td className="p-3">{row.pro ? <span className="text-sky-400 font-bold">✓</span> : <span className="text-slate-600">—</span>}</td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ===== MAIN APP COMPONENT =====
export default function App() {
  const [selectedKit, setSelectedKit] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All Kits");

  const openModal = (kit) => {
    setSelectedKit(kit);
  };

  const closeModal = () => {
    setSelectedKit(null);
  };

  const filteredKits = KITS.filter((kit) => {
    if (activeFilter === "All Kits") return true;
    return kit.category === activeFilter;
  });

  return (
    <div className="min-h-screen text-slate-100 font-sans selection:bg-sky-500 selection:text-slate-950 relative overflow-x-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center relative z-10 mt-24">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          IoT & Robotics Development Kits <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-blue-500">
            for Innovation
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 mb-8 leading-relaxed">
          Four development boards. Every major microcontroller. Designed in Hyderabad for Indian classrooms and labs.
        </p>

        {/* Category Filters */}
        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 rounded-full border border-white/10">
          {["All Kits", "Essential", "Beginner", "Flagship", "Advanced"].map((filter) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ===== CATALOG GRID ===== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredKits.map((kit) => (
            <div
              key={kit.id}
              onClick={() => openModal(kit)}
              className="group relative rounded-2xl border border-white/10 hover:border-sky-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div>
                {/* Card Top Bar */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-sky-400 px-2.5 py-1 rounded-full border border-sky-500/30">
                    {kit.tier}
                  </span>
                  {kit.isBestSeller && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-500/30 text-amber-400">
                      Best Seller
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {kit.title}
                </h2>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {kit.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {kit.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] px-2.5 py-0.5 rounded text-slate-300 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Card Price Row */}
                <div className="flex items-baseline justify-between pt-4 border-t border-white/10 mb-5">
                  <div>
                    <span className="text-2xl font-extrabold text-white">{kit.price}</span>
                    <span className="text-xs text-slate-500 line-through ml-2">{kit.mrp}</span>
                  </div>
                  {kit.save && (
                    <span className="text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                      {kit.save}
                    </span>
                  )}
                </div>

                {/* Card Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="py-2.5 px-3 rounded-xl border border-white/10 text-slate-200 text-xs font-semibold transition-all hover:border-sky-500/30 hover:bg-white/5"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(kit);
                    }}
                  >
                    Full Specs
                  </button>
                  <button
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all hover:scale-[1.02]"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(kit);
                    }}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ===== ON-PAGE FULL COMPARISON MATRIX ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-8">
          Complete Technical Comparison
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Feature / Module</th>
                <th className="p-4">TIER 01<br/><span className="text-sky-400 font-bold">Essential Kit</span></th>
                <th className="p-4">TIER 02<br/><span className="text-sky-400 font-bold">Lite Kit</span></th>
                <th className="p-4">TIER 03<br/><span className="text-sky-400 font-bold">Experience Kit</span></th>
                <th className="p-4">TIER 04<br/><span className="text-sky-400 font-bold">Pro Kit</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {COMPARISON_DATA.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  <tr className="text-sky-400 font-bold uppercase text-xs tracking-widest border-b border-white/10">
                    <td colSpan="5" className="p-3 px-4">{section.category}</td>
                  </tr>
                  {section.items.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium text-white">{row.name}</td>
                      <td className="p-4">{row.essential ? <span className="text-sky-400 font-bold text-base">✓</span> : <span className="text-slate-600">—</span>}</td>
                      <td className="p-4">{row.lite ? <span className="text-sky-400 font-bold text-base">✓</span> : <span className="text-slate-600">—</span>}</td>
                      <td className="p-4">{row.experience ? <span className="text-sky-400 font-bold text-base">✓</span> : <span className="text-slate-600">—</span>}</td>
                      <td className="p-4">{row.pro ? <span className="text-sky-400 font-bold text-base">✓</span> : <span className="text-slate-600">—</span>}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== NEED HELP / CONTACT CALLOUT ===== */}
      <section className="max-w-4xl mx-auto px-4 my-12">
        <div className="rounded-3xl border border-sky-500/20 p-8 md:p-12 text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            Need help choosing the right kit?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Talk to our team. We'll recommend the right board for your lab, budget, and curriculum.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <a href="tel:+917815809412" className="px-5 py-2.5 rounded-full border border-white/10 text-white text-sm font-medium transition-all hover:border-sky-500/40 hover:bg-white/5">
              📞 +91 7815809412
            </a>
            <a href="https://wa.me/917815809412" target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full border border-emerald-500/40 text-emerald-300 text-sm font-medium transition-all hover:bg-emerald-500/10">
              💬 WhatsApp
            </a>
            <a href="mailto:hello@arclabs.in" className="px-5 py-2.5 rounded-full border border-sky-500/30 text-sky-300 text-sm font-medium transition-all hover:bg-sky-500/10">
              ✉️ hello@arclabs.in
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-white/10 pt-6">
            <span>Need a complete lab? <a href="#lab-packages" className="text-sky-400 hover:underline">See our lab packages →</a></span>
            <span><a href="#training" className="text-sky-400 hover:underline">Explore training programs →</a></span>
          </div>
        </div>
      </section>

      {/* ===== FLOATING ACTION WIDGETS ===== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <button className="px-4 py-2.5 rounded-full border border-sky-500/40 text-sky-300 text-xs font-bold shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md">
          <span className="text-sky-400">✦</span> Ask ARC AI
        </button>
        <button className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all ml-auto" aria-label="WhatsApp">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 2c-5.514 0-9.996 4.482-9.996 9.997 0 1.761.459 3.477 1.332 4.996l-1.367 4.997 5.116-1.341c1.472.802 3.136 1.226 4.915 1.226 5.514 0 9.996-4.482 9.996-9.997 0-5.515-4.482-9.997-9.996-9.997zm5.834 14.129c-.247.694-1.227 1.325-1.993 1.488-.526.111-1.213.2-3.528-.758-2.962-1.225-4.869-4.228-5.016-4.425-.147-.197-1.201-1.598-1.201-3.048 0-1.45.758-2.164 1.026-2.457.268-.293.585-.366.78-.366.195 0 .39.001.561.008.181.008.423-.069.662.504.247.585.83 2.029.903 2.175.073.147.122.317.024.512-.098.195-.147.317-.293.488-.147.171-.309.382-.442.512-.147.147-.301.309-.129.605.171.293.763 1.258 1.637 2.037 1.123.999 2.07 1.309 2.363 1.456.293.147.464.122.635-.073.171-.195.732-.854.928-1.147.195-.293.39-.244.659-.147.268.098 1.708.805 2.001.952.293.147.488.22.561.341.073.122.073.707-.174 1.401z"/>
          </svg>
        </button>
      </div>

      {/* ===== INTERACTIVE ASSEMBLY MODAL ===== */}
      <KitModal selectedKit={selectedKit} closeModal={closeModal} />
    </div>
  );
}