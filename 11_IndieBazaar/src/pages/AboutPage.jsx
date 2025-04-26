import { motion } from 'framer-motion'

function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-secondary-500 opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                We're on a mission to preserve India's rich artisanal heritage by bridging the gap between talented craftspeople and conscious consumers worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Empowering Artisans Through Sustainable Fashion
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At IndieBazaar, we believe that fashion should not come at the expense of people or the planet. We're committed to promoting slow fashion principles and supporting the livelihoods of traditional craftspeople across India.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                By connecting these skilled artisans directly with conscious consumers, we're helping preserve ancient techniques that might otherwise be lost to mass production, while ensuring fair compensation for their remarkable work.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every purchase from IndieBazaar helps sustain these traditions and supports rural communities where these crafts originate.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl overflow-hidden"
            >
              <img
                src="https://images.pexels.com/photos/2566810/pexels-photo-2566810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Artisans working on traditional textiles"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Principles That Guide Us
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our business is built on core values that shape everything we do, from selecting our artisan partners to packaging our products.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: "Transparency",
                description: "We document our supply chain from start to finish, ensuring clarity in how our products are made and who makes them."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                ),
                title: "Fair Trade",
                description: "We ensure artisans receive fair compensation for their work, well above industry averages, to support sustainable livelihoods."
              },
              {
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Sustainability",
                description: "Every product and process is designed with environmental consciousness, from organic materials to biodegradable packaging."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm"
              >
                <div className="text-primary-500 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-600 rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Meet the People Behind IndieBazaar
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our diverse team brings together expertise in fashion, sustainability, and social enterprise to create a platform that honors craftsmanship.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Founder & CEO",
                bio: "With a background in sustainable fashion and a family history in textiles, Priya founded IndieBazaar to bridge the gap between traditional craftsmanship and modern consumers.",
                image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                name: "Arjun Mehta",
                role: "Creative Director",
                bio: "A design graduate with a passion for reviving traditional motifs in contemporary contexts, Arjun works directly with artisans to develop exclusive collections.",
                image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                name: "Leela Reddy",
                role: "Artisan Relations",
                bio: "With over 15 years of experience working with craft communities across India, Leela ensures fair partnerships and authentic representation of artisan stories.",
                image: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mx-auto w-48 h-48 rounded-full overflow-hidden mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-500 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 px-4">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-16 md:py-24 bg-primary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Join Our Movement for Sustainable Fashion
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Together, we can preserve traditional craftsmanship, support artisanal communities, and promote conscious consumption.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="btn bg-white text-primary-600 hover:bg-white/90 active:bg-white/80 px-8 py-3 text-base"
                >
                  Shop Our Collections
                </a>
                <a
                  href="/sustainability"
                  className="btn bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 text-base"
                >
                  Learn About Our Impact
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage