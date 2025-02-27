import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export const Testimonials = () => {
    const testimonials = [
      {
        name: 'John Doe',
        role: 'Homeowner',
        text: 'Excellent service! The professional arrived on time and completed the work with great attention to detail. Would definitely recommend their services.',
        rating: 5,
        image: '/avatar1.jpg' // Add avatar images to your public folder
      },
      {
        name: 'Jane Smith',
        role: 'Business Owner',
        text: 'Reliable, professional and efficient. The team went above and beyond to ensure everything was perfect. Outstanding service quality!',
        rating: 5,
        image: '/avatar2.jpg'
      },
      {
        name: 'Mike Johnson',
        role: 'Property Manager',
        text: 'Consistently excellent service. Their professionals are knowledgeable, courteous, and always deliver quality results. A trusted service provider.',
        rating: 5,
        image: '/avatar3.jpg'
      }
    ];
  
    return (
      <section className="py-16 bg-orange-50 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-orange-800">
            What Our Customers Say
          </h2>
          <p className="text-center text-orange-600 mb-12 max-w-2xl mx-auto">
            Read about the experiences of our satisfied customers and their journey with our services
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-200 mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=FB923C&color=fff`;
                      }}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-orange-800">{testimonial.name}</h4>
                    <p className="text-orange-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 flex-grow italic">"{testimonial.text}"</p>
                <div className="flex text-orange-400 justify-start">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FontAwesomeIcon 
                      key={i} 
                      icon={faStar} 
                      className="mr-1"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default Testimonials;