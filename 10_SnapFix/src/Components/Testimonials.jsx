export const Testimonials = () => {
    const testimonials = [
      {
        name: 'John Doe',
        role: 'Homeowner',
        text: 'Excellent service! The electrician arrived on time and fixed the issue quickly.',
        rating: 5
      },
      {
        name: 'Jane Smith',
        role: 'Business Owner',
        text: 'Reliable and professional. Highly recommended for any plumbing needs.',
        rating: 4
      }
      // Add more testimonials
    ];
  
    return (
      <section className="py-16 bg-gray-50 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-xl shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };