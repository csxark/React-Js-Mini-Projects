import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function CategoryBanner() {
  const categories = [
    {
      id: 1,
      name: 'Handloom Clothing',
      image: 'https://images.pexels.com/photos/9594167/pexels-photo-9594167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      slug: 'handloom',
    },
    {
      id: 2,
      name: 'Artisanal Jewelry',
      image: 'https://images.pexels.com/photos/12748086/pexels-photo-12748086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      slug: 'jewelry',
    },
    {
      id: 3,
      name: 'Home Textiles',
      image: 'https://images.pexels.com/photos/8082561/pexels-photo-8082561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      slug: 'home',
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Explore our unique collections of handcrafted products across different categories.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <Link to={`/products?category=${category.slug}`}>
                <div className="aspect-w-3 aspect-h-4 relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-serif text-2xl font-bold">{category.name}</h3>
                      <p className="text-white/80 mt-2 font-medium">Shop Collection</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryBanner