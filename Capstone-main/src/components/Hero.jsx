const Hero = () => {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col justify-center items-start px-6 md:px-24 text-white select-none"
      style={{
        // Referencing the background image structure from image_f39b92.jpg
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)), url('nepalflow.png')`,
      }}
    >
      <div className="max-w-4xl mt-16">
        {" "}
        {/* Margin top accounts for the absolute navbar overlay */}
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md mb-4 leading-tight">
          Explore Nepal’s Tourism Trends
        </h1>
        {/* Subtitle description */}
        <p className="text-lg md:text-2xl font-bold opacity-max drop-shadow mb-8 max-w-2xl text-amber-50">
          Analyze past data & forecast future tourism.
        </p>
        {/* Call to Action (CTA) Button */}
        <button className="px-8 py-3.5 bg-[#e65c00] hover:bg-[#cc5200] text-white font-bold text-lg rounded-xl shadow-lg transform active:scale-95 transition-all duration-200 ease-in-out">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
