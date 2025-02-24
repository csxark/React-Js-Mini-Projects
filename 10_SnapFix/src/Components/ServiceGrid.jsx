export const ServicesGrid = () => {
    const services = [
      { icon: 'fa-hammer', title: 'Carpenter', description: 'Expert carpentry services for your home' },
      { icon: 'fa-bolt', title: 'Electrician', description: 'Professional electrical repairs and installations' },
      { icon: 'fa-wrench', title: 'Plumber', description: 'Quick and reliable plumbing solutions' },
      { icon: 'fa-paint-roller', title: 'Painter', description: 'Transform your space with our painting services' },
    ];
  
    return (
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="relative mb-4">
                <img 
                  src="placeholder.jpg" 
                  data-src="actual-image.jpg" 
                  alt="Service" 
                  className="lazy-load w-full h-48 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className={`fas ${service.icon} text-4xl text-blue-500`}></i>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">
                Book Now →
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  };
  