export const HeroSection = () => (
  <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 animate-fade-in">
    <div className="container mx-auto px-4 py-16 md:py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-orange-800 mb-6 leading-tight animate-slide-down">
          Professional Services<br className="hidden md:block" />
          <span className="text-orange-600">at Your Doorstep</span>
        </h1>
        <p className="text-lg md:text-xl text-orange-700 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up">
          Find trusted professionals for all your home service needs. Quality service guaranteed, available 24/7.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
          <button className="w-full sm:w-auto bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Book Now
          </button>
          <button className="w-full sm:w-auto border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-50 to-transparent"></div>
  </section>
);

export default HeroSection;