import { motion } from 'framer-motion'

function BrandStory() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-600 rounded-full text-sm font-medium mb-4">
              Our Story
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Celebrating India's Rich <span className="text-primary-500">Artisanal Heritage</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At IndieBazaar, we're dedicated to preserving and promoting the rich artisanal heritage of India by connecting conscious consumers directly with talented indie designers and craftspeople.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every product tells a story - of ancient techniques passed down through generations, of sustainable practices that honor both tradition and our planet, and of artisans who pour their heart and soul into each creation.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex -space-x-2">
                <img 
                  src="https://images.pexels.com/photos/8141577/pexels-photo-8141577.jpeg?auto=compress&cs=tinysrgb&w=120" 
                  alt="Artisan" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.pexels.com/photos/2553369/pexels-photo-2553369.jpeg?auto=compress&cs=tinysrgb&w=120" 
                  alt="Artisan" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <img 
                  src="https://images.pexels.com/photos/6045028/pexels-photo-6045028.jpeg?auto=compress&cs=tinysrgb&w=120" 
                  alt="Artisan" 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </div>
              <p className="text-sm text-gray-600">Supporting over 100+ artisans across India</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1561011/pexels-photo-1561011.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Artisan handcrafting a piece"
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/6045020/pexels-photo-6045020.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Weaving process"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/7789882/pexels-photo-7789882.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Finished handcrafted product"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory