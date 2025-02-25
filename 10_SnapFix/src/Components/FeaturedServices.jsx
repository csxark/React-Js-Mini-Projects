import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export const FeaturedServices = () => {
  return (
    <section className="py-16 bg-gray-50 animate-zoom-in">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Services</h2>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {[1, 2, 3].map((item) => (
            <SwiperSlide key={item}>
              <div className="relative group overflow-hidden rounded-xl">
                <img 
                  src={`/featured-service${item}.jpg`} 
                  alt={`Featured Service ${item}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold">
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