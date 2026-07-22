// import React from "react";
// import {
//   TrendingUp,
//   Mountain,
//   Map,
//   Users,
//   Database,
//   Search,
// } from "lucide-react";

// export default function NepalFlow() {
//   return (
//     <main className="min-h-screen bg-background text-foreground">
//       <Hero />
//       <AboutApp />
//       <FeatureGrid />
//     </main>
//   );
// }

// function Hero() {
//   return (
//     <section className="border-b border-gray-500/40 py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-10">
//         <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
//           {/* Left */}
//           <div>
//             <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-500/40 bg-background px-4 py-2 text-xs font-medium tracking-[0.25em] uppercase text-orange-400">
//               NepalFlow // Tourism Intelligence
//             </p>

//             <h1 className="max-w-2xl text-5xl font-black leading-tight tracking-tight text-foreground md:text-7xl">
//               Forecasting Visitor Flows from Terai to Peak
//             </h1>

//             <p className="mt-8 max-w-xl text-lg leading-8 text-gray-400">
//               NepalFlow combines historical arrival data with machine learning
//               to deliver precise tourist volume forecasting. Built for hotels,
//               trekking agencies, and conservation managers needing to anticipate
//               seasonal peaks and resource demands.
//             </p>
//           </div>

//           {/* Right */}
//           <div className="overflow-hidden rounded-2xl border border-gray-500/40 bg-background">
//             <div className="flex items-center justify-between border-b border-gray-500/40 px-6 py-5">
//               <div>
//                 <p className="text-xs font-semibold tracking-[0.25em] text-orange-400 uppercase">
//                   Visitor Forecast Node
//                 </p>

//                 <h2 className="mt-2 text-2xl font-bold text-foreground">
//                   Namche Bazaar
//                 </h2>
//               </div>

//               <TrendingUp className="h-9 w-9 text-orange-400" />
//             </div>

//             <div className="divide-y divide-gray-500/20">
//               {[
//                 ["Projected Monthly Visitors", "14,820"],
//                 ["Peak Season Window", "Oct - Nov"],
//                 ["Avg. Length of Stay", "12.5 Days"],
//                 ["Primary Activity Profile", "Trekking & Climbing"],
//                 ["Capacity Threshold Status", "Optimal / 78%"],
//               ].map(([label, value]) => (
//                 <div key={label} className="grid grid-cols-2 px-6 py-5">
//                   <span className="font-medium text-gray-400">{label}</span>

//                   <span className="text-right font-semibold text-foreground">
//                     {value}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="border-t border-gray-500/40 px-6 py-5">
//               <p className="text-xs font-semibold tracking-[0.25em] text-gray-400 uppercase">
//                 PREDICTIVE ENGINE STATUS
//               </p>

//               <p className="mt-2 text-sm text-gray-400">
//                 Data calibrated using active flight manifests, visa
//                 applications, and historical trail permit trends.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function AboutApp() {
//   return (
//     <section className="border-b border-gray-500/40 py-24">
//       <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5 lg:px-10">
//         {/* Left */}
//         <div className="lg:col-span-2">
//           <p className="mb-5 text-xs font-semibold tracking-[0.3em] uppercase text-orange-400">
//             About the Platform
//           </p>

//           <h2 className="text-5xl font-black leading-tight tracking-tight text-foreground md:text-6xl">
//             Bridging the gap between raw travel data and local preparation.
//           </h2>
//         </div>

//         {/* Right */}
//         <div className="border border-gray-500/40 bg-background lg:col-span-3">
//           <div className="border-b border-gray-500/40 px-8 py-8">
//             <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-400">
//               Infrastructure.01
//             </p>

//             <h3 className="mt-3 text-xl font-bold text-foreground">
//               Historical Immersion
//             </h3>

//             <p className="mt-3 text-gray-400 leading-7">
//               Integrating decades of immigration records, park entrance fees,
//               and flight logs to map core traveler behaviors and base patterns.
//             </p>
//           </div>

//           <div className="border-b border-gray-500/40 px-8 py-8">
//             <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-400">
//               Infrastructure.02
//             </p>

//             <h3 className="mt-3 text-xl font-bold text-foreground">
//               Seasonality Modeling
//             </h3>

//             <p className="mt-3 text-gray-400 leading-7">
//               Machine learning models that dynamically adapt predictions around
//               festival cycles, monsoon shifts, and global flight trends.
//             </p>
//           </div>

//           <div className="px-8 py-8">
//             <p className="text-xs font-semibold tracking-[0.25em] uppercase text-orange-400">
//               Infrastructure.03
//             </p>

//             <h3 className="mt-3 text-xl font-bold text-foreground">
//               Granular Distribution
//             </h3>

//             <p className="mt-3 text-gray-400 leading-7">
//               Forecasting crowd movements for specific trail loops, heritage
//               sites, and remote villages to prevent bottlenecking and
//               overtourism.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function FeatureGrid() {
//   const features = [
//     {
//       code: "FLOW.01",
//       title: "Arrival Forecasting",
//       icon: TrendingUp,
//       description:
//         "Predicting international and regional visitor trends up to 12 months in advance to assist in high-level seasonal planning.",
//     },
//     {
//       code: "FLOW.02",
//       title: "Trail Density Mapping",
//       icon: Map,
//       description:
//         "Simulating anticipated daily foot traffic on popular loops like Everest Base Camp and Annapurna to manage lodge capacities.",
//     },
//     {
//       code: "FLOW.03",
//       title: "Community Metrics",
//       icon: Users,
//       description:
//         "Estimating local food, fuel, and staffing needs for remote guides, helping mountain tea houses balance their supply chains.",
//     },
//     {
//       code: "FLOW.04",
//       title: "Offline Syncing",
//       icon: Database,
//       description:
//         "Cached projection charts designed to download over slow mobile networks, keeping remote guides informed on the trail.",
//     },
//   ];

//   return (
//     <section className="py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-10">
//         <div className="mb-12 flex items-center justify-between border-b border-gray-500/40 pb-6">
//           <div>
//             <p className="text-xs font-semibold tracking-[0.3em] uppercase text-orange-400">
//               Core Utilities
//             </p>

//             <h2 className="mt-3 text-4xl font-black text-foreground">
//               Operational Modules
//             </h2>
//           </div>

//           <Mountain className="h-8 w-8 text-gray-500" />
//         </div>

//         <div className="overflow-hidden rounded-2xl border border-gray-500/40 lg:grid lg:grid-cols-4">
//           {features.map((feature, index) => {
//             const Icon = feature.icon;

//             return (
//               <div
//                 key={feature.code}
//                 className={`bg-background p-8 transition-all duration-300 hover:border-orange-400/30 ${
//                   index !== features.length - 1
//                     ? "border-b lg:border-b-0 lg:border-r border-gray-500/40"
//                     : ""
//                 }`}
//               >
//                 <Icon className="h-7 w-7 text-orange-400" />

//                 <p className="mt-8 text-xs font-bold tracking-[0.25em] uppercase text-orange-400">
//                   {feature.code}
//                 </p>

//                 <h3 className="mt-4 text-2xl font-bold text-foreground">
//                   {feature.title}
//                 </h3>

//                 <p className="mt-5 leading-7 text-gray-400">
//                   {feature.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

// import { Link } from "react-router-dom";
// import { IoIosTimer, IoMdTrendingUp } from "react-icons/io";
// import { BiBarChartAlt2 } from "react-icons/bi";
// import { RiArrowRightUpLongLine } from "react-icons/ri";
// import { FaMountain, FaChartLine, FaCloudSun } from "react-icons/fa";

// const NEPAL_PHOTOS = [
//   "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
//   "https://images.unsplash.com/photo-1510906594845-bc082582c8cc?w=800",
//   "https://images.unsplash.com/photo-1585516482738-b0bea3493a73?w=800",
//   "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800",
//   "https://images.unsplash.com/photo-1571625257590-a6a3d3e3e3e3?w=800",
//   "https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?w=800",
// ];

