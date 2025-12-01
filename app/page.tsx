// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import TripForm, { TripFormData } from "@/app/components/TripForm";
// import TripResult from "@/app/components/TripResult";
// import { sendTripRequest } from "@/app/api/tripApi";
// import "./globals.css";

// export default function Page() {
//   const [form, setForm] = useState<TripFormData>({
//     origin: "",
//     destination: "",
//     start_date: new Date().toISOString().split("T")[0],
//     end_date: (() => {
//       const d = new Date();
//       d.setDate(d.getDate() + 4);
//       return d.toISOString().split("T")[0];
//     })(),
//     interests: "",
//   });

//   const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
//   const [itineraryRaw, setItineraryRaw] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const resultRef = useRef<HTMLDivElement>(null);

//   async function handleSubmit(payload: TripFormData) {
//     setStatus("loading");
//     setItineraryRaw(null);
//     setErrorMessage(null);

//     try {
//       const result = await sendTripRequest(payload);
//       setItineraryRaw(result.itinerary || "");
//       setStatus("success");
//     } catch (err: any) {
//       console.error("❌ Error in handleSubmit:", err);
//       setErrorMessage(err?.message || "Unexpected error occurred");
//       setStatus("error");
//     }
//   }

//   function handleReset() {
//     setForm({
//       origin: "",
//       destination: "",
//       start_date: new Date().toISOString().split("T")[0],
//       end_date: (() => {
//         const d = new Date();
//         d.setDate(d.getDate() + 4);
//         return d.toISOString().split("T")[0];
//       })(),
//       interests: "",
//     });
//     setItineraryRaw(null);
//     setStatus("idle");
//     setErrorMessage(null);
//   }

//   // Scroll to result smoothly whenever it appears
//   useEffect(() => {
//     if ((status === "success" || status === "error") && resultRef.current) {
//       resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   }, [status]);

//   return (
//     <main className="min-h-screen font-sans">
//       {/* Header */}
//       <header className="header-bg text-white py-12 shadow-2xl">
//         <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
//           <div className="flex items-center gap-4">
//             <div className="p-3 rounded-xl bg-[var(--vacai-gold)] shadow-lg">
//               <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M2 12l20-7-9 7 9 7-20-7z"
//                   stroke="currentColor"
//                   strokeWidth="1.2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight"> 💫 CelestiaJourney ✨</h1>
//               <p className="text-blue-200 mt-1 text-lg">💎 “Heavenly Adventures, Perfectly Designed” 🌠.</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 pb-12">
//         <div className="w-full max-w-6xl mx-auto px-8 -mt-10 pb-12 flex flex-col gap-8">
//           {/* Trip Form */}
//           <TripForm
//             formData={form}
//             onChange={setForm}
//             onSubmit={handleSubmit}
//             onReset={handleReset}
//             loading={status === "loading"}
//           />

//           {/* Collapsible Result Section */}
//           <div className="min-h-[150px] w-full flex flex-col gap-4">
//             <AnimatePresence>
//               {(status === "success" || status === "error" || status === "loading") && (
//                 <motion.div
//                   ref={resultRef}
//                   key="trip-result"
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.5, ease: "easeInOut" }}
//                 >
//                   <TripResult
//                     result={itineraryRaw}
//                     isLoading={status === "loading"}
//                     statusLog={[]}
//                     error={errorMessage}
//                   />
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }





// below code beautifull travel image in Background

// app/page.tsx

"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Component for a clean, reusable feature card
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white/90 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100 backdrop-blur-sm">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default function HomePage() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-sans relative">
      {/* Parallax Background */}
      <div 
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80')",
          transform: `translateY(${offsetY * 0.3}px)` // smooth parallax
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] z-10"></div>

      {/* Page content */}
      <div className="relative z-20">
        {/* Navigation */}
        <nav className="p-4 border-b border-gray-200 bg-white/70 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-blue-700 transition">
              Celestia<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">🪽Journey</span>
            </Link>
            <div className="space-x-4">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
              <a href="#Sign-Up" className="text-gray-600 hover:text-blue-600 transition">Sign-Up</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="pt-20 pb-32 px-6 text-center">
          <header className="mb-12">
            <p className="text-md font-semibold text-blue-600 uppercase tracking-widest mb-4">
              The Future of Travel Planning
            </p>
            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tighter text-white leading-none">
              Plan Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Perfect Trip</span>
              <br />
              with Magic.
            </h1>
            <p className="mt-8 text-xl text-gray-100 max-w-3xl mx-auto">
              CelestiaJourney curates elegant, personalized itineraries tailored to your tastes, season, and travel rhythm—crafted to inspire and designed for effortless exploration.
            </p>
          </header>

          {/* CTA */}
          <Link href="/trip-planner" passHref>
            <button className="px-10 py-4 text-xl font-bold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 shadow-blue-500/50 transform hover:scale-[1.05] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-300">
              Start Your Journey Now 🚀
            </button>
          </Link>
          <p className="mt-4 text-sm text-gray-200">
            No commitments. Enjoy a complimentary taste of effortless travel planning.
          </p>
        </main>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white/80 border-t border-b border-gray-100 px-6 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900">
                How CelestiaJourney Changes the Game
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Where sophistication meets exploration. Discover the art of flawlessly curated travel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1v-3" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 10.5h2.25l-2.25 1.5-2.25 1.5h2.25zm-4.5 0h2.25L9.75 12l-2.25 1.5h2.25z" /></svg>}
                title="Personalized Itineraries" 
                description="Your tastes, passions, and travel pace shape an itinerary meticulously crafted just for you—distinct, elevated, unforgettable." 
              />
              <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                title="Save Time & Stress" 
                description="Skip the endless research. Get a complete, ready-to-go plan crafted in moments, not days." 
              />
              <FeatureCard 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>}
                title="Real-time Suggestions" 
                description="Your itinerary adjusts gracefully with seasonal insights, local highlights, and refined on-the-go recommendations for a seamless experience every step of the way." 
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-50/80 border-t border-gray-100 px-6 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} CelestiaJourney — Crafted for the Modern Explorer.</p>
            <div className="mt-2 space-x-4">
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
