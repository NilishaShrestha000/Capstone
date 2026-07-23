// import { Link } from "react-router-dom";
// import { IoIosTimer, IoMdTrendingUp } from "react-icons/io";
// import { BiBarChartAlt2 } from "react-icons/bi";
// import { RiArrowRightUpLongLine } from "react-icons/ri";
// import { FaMountain, FaCloudSun } from "react-icons/fa";

// const STATS = [
//     { label: "Years of Data", value: "29+" },
//     { label: "Annual Arrivals 2024", value: "1.15M" },
//     { label: "Forecast Horizon", value: "2026" },
//     { label: "Model Accuracy", value: "86.25%" },
// ];

// const MODULES = [
//     {
//         to: "/historical",
//         icon: <IoIosTimer className="text-2xl" />,
//         color: "bg-orange-300/20 text-orange-400",
//         title: "Historical",
//         desc: "Explore 29 years of Nepal tourism data from 1996 to 2024 with interactive charts and seasonal heatmaps.",
//     },
//     {
//         to: "/forecast",
//         icon: <IoMdTrendingUp className="text-2xl" />,
//         color: "bg-green-300/20 text-green-400",
//         title: "Forecast",
//         desc: "View SARIMAX model predictions for 2025 and 2026 with 95% confidence intervals and crowd level labels.",
//     },
//     {
//         to: "/comparison",
//         icon: <BiBarChartAlt2 className="text-2xl" />,
//         color: "bg-violet-300/20 text-violet-400",
//         title: "Comparison",
//         desc: "Compare historical arrivals with forecasted values to see how well the model tracks real tourism patterns.",
//     },
// ];

// const NEPAL_PLACES = [
//     {
//         url: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800",
//         name: "Boudhanath Stupa",
//     },
//     {
//         url: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800",
//         name: "Mount Everest",
//     },
//     {
//         url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
//         name: "Swayambhunath",
//     },
//     {
//         url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
//         name: "Phewa Lake Pokhara",
//     },
//     {
//         url: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800",
//         name: "Annapurna Range",
//     },
// ];

// const NepalFlow = () => {
//     return (
//         <div className="bg-background text-foreground min-h-screen">

//             {/* Hero Section */}
//             <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">

//                 {/* Background image - Everest */}
//                 <img
//                     src="/background.png"
//                     alt="Mount Everest Nepal"
//                     className="absolute inset-0 w-full h-full object-cover opacity-60"
//                 />

//                 {/* Gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />

//                 {/* Hero content */}
//                 <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
//                     <div className="flex items-center justify-center gap-2 text-orange-400 text-xs uppercase tracking-widest mb-4">
//                         <FaMountain />
//                         <span>Nepal Tourism Intelligence</span>
//                     </div>
//                     <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
//                         Forecasting Visitor
//                         <span className="text-orange-400"> Flows</span>
//                         <br />for Nepal
//                     </h1>
//                     <p className="text-gray-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
//                         NepalFlow combines 29 years of historical arrival data with a
//                         SARIMAX forecasting model to deliver precise tourism volume
//                         predictions for 2025 and 2026.
//                     </p>
//                     <div className="flex flex-wrap gap-4 justify-center">
//                         <Link
//                             to="/historical"
//                             className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl transition-all flex items-center gap-2"
//                         >
//                             Explore Data <RiArrowRightUpLongLine />
//                         </Link>
//                         <Link
//                             to="/forecast"
//                             className="border border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-all"
//                         >
//                             View Forecast
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Stats Section */}
//             <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {STATS.map((s) => (
//                         <div
//                             key={s.label}
//                             className="bg-background border border-gray-500/40 rounded-2xl p-6 text-center hover:border-orange-400/40 transition-all"
//                         >
//                             <div className="text-3xl font-bold text-orange-400 mb-1">{s.value}</div>
//                             <div className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Nepal Places Photo Grid */}
//             <div className="max-w-6xl mx-auto px-6 mt-20">
//                 <div className="text-center mb-10">
//                     <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Destination</p>
//                     <h2 className="text-3xl md:text-4xl font-bold">The Land of Himalayas</h2>
//                     <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
//                         From the peaks of Everest to the ancient stupas of Kathmandu,
//                         Nepal attracts over a million visitors every year.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

//                     {/* Large left image - Boudhanath */}
//                     <div className="md:row-span-2 rounded-2xl overflow-hidden h-64 md:h-auto relative group">
//                         <img
//                             src="/bouddha.png"