// const STATS = [
//   { label: "Years of Data", value: "29+" },
//   { label: "Annual Arrivals 2024", value: "1.15M" },
//   { label: "Forecast Horizon", value: "2026" },
//   { label: "Model Accuracy", value: "86.25%" },
// ];

// const MODULES = [
//   {
//     to: "/historical",
//     icon: <IoIosTimer className="text-2xl" />,
//     color: "bg-orange-300/20 text-orange-400",
//     title: "Historical",
//     desc: "Explore 29 years of Nepal tourism data from 1996 to 2024 with interactive charts and seasonal heatmaps.",
//   },
//   {
//     to: "/forecast",
//     icon: <IoMdTrendingUp className="text-2xl" />,
//     color: "bg-green-300/20 text-green-400",
//     title: "Forecast",
//     desc: "View SARIMAX model predictions for 2025 and 2026 with 95% confidence intervals and crowd level labels.",
//   },
//   {
//     to: "/comparison",
//     icon: <BiBarChartAlt2 className="text-2xl" />,
//     color: "bg-violet-300/20 text-violet-400",
//     title: "Comparison",
//     desc: "Compare historical arrivals with forecasted values to see how well the model tracks real tourism patterns.",
//   },
// ];

// const NepalFlow = () => {
//   return (
//     <div className="bg-background text-foreground min-h-screen">

//       {/* Hero Section */}
//       <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">

//         {/* Background image */}
//         <img
//           src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600"
//           alt="Nepal Mountains"
//           className="absolute inset-0 w-full h-full object-cover opacity-30"
//         />

//         {/* Gradient overlay */}
//         <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />

//         {/* Hero content */}
//         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
//           <div className="flex items-center justify-center gap-2 text-orange-400 text-xs uppercase tracking-widest mb-4">
//             <FaMountain />
//             <span>Nepal Tourism Intelligence</span>
//           </div>
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
//             Forecasting Visitor
//             <span className="text-orange-400"> Flows</span>
//             <br />for Nepal
//           </h1>
//           <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
//             NepalFlow combines 29 years of historical arrival data with a
//             SARIMAX forecasting model to deliver precise tourism volume
//             predictions for 2025 and 2026.
//           </p>
//           <div className="flex flex-wrap gap-4 justify-center">
//             <Link
//               to="/historical"
//               className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl transition-all flex items-center gap-2"
//             >
//               Explore Data <RiArrowRightUpLongLine />
//             </Link>
//             <Link
//               to="/forecast"
//               className="border border-orange-400/50 text-orange-400 hover:bg-orange-400/10 font-semibold px-8 py-3 rounded-xl transition-all"
//             >
//               View Forecast
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {STATS.map((s) => (
//             <div
//               key={s.label}
//               className="bg-background border border-gray-500/40 rounded-2xl p-6 text-center hover:border-orange-400/40 transition-all"
//             >
//               <div className="text-3xl font-bold text-orange-400 mb-1">{s.value}</div>
//               <div className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Nepal Photos Grid */}
//       <div className="max-w-6xl mx-auto px-6 mt-20">
//         <div className="text-center mb-10">
//           <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Destination</p>
//           <h2 className="text-3xl md:text-4xl font-bold">The Land of Himalayas</h2>
//           <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
//             From the peaks of Everest to the plains of Chitwan, Nepal attracts
//             over a million visitors every year.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//           <div className="md:row-span-2 rounded-2xl overflow-hidden h-64 md:h-auto">
//             <img
//               src="https://images.unsplash.com/photo-1510906594845-bc082582c8cc?w=800"
//               alt="Nepal"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//           <div className="rounded-2xl overflow-hidden h-64">
//             <img
//               src="https://images.unsplash.com/photo-1585516482738-b0bea3493a73?w=800"
//               alt="Nepal"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//           <div className="rounded-2xl overflow-hidden h-64">
//             <img
//               src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800"
//               alt="Nepal"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//           <div className="rounded-2xl overflow-hidden h-64">
//             <img
//               src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800"
//               alt="Nepal"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//           <div className="rounded-2xl overflow-hidden h-64">
//             <img
//               src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
//               alt="Nepal"
//               className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Modules Section */}
//       <div className="max-w-6xl mx-auto px-6 mt-20">
//         <div className="text-center mb-10">
//           <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Platform</p>
//           <h2 className="text-3xl md:text-4xl font-bold">Three Ways to Explore</h2>
//           <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
//             Discover Nepal's tourism patterns through historical trends,
//             AI-powered forecasts, and side-by-side comparisons.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {MODULES.map((m) => (
//             <Link
//               key={m.title}
//               to={m.to}
//               className="border border-gray-500/40 rounded-2xl p-8 hover:border-orange-400/40 hover:scale-[1.02] transition-all duration-300 group"
//             >
//               <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${m.color}`}>
//                 {m.icon}
//               </div>
//               <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
//                 {m.title}
//               </h3>
//               <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
//               <div className="flex items-center gap-1 text-orange-400 text-sm mt-4 font-medium">
//                 Explore <RiArrowRightUpLongLine />
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="max-w-6xl mx-auto px-6 mt-20 mb-10">
//         <div className="relative rounded-2xl overflow-hidden">
//           <img
//             src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600"
//             alt="Nepal"
//             className="absolute inset-0 w-full h-full object-cover opacity-20"
//           />
//           <div className="relative z-10 p-12 text-center">
//             <FaCloudSun className="text-orange-400 text-4xl mx-auto mb-4" />
//             <h2 className="text-3xl font-bold mb-3">Ready to Explore Nepal's Tourism Data?</h2>
//             <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
//               Dive into 29 years of arrivals, seasonal patterns, and
//               SARIMAX-powered forecasts for 2025 and 2026.
//             </p>
//             <div className="flex flex-wrap gap-4 justify-center">
//               <Link to="/historical" className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
//                 Historical <RiArrowRightUpLongLine />
//               </Link>
//               <Link to="/forecast" className="border border-white/30 hover:border-orange-400 text-foreground font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2">
//                 Forecast <RiArrowRightUpLongLine />
//               </Link>
//               <Link to="/comparison" className="border border-white/30 hover:border-orange-400 text-foreground font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all">
//                 Comparison <RiArrowRightUpLongLine />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default NepalFlow;



import { Link } from "react-router-dom";
import { IoIosTimer, IoMdTrendingUp } from "react-icons/io";
import { BiBarChartAlt2 } from "react-icons/bi";
import { RiArrowRightUpLongLine } from "react-icons/ri";
import { FaMountain, FaCloudSun } from "react-icons/fa";

const STATS = [
    { label: "Years of Data", value: "29+" },
    { label: "Annual Arrivals 2024", value: "1.15M" },
    { label: "Forecast Horizon", value: "2026" },
    { label: "Model Accuracy", value: "86.25%" },
];

const MODULES = [
    {
        to: "/historical",
        icon: <IoIosTimer className="text-2xl" />,
        color: "bg-orange-300/20 text-orange-400",
        title: "Historical",
        desc: "Explore 29 years of Nepal tourism data from 1996 to 2024 with interactive charts and seasonal heatmaps.",
    },
    {
        to: "/forecast",
        icon: <IoMdTrendingUp className="text-2xl" />,
        color: "bg-green-300/20 text-green-400",
        title: "Forecast",
        desc: "View SARIMAX model predictions for 2025 and 2026 with 95% confidence intervals and crowd level labels.",
    },
    {
        to: "/comparison",
        icon: <BiBarChartAlt2 className="text-2xl" />,
        color: "bg-violet-300/20 text-violet-400",
        title: "Comparison",
        desc: "Compare historical arrivals with forecasted values to see how well the model tracks real tourism patterns.",
    },
];

const NEPAL_PLACES = [
    {
        url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800",
        name: "Boudhanath Stupa",
    },
    {
        url: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
        name: "Mount Everest",
    },
    {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        name: "Swayambhunath",
    },
    {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        name: "Phewa Lake Pokhara",
    },
    {
        url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800",
        name: "Annapurna Range",
    },
];

const NepalFlow = () => {
    return (
        <div className="bg-background text-foreground min-h-screen">

            {/* Hero Section */}
            <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">

                {/* Background image - Everest */}
                <img
                    src="/background.png"
                    alt="Mount Everest Nepal"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />

                {/* Hero content */}
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <div className="flex items-center justify-center gap-2 text-orange-400 text-xs uppercase tracking-widest mb-4">
                        <FaMountain />
                        <span>Nepal Tourism Intelligence</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                        Forecasting Visitor
                        <span className="text-orange-400"> Flows</span>
                        <br />for Nepal
                    </h1>
                    <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        NepalFlow combines 29 years of historical arrival data with a
                        SARIMAX forecasting model to deliver precise tourism volume
                        predictions for 2025 and 2026.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            to="/historical"
                            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl transition-all flex items-center gap-2"
                        >
                            Explore Data <RiArrowRightUpLongLine />
                        </Link>
                        <Link
                            to="/forecast"
                            className="border border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-all"
                        >
                            View Forecast
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS.map((s) => (
                        <div
                            key={s.label}
                            className="bg-background border border-gray-500/40 rounded-2xl p-6 text-center hover:border-orange-400/40 transition-all"
                        >
                            <div className="text-3xl font-bold text-orange-400 mb-1">{s.value}</div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nepal Places Photo Grid */}
            <div className="max-w-6xl mx-auto px-6 mt-20">
                <div className="text-center mb-10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Destination</p>
                    <h2 className="text-3xl md:text-4xl font-bold">The Land of Himalayas</h2>
                    <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                        From the peaks of Everest to the ancient stupas of Kathmandu,
                        Nepal attracts over a million visitors every year.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                    {/* Large left image - Boudhanath */}
                    <div className="md:row-span-2 rounded-2xl overflow-hidden h-64 md:h-auto relative group">
                        <img
                            src="/bouddha.png"

                            alt="Boudhanath Stupa"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <p className="text-white text-sm font-semibold">Boudhanath Stupa</p>
                            <p className="text-gray-300 text-xs">Kathmandu</p>
                        </div>
                    </div>

                    {/* Everest */}
                    <div className="rounded-2xl overflow-hidden h-48 relative group">
                        <img
                            src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800"
                            alt="Mount Everest"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-white text-sm font-semibold">Mount Everest</p>
                            <p className="text-gray-300 text-xs">Sagarmatha</p>
                        </div>
                    </div>

                    {/* Pokhara */}
                    <div className="rounded-2xl overflow-hidden h-48 relative group">
                        <img
                            src="\pokhara.png"
                            alt="Phewa Lake Pokhara"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-white text-sm font-semibold">Phewa Lake</p>
                            <p className="text-gray-300 text-xs">Pokhara</p>
                        </div>
                    </div>

                    {/* Lumbini */}
                    <div className="rounded-2xl overflow-hidden h-48 relative group">
                        <img
                            src="/lumbini.png"
                            alt="Swayambhunath"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-white text-sm font-semibold">Lumbini</p>
                            <p className="text-gray-300 text-xs">Birth place of Gautam Buddha</p>
                        </div>
                    </div>

                    {/* Lake*/}
                    <div className="rounded-2xl overflow-hidden h-48 relative group">
                        <img
                            src="\pachpokhari.png"
                            alt="Bhairav"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-white text-sm font-semibold">Pach Pokhari</p>
                            <p className="text-gray-300 text-xs">Pond</p>
                        </div>
                    </div>

                </div>
            </div>



            {/* Modules Section */}
            <div className="max-w-6xl mx-auto px-6 mt-20">
                <div className="text-center mb-10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Platform</p>
                    <h2 className="text-3xl md:text-4xl font-bold">Three Ways to Explore</h2>
                    <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                        Discover Nepal's tourism patterns through historical trends,
                        AI-powered forecasts, and side-by-side comparisons.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {MODULES.map((m) => (
                        <Link
                            key={m.title}
                            to={m.to}
                            className="border border-gray-500/40 rounded-2xl p-8 hover:border-orange-400/40 hover:scale-[1.02] transition-all duration-300 group"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${m.color}`}>
                                {m.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                                {m.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                            <div className="flex items-center gap-1 text-orange-400 text-sm mt-4 font-medium">
                                Explore <RiArrowRightUpLongLine />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>


            {/* Tourism Categories Section */}
            <div className="max-w-6xl mx-auto px-6 mt-20">
                <div className="text-center mb-10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tourism Types</p>
                    <h2 className="text-3xl md:text-4xl font-bold">Explore Nepal By Interest</h2>
                    <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                        Nepal offers diverse experiences for every type of traveller — from
                        high altitude adventures to ancient cultural heritage.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

                    {/* Mountain Trekking */}
                    <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
                            alt="Mountain Trekking Nepal"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <div className="w-10 h-10 rounded-xl bg-orange-400/20 border border-orange-400/40 flex items-center justify-center mb-3">
                                <span className="text-xl">🏔️</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">Mountain Trekking</h3>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                Everest Base Camp, Annapurna Circuit and Langtang Valley
                            </p>
                            <div className="mt-3 text-orange-400 text-xs font-semibold uppercase tracking-wider">
                                15% of all visits
                            </div>
                        </div>
                    </div>

                    {/* Cultural Tourism */}
                    <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
                        <img
                            src="/pashupatinath.png"
                            alt="Cultural Tourism Nepal"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center mb-3">
                                <span className="text-xl">🛕</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">Cultural Tourism</h3>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                Pashupatinath, Boudhanath, Swayambhunath and Patan Durbar Square
                            </p>
                            <div className="mt-3 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
                                Largest visitor category
                            </div>
                        </div>
                    </div>

                    {/* Wildlife Safari */}
                    <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
                        <img
                            src="/rhino.png"
                            alt="Wildlife Safari Nepal"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <div className="w-10 h-10 rounded-xl bg-green-400/20 border border-green-400/40 flex items-center justify-center mb-3">
                                <span className="text-xl">🦏</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">Wildlife Safari</h3>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                Chitwan and Bardia National Parks home to rhinos, tigers and elephants
                            </p>
                            <div className="mt-3 text-green-400 text-xs font-semibold uppercase tracking-wider">
                                UNESCO World Heritage
                            </div>
                        </div>
                    </div>

                    {/* Pilgrimage */}
                    <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
                        <img
                            src="/stupa.png"
                            alt="Pilgrimage Nepal"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <div className="w-10 h-10 rounded-xl bg-violet-400/20 border border-violet-400/40 flex items-center justify-center mb-3">
                                <span className="text-xl">🙏</span>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">Pilgrimage</h3>
                            <p className="text-gray-300 text-xs leading-relaxed">
                                Pathibhara, Muktinath and Pashupatinath Temple
                            </p>
                            <div className="mt-3 text-violet-400 text-xs font-semibold uppercase tracking-wider">
                                15% of all visits
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-6xl mx-auto px-6 mt-20 mb-10">
                <div className="relative rounded-2xl overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1600"
                        alt="Nepal"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="relative z-10 p-12 text-center">
                        <FaCloudSun className="text-orange-400 text-4xl mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-3 text-white">
                            Ready to Explore Nepal's Tourism Data?
                        </h2>
                        <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
                            Dive into 29 years of arrivals, seasonal patterns, and
                            SARIMAX-powered forecasts for 2025 and 2026.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/historical"
                                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
                            >
                                Historical <RiArrowRightUpLongLine />
                            </Link>
                            <Link
                                to="/forecast"
                                className="border border-white/40 hover:border-orange-400 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
                            >
                                Forecast <RiArrowRightUpLongLine />
                            </Link>
                            <Link
                                to="/comparison"
                                className="border border-white/40 hover:border-orange-400 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                            >
                                Comparison <RiArrowRightUpLongLine />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NepalFlow;