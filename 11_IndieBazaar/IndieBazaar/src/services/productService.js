// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Hand-Block Printed Cotton Saree",
    price: 4500,
    originalPrice: 5200,
    description: "Elegantly crafted cotton saree featuring traditional hand-block printing techniques from Rajasthan.",
    brand: "Kutch Crafts",
    image: "https://images.pexels.com/photos/10515828/pexels-photo-10515828.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["handcrafted", "sustainable"],
    category: "clothing",
    inStock: true
  },
  {
    id: 2,
    name: "Handwoven Ikat Cotton Kurta",
    price: 2800,
    description: "A stunning men's kurta crafted from handwoven ikat cotton from Pochampally.",
    brand: "Pochampally Weavers",
    image: "https://images.pexels.com/photos/5865223/pexels-photo-5865223.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["handcrafted", "new"],
    category: "clothing",
    inStock: true
  },
  {
    id: 3,
    name: "Beaded Tribal Necklace",
    price: 3200,
    originalPrice: 3800,
    description: "Stunning hand-beaded necklace inspired by traditional Nagaland tribal jewelry.",
    brand: "Nagaland Artisans",
    image: "https://images.pexels.com/photos/12020879/pexels-photo-12020879.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["handcrafted", "sustainable"],
    category: "accessories",
    inStock: true
  },
  {
    id: 4,
    name: "Hand-Embroidered Cushion Cover",
    price: 1850,
    description: "Exquisite cushion cover featuring traditional Kantha embroidery from West Bengal.",
    brand: "Bengal Home",
    image: "https://images.pexels.com/photos/1420904/pexels-photo-1420904.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["handcrafted", "sustainable"],
    category: "home",
    inStock: true
  },
  {
    id: 5,
    name: "Handcrafted Dhokra Brass Figurine",
    price: 3650,
    description: "Traditional Dhokra brass figurine handcrafted using the ancient lost-wax casting technique.",
    brand: "Bastar Art",
    image: "https://images.pexels.com/photos/10982647/pexels-photo-10982647.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["handcrafted", "new"],
    category: "home",
    inStock: true
  },
  {
    id: 6,
    name: "Organic Indigo Dyed Scarf",
    price: 1950,
    originalPrice: 2400,
    description: "Luxurious hand-spun cotton scarf naturally dyed with organic indigo.",
    brand: "Indigo Tales",
    image: "https://images.pexels.com/photos/12459312/pexels-photo-12459312.jpeg?auto=compress&cs=tinysrgb&w=600",
    tags: ["handcrafted", "sustainable"],
    category: "accessories",
    inStock: true
  }
];

// Simulate API calls with delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all products with optional filtering
export const fetchProducts = async (filters = {}) => {
  await delay(800); // Simulate network delay
  
  let filteredProducts = [...PRODUCTS];
  
  // Apply filters
  if (filters.category) {
    filteredProducts = filteredProducts.filter(p => p.category === filters.category);
  }
  
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters.minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
  }
  
  return filteredProducts;
}

// Get a single product by ID
export const fetchProductById = async (id) => {
  await delay(500); // Simulate network delay
  return PRODUCTS.find(p => p.id === id);
}

// Get featured products
export const fetchFeaturedProducts = async () => {
  await delay(800); // Simulate network delay
  return PRODUCTS.filter(p => p.tags.includes('new')).slice(0, 4);
}