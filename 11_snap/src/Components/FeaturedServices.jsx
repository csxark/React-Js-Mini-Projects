import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faBroom, faWrench } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css';
import 'swiper/css/pagination';

export const FeaturedServices = () => {
  const services = [
    { 
      icon: faHammer, 
      title: 'Carpentry',
      description: 'Professional carpentry services including furniture repair, installation, and custom woodworking solutions.'
    },
    { 
      icon: faBroom, 
      title: 'House Keeping',
      description: 'Comprehensive cleaning and organizing services to keep your space spotless and well-maintained.'
    },
    { 
      icon: faWrench, 
      title: 'Maintenance',
      description: 'General maintenance and repair services for all your household needs and fixtures.'
    }
  ];

  return (
    <section className="py-16 bg-orange-50 animate-zoom-in">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-800">Featured Services</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="relative group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl min-h-[300px] md:min-h-[350px] w-full">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:transform group-hover:scale-95">
                  <FontAwesomeIcon 
                    icon={service.icon} 
                    className="text-orange-500 text-5xl md:text-6xl mb-4 transition-colors group-hover:text-orange-600"
                  />
                  <h3 className="text-xl md:text-2xl font-semibold text-orange-800 mb-2 text-center">{service.title}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-white font-semibold text-xl md:text-2xl mb-3 text-center">{service.title}</h3>
                  <p className="text-white text-center text-sm md:text-base">{service.description}</p>
                  <button className="mt-4 bg-white text-orange-600 px-6 py-2 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedServices;