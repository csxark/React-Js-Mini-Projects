import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function Announcement({ message }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-secondary-500 text-white py-2"
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-center text-sm font-medium mx-auto">
              {message}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Close announcement"
            >
              <FiX size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Announcement