//                             alt="Boudhanath Stupa"
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
//                             <p className="text-white text-sm font-semibold">Boudhanath Stupa</p>
//                             <p className="text-gray-300 text-xs">Kathmandu</p>
//                         </div>
//                     </div>

//                     {/* Everest */}
//                     <div className="rounded-2xl overflow-hidden h-48 relative group">
//                         <img
//                             src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800"
//                             alt="Mount Everest"
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
//                             <p className="text-white text-sm font-semibold">Mount Everest</p>
//                             <p className="text-gray-300 text-xs">Sagarmatha</p>
//                         </div>
//                     </div>

//                     {/* Pokhara */}
//                     <div className="rounded-2xl overflow-hidden h-48 relative group">
//                         <img
//                             src="\pokhara.png"
//                             alt="Phewa Lake Pokhara"
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
//                             <p className="text-white text-sm font-semibold">Phewa Lake</p>
//                             <p className="text-gray-300 text-xs">Pokhara</p>
//                         </div>
//                     </div>

//                     {/* Lumbini */}
//                     <div className="rounded-2xl overflow-hidden h-48 relative group">
//                         <img
//                             src="/lumbini.png"
//                             alt="Swayambhunath"
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
//                             <p className="text-white text-sm font-semibold">Lumbini</p>
//                             <p className="text-gray-300 text-xs">Birth place of Gautam Buddha</p>
//                         </div>
//                     </div>

//                     {/* Lake*/}
//                     <div className="rounded-2xl overflow-hidden h-48 relative group">
//                         <img
//                             src="\pachpokhari.png"
//                             alt="Bhairav"
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                         />
//                         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
//                             <p className="text-white text-sm font-semibold">Pach Pokhari</p>
//                             <p className="text-gray-300 text-xs">Pond</p>
//                         </div>
//                     </div>

//                 </div>
//             </div>



//             {/* Modules Section */}
//             <div className="max-w-6xl mx-auto px-6 mt-20">
//                 <div className="text-center mb-10">
//                     <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Platform</p>
//                     <h2 className="text-3xl md:text-4xl font-bold">Three Ways to Explore</h2>
//                     <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
//                         Discover Nepal's tourism patterns through historical trends,
//                         AI-powered forecasts, and side-by-side comparisons.
//                     </p>
//                 </div>


//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     {MODULES.map((m) => (
//                         <Link
//                             key={m.title}
//                             to={m.to}
//                             className="border border-gray-500/40 rounded-2xl p-8 hover:border-orange-400/40 hover:scale-[1.02] transition-all duration-300 group"
//                         >
//                             <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${m.color}`}>
//                                 {m.icon}
//                             </div>
//                             <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
//                                 {m.title}
//                             </h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
//                             <div className="flex items-center gap-1 text-orange-400 text-sm mt-4 font-medium">
//                                 Explore <RiArrowRightUpLongLine />
//                             </div>
//                         </Link>
//                     ))}
//                 </div>
//             </div>


//             {/* Tourism Categories Section */}
//             <div className="max-w-6xl mx-auto px-6 mt-20">
//                 <div className="text-center mb-10">
//                     <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Tourism Types</p>
//                     <h2 className="text-3xl md:text-4xl font-bold">Explore Nepal By Interest</h2>
//                     <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
//                         Nepal offers diverse experiences for every type of traveller — from
//                         high altitude adventures to ancient cultural heritage.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

//                     {/* Mountain Trekking */}
//                     <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
//                         <img
//                             src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
//                             alt="Mountain Trekking Nepal"
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                         <div className="absolute bottom-0 left-0 right-0 p-5">
//                             <div className="w-10 h-10 rounded-xl bg-orange-400/20 border border-orange-400/40 flex items-center justify-center mb-3">
//                                 <span className="text-xl">🏔️</span>
//                             </div>
//                             <h3 className="text-white font-bold text-lg mb-1">Mountain Trekking</h3>
//                             <p className="text-gray-300 text-xs leading-relaxed">
//                                 Everest Base Camp, Annapurna Circuit and Langtang Valley
//                             </p>
//                             <div className="mt-3 text-orange-400 text-xs font-semibold uppercase tracking-wider">
//                                 15% of all visits
//                             </div>
//                         </div>
//                     </div>

