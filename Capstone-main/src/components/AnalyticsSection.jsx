import React from "react";

const AnalyticsSection = () => {
  // Define features data parsed directly from the mockup image
  const features = [
    {
      title: "Historical Data",
      description: "Track Visitor Trends Over the Years",
      // Placeholder illustration element or emoji/icon wrapper
      image: "logo.png",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      title: "Predictive Tools",
      description: "Forecast Future Arrivals",
      image: "logo.png",
      bgColor: "from-sky-50 to-emerald-50",
    },
    {
      title: "Interactive Maps",
      description: "Visualize Regional Tourism Flow",
      image: "logo.png",
      bgColor: "from-teal-50 to-emerald-50",
    },
  ];

  return (
    <section className="w-full py-16 px-6 md:px-16 bg-slate-200 relative overflow-hidden">
      {/* Subtle faint mountain background opacity trick to match image aesthetics */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('nflow.jpg')" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="hidden md:block h-[1px] flex-grow bg-slate-300 max-w-xs"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] text-center tracking-wide">
            Tourism Analytics & Forecasting
          </h2>
          <div className="hidden md:block h-[1px] flex-grow bg-slate-300 max-w-xs"></div>
        </div>

        {/* --- FEATURES GRID MAPPED --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-pointer transform hover:-translate-y-1"
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              {/* Subtitle / Description */}
              <p className="text-sm text-slate-500 font-medium mb-6">
                {feature.description}
              </p>

              {/* --- IMAGE / ILLUSTRATION PLACEHOLDER AREA --- */}
              {/* This mimics the layout box containing the charts/graphics from the user's mockup image */}
              <div
                className={`w-full h-48 rounded-xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center border border-slate-50 shadow-inner overflow-hidden relative`}
              >
                {/* Graphics Mockup Core (Replace with actual <img> or Charts if required) */}
                <span className="text-5xl filter drop-shadow opacity-80 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>

                {/* Simulated Chart Bars/Lines decoration */}
                <div className="absolute bottom-2 left-0 right-0 h-2 px-4 flex items-end gap-1 justify-center opacity-30">
                  <div className="w-full h-8 bg-blue-500 rounded-t-sm"></div>
                  <div className="w-full h-12 bg-blue-500 rounded-t-sm"></div>
                  <div className="w-full h-16 bg-blue-500 rounded-t-sm"></div>
                  <div className="w-full h-24 bg-blue-500 rounded-t-sm"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
