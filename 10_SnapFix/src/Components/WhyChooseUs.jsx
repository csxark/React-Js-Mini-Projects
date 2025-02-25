export const WhyChooseUs = () => {
    const features = [
      {
        icon: 'fa-check-circle',
        title: 'Verified Professionals',
        text: 'All our service providers are thoroughly vetted'
      },
      {
        icon: 'fa-clock',
        title: '24/7 Service',
        text: 'Available round the clock for emergencies'
      },
      {
        icon: 'fa-shield-alt',
        title: 'Guaranteed Service',
        text: '100% satisfaction guaranteed'
      }
    ];
  
    return (
      <section className="py-16 bg-white animate-zoom-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <i className={`fas ${feature.icon} text-4xl text-blue-500 mb-4`}></i>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default WhyChooseUs; 