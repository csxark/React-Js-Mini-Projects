import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Announcement from './Announcement'
import { motion } from 'framer-motion'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Announcement message="Free shipping on orders above ₹1999 | Use code INDIE100 for 10% off your first order" />
      <Header />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout