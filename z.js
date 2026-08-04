/**
 * IoT Application Kit Inspector Script
 */

// Define separate image sources and hotspots for each thumbnail view
const viewsData = [
    {
      id: "view-1",
      imageSrc: "src/assets/images/kit1.jpeg", // Default First Image
      hotspots: [
        { id: "esp32", x: 4, y: 8, width: 19, height: 26, title: "ESP32 Extension Board", category: "MICROCONTROLLER", desc: "Dual-core Wi-Fi & Bluetooth MCU module for cloud connectivity.", specs: { Core: "ESP32", Speed: "240 MHz" } },
        { id: "mq135", x: 24, y: 8, width: 13, height: 26, title: "MQ-135 Air Sensor", category: "ENVIRONMENTAL SENSOR", desc: "Air quality sensor detecting harmful gases and CO2 levels.", specs: { Type: "Gas Sensor", Output: "Analog/Digital" } },
        { id: "pico", x: 4, y: 36, width: 19, height: 26, title: "Raspberry Pi Pico", category: "MICROCONTROLLER", desc: "RP2040 micro-controller board featuring flexible digital interfaces.", specs: { Chip: "RP2040", Architecture: "ARM Cortex-M0+" } }
      ]
    },
    {
      id: "view-2",
      imageSrc: "src/assets/images/kit2.jpeg", // Second Image
      hotspots: [
        { id: "pico-close", x: 10, y: 15, width: 35, height: 45, title: "Microcontroller Close-Up", category: "MCU MODULE", desc: "Close-up detail view of controller pin headers.", specs: { GPIO: "26 Pins", Clock: "133 MHz" } }
      ]
    },
    {
      id: "view-3",
      imageSrc: "src/assets/images/kit3.jpeg", // Third Image
      hotspots: [
        { id: "board-overview", x: 10, y: 10, width: 80, height: 80, title: "Full Assembly Layout", category: "SYSTEM TOPOLOGY", desc: "Top-down layout showing power wiring and interconnect buses.", specs: { Layout: "Modular PCB", Voltage: "5V/3.3V" } }
      ]
    }
  ];
  
  let currentViewIdx = 0;
  
  // DOM Elements
  const viewport = document.getElementById("viewport");
  const imageWrapper = document.getElementById("imageWrapper");
  const mainImage = document.getElementById("mainImage");
  const hotspotsLayer = document.getElementById("hotspotsLayer");
  const zoomCursor = document.getElementById("zoomCursor");
  const thumbBtns = document.querySelectorAll(".thumb-btn");
  
  const componentHud = document.getElementById("componentHud");
  const hudCloseBtn = document.getElementById("hudCloseBtn");
  const hudTitle = document.getElementById("hudTitle");
  const hudCategory = document.getElementById("hudCategory");
  const hudDesc = document.getElementById("hudDesc");
  const hudSpecs = document.getElementById("hudSpecs");
  
  const setCursorX = gsap.quickTo(zoomCursor, "x", { duration: 0.12, ease: "power2.out" });
  const setCursorY = gsap.quickTo(zoomCursor, "y", { duration: 0.12, ease: "power2.out" });
  
  function init() {
    // Load FIRST image by default (index 0)
    loadView(0);
    setupEvents();
  }
  
  /**
   * Click left thumbnail -> Updates main view image on the right
   */
  function loadView(viewIndex) {
    currentViewIdx = viewIndex;
    resetZoom();
  
    // Smooth transition: fade out -> change image src -> render hotspots -> fade in
    gsap.to(imageWrapper, {
      opacity: 0,
      scale: 1,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        // Set main image to the clicked view's image
        mainImage.src = viewsData[viewIndex].imageSrc;
        renderHotspots(viewIndex);
        gsap.to(imageWrapper, { opacity: 1, duration: 0.22, ease: "power2.out" });
      }
    });
  
    // Highlight active thumbnail button
    thumbBtns.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === viewIndex);
    });
  }
  
  function renderHotspots(viewIndex) {
    hotspotsLayer.innerHTML = "";
    const data = viewsData[viewIndex];
  
    data.hotspots.forEach((hs) => {
      const box = document.createElement("div");
      box.className = "hotspot-rect";
      box.style.left = `${hs.x}%`;
      box.style.top = `${hs.y}%`;
      box.style.width = `${hs.width}%`;
      box.style.height = `${hs.height}%`;
  
      box.addEventListener("click", (e) => {
        e.stopPropagation();
        openHud(hs);
      });
  
      hotspotsLayer.appendChild(box);
    });
  }
  
  function openHud(hs) {
    hudCategory.textContent = hs.category;
    hudTitle.textContent = hs.title;
    hudDesc.textContent = hs.desc;
  
    hudSpecs.innerHTML = Object.entries(hs.specs)
      .map(([key, val]) => `
        <div class="spec-cell">
          <label>${key}</label>
          <span>${val}</span>
        </div>
      `).join("");
  
    componentHud.classList.add("open");
  }
  
  function resetZoom() {
    gsap.to(imageWrapper, {
      scale: 1,
      transformOrigin: "center center",
      duration: 0.35,
      ease: "power2.out"
    });
    componentHud.classList.remove("open");
  }
  
  function setupEvents() {
    // Left Thumbnail Click Listeners
    thumbBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const viewIndex = parseInt(btn.dataset.view);
        loadView(viewIndex);
      });
    });
  
    // Mouse Move Magnifier Zoom
    viewport.addEventListener("mousemove", (e) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      setCursorX(x);
      setCursorY(y);
  
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;
  
      gsap.to(imageWrapper, {
        transformOrigin: `${xPercent}% ${yPercent}%`,
        scale: 2.2,
        duration: 0.3,
        ease: "power1.out"
      });
    });
  
    viewport.addEventListener("mouseenter", () => {
      gsap.to(zoomCursor, { opacity: 1, duration: 0.2 });
    });
  
    viewport.addEventListener("mouseleave", () => {
      gsap.to(zoomCursor, { opacity: 0, duration: 0.2 });
      resetZoom();
    });
  
    hudCloseBtn.addEventListener("click", resetZoom);
    document.getElementById("closeBtn").addEventListener("click", resetZoom);
  }
  
  document.addEventListener("DOMContentLoaded", init);