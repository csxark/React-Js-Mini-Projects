import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faShieldAlt, faTools, faStar, faHandshake } from '@fortawesome/free-solid-svg-icons';

export const WhyChooseUs = () => {
    const features = [
      {
        icon: faCheckCircle,
        title: 'Verified Professionals',
        text: 'Our rigorous vetting process ensures you get only the most qualified and trustworthy professionals. Each service provider undergoes thorough background checks and skill assessments.'
      },
      {
        icon: faClock,
        title: '24/7 Service',
        text: "We understand emergencies don't wait for business hours. Our dedicated team is available round the clock to provide immediate assistance when you need it most."
      },
      {
        icon: faShieldAlt,
        title: 'Guaranteed Service',
        text: 'Your satisfaction is our priority. We back every service with a 100% satisfaction guarantee, ensuring peace of mind and quality results every time.'
      },
      {
        icon: faTools,
        title: 'Expert Solutions',
        text: 'From simple fixes to complex projects, our professionals bring years of expertise and the latest tools to deliver exceptional results that exceed expectations.'
      },
      {
        icon: faStar,
        title: 'Competitive Pricing',
        text: 'Enjoy premium services at reasonable rates. We maintain transparent pricing with no hidden costs, providing excellent value for your investment.'
      },
      {
        icon: faHandshake,
        title: 'Customer-First Approach',
        text: 'We prioritize your needs and preferences, ensuring a seamless experience from booking to completion. Our friendly support team is always ready to assist.'
      }
    ];
  
    return (
      <section className="py-16 bg-orange-50 animate-zoom-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-orange-800">Why Choose Us</h2>
          <p className="text-center text-orange-600 mb-12 max-w-2xl mx-auto">
            Discover the difference that comes with choosing a service provider committed to excellence, reliability, and customer satisfaction.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                    <FontAwesomeIcon 
                      icon={feature.icon} 
                      className="text-3xl text-orange-500 group-hover:text-orange-600"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-orange-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default WhyChooseUs;