//                     {/* Cultural Tourism */}
//                     <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
//                         <img
//                             src="/pashupatinath.png"
//                             alt="Cultural Tourism Nepal"
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                         <div className="absolute bottom-0 left-0 right-0 p-5">
//                             <div className="w-10 h-10 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center mb-3">
//                                 <span className="text-xl">🛕</span>
//                             </div>
//                             <h3 className="text-white font-bold text-lg mb-1">Cultural Tourism</h3>
//                             <p className="text-gray-300 text-xs leading-relaxed">
//                                 Pashupatinath, Boudhanath, Swayambhunath and Patan Durbar Square
//                             </p>
//                             <div className="mt-3 text-yellow-400 text-xs font-semibold uppercase tracking-wider">
//                                 Largest visitor category
//                             </div>
//                         </div>
//                     </div>

//                     {/* Wildlife Safari */}
//                     <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
//                         <img
//                             src="/rhino.png"
//                             alt="Wildlife Safari Nepal"
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                         <div className="absolute bottom-0 left-0 right-0 p-5">
//                             <div className="w-10 h-10 rounded-xl bg-green-400/20 border border-green-400/40 flex items-center justify-center mb-3">
//                                 <span className="text-xl">🦏</span>
//                             </div>
//                             <h3 className="text-white font-bold text-lg mb-1">Wildlife Safari</h3>
//                             <p className="text-gray-300 text-xs leading-relaxed">
//                                 Chitwan and Bardia National Parks home to rhinos, tigers and elephants
//                             </p>
//                             <div className="mt-3 text-green-400 text-xs font-semibold uppercase tracking-wider">
//                                 UNESCO World Heritage
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pilgrimage */}
//                     <div className="relative rounded-2xl overflow-hidden h-80 group cursor-pointer">
//                         <img
//                             src="/stupa.png"
//                             alt="Pilgrimage Nepal"
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
//                         <div className="absolute bottom-0 left-0 right-0 p-5">
//                             <div className="w-10 h-10 rounded-xl bg-violet-400/20 border border-violet-400/40 flex items-center justify-center mb-3">
//                                 <span className="text-xl">🙏</span>
//                             </div>
//                             <h3 className="text-white font-bold text-lg mb-1">Pilgrimage</h3>
//                             <p className="text-gray-300 text-xs leading-relaxed">
//                                 Pathibhara, Muktinath and Pashupatinath Temple
//                             </p>
//                             <div className="mt-3 text-violet-400 text-xs font-semibold uppercase tracking-wider">
//                                 15% of all visits
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>

//             {/* CTA Section */}
//             <div className="max-w-6xl mx-auto px-6 mt-20 mb-10">
//                 <div className="relative rounded-2xl overflow-hidden">
//                     <img
//                         src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1600"
//                         alt="Nepal"
//                         className="absolute inset-0 w-full h-full object-cover opacity-40"
//                     />
//                     <div className="absolute inset-0 bg-black/50" />
//                     <div className="relative z-10 p-12 text-center">
//                         <FaCloudSun className="text-orange-400 text-4xl mx-auto mb-4" />
//                         <h2 className="text-3xl font-bold mb-3 text-white">
//                             Ready to Explore Nepal's Tourism Data?
//                         </h2>
//                         <p className="text-gray-300 text-sm mb-6 max-w-lg mx-auto">
//                             Dive into 29 years of arrivals, seasonal patterns, and
//                             SARIMAX-powered forecasts for 2025 and 2026.
//                         </p>
//                         <div className="flex flex-wrap gap-4 justify-center">
//                             <Link
//                                 to="/historical"
//                                 className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
//                             >
//                                 Historical <RiArrowRightUpLongLine />
//                             </Link>
//                             <Link
//                                 to="/forecast"
//                                 className="border border-white/40 hover:border-orange-400 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
//                             >
//                                 Forecast <RiArrowRightUpLongLine />
//                             </Link>
//                             <Link
//                                 to="/comparison"
//                                 className="border border-white/40 hover:border-orange-400 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
//                             >
//                                 Comparison <RiArrowRightUpLongLine />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
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
                    src={`${import.meta.env.BASE_URL}background.png`}
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
                            src={`${import.meta.env.BASE_URL}bouddha.png`}
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
                            src={`${import.meta.env.BASE_URL}pokhara.png`}
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
                            src={`${import.meta.env.BASE_URL}lumbini.png`}
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
                            src={`${import.meta.env.BASE_URL}pachpokhari.png`}
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
                            src={`${import.meta.env.BASE_URL}pashupatinath.png`}
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
                            src={`${import.meta.env.BASE_URL}rhino.png`}
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
                            src={`${import.meta.env.BASE_URL}stupa.png`}
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