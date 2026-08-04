import React, { useState } from "react";
import { Sparkles, ShieldCheck, Ticket, ArrowRight, MessageSquare } from "lucide-react";

export default function WorkshopEnrolment() {
  const [formData, setFormData] = useState({
    studentName: "",
    rollNo: "",
    email: "",
    mobile: "",
    gender: "Male",
    department: "",
    year: "",
    semester: "",
    collegeName: "",
    workshopName: "",
    couponCode: ""
  });

  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [totalPayable, setTotalPayable] = useState(1200);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (formData.couponCode.trim()) {
      setAppliedCoupon(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration Initiated for ${formData.studentName || "Student"}!`);
  };

  return (
    <div className="w-full text-slate-100 font-sans relative selection:bg-cyan-500 selection:text-black">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        
        {/* ===== HEADER ===== */}
        <header className="mb-10 mt-24">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> WORKSHOP ENROLMENT
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mt-4 leading-[1.15] tracking-tight">
            Build your next skill.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Book your seat.
            </span>
          </h1>
          <p className="text-slate-400 mt-3 text-sm sm:text-base font-normal max-w-xl">
            A clear, secure registration experience for IoTily Lab hands-on programs and workshops.
          </p>
        </header>

        {/* ===== MAIN FORM CONTAINER ===== */}
        <form onSubmit={handleSubmit} className="space-y-8 border border-cyan-500/20 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl">
          
          {/* SECTION 01: STUDENT DETAILS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                01
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Student details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Student name <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="e.g. Ananya Sharma"
                  required
                  className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Registration / Roll No */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Registration / Roll No. <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="e.g. 22CS1048"
                  required
                  className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Email ID */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Email ID <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ananya@example.com"
                  required
                  className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Mobile No */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Mobile No. <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="9876543210"
                  required
                  className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Gender Radio Segment */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Gender <span className="text-cyan-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl border border-slate-800">
                  {["Male", "Female"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setFormData((prev) => ({ ...prev, gender: option }))}
                      className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                        formData.gender === option
                          ? "text-cyan-400 border border-cyan-500/40"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch / Stream */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Branch / Stream / Department <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g. Computer Science Engineering"
                  required
                  className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                />
              </div>

              {/* Year Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Year <span className="text-cyan-400">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">Select year</option>
                  <option value="1st Year" className="bg-slate-950 text-white">1st Year</option>
                  <option value="2nd Year" className="bg-slate-950 text-white">2nd Year</option>
                  <option value="3rd Year" className="bg-slate-950 text-white">3rd Year</option>
                  <option value="4th Year" className="bg-slate-950 text-white">4th Year</option>
                </select>
              </div>

              {/* Semester Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Semester <span className="text-cyan-400">*</span>
                </label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-slate-950 text-slate-400">Select semester</option>
                  {Array.from({ length: 8 }, (_, i) => (
                    <option key={i + 1} value={`Semester ${i + 1}`} className="bg-slate-950 text-white">
                      Semester {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <hr className="border-slate-800/80" />

          {/* SECTION 02: COLLEGE DETAILS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                02
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                College details
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                College full name <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                placeholder="e.g. Madhav Institute of Technology & Science (MITS)"
                required
                className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
              />
            </div>
          </section>

          <hr className="border-slate-800/80" />

          {/* SECTION 03: CHOOSE YOUR PROGRAM */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                03
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Choose your program
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Workshop name <span className="text-cyan-400">*</span>
              </label>
              <select
                name="workshopName"
                value={formData.workshopName}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-slate-950 text-slate-400">Select workshop name</option>
                <option value="Computer Vision & Edge AI Masterclass" className="bg-slate-950 text-white">Computer Vision & Edge AI Masterclass</option>
                <option value="IoT & Robotics Masterclass" className="bg-slate-950 text-white">IoT & Robotics Masterclass</option>
                <option value="NVIDIA Jetson Orin Prototyping Bootcamp" className="bg-slate-950 text-white">NVIDIA Jetson Orin Prototyping Bootcamp</option>
                <option value="Embedded Systems & Industry 4.0" className="bg-slate-950 text-white">Embedded Systems & Industry 4.0</option>
              </select>
            </div>
          </section>

          <hr className="border-slate-800/80" />

          {/* SECTION 04: OFFERS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                04
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Offers
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Coupon code (optional)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="couponCode"
                  value={formData.couponCode}
                  onChange={handleChange}
                  placeholder="Enter coupon code"
                  className="flex-1 bg-transparent border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-6 py-3 rounded-xl border border-cyan-500/30 hover:border-cyan-400 text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <Ticket className="w-4 h-4 text-cyan-400" />
                  Apply
                </button>
              </div>
            </div>
          </section>

          {/* ===== CHECKOUT CARD & CTA BUTTON ===== */}
          <div className="pt-4 space-y-4">
            
            {/* Razorpay Banner */}
            <div className="border border-cyan-500/20 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Secure checkout</h4>
                  <p className="text-xs text-slate-400">Payment verified by Razorpay</p>
                </div>
              </div>

              <div className="text-right">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total payable</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  ₹{totalPayable.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <span>Book Your Slot</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </form>
      </div>

      {/* ===== FLOATING ACTION WIDGETS ===== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Ask IoTily AI Button */}
        <button 
          type="button" 
          className="px-4 py-2.5 rounded-full border border-cyan-500/40 text-cyan-300 text-xs font-bold hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md hover:border-cyan-400"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Ask IoTily AI</span>
        </button>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/917815809412" 
          target="_blank" 
          rel="noreferrer" 
          aria-label="WhatsApp"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 flex items-center justify-center hover:scale-110 transition-all"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
        </a>
      </div>

    </div>
  );
}