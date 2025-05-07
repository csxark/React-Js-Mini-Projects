import { motion } from 'framer-motion'

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <motion.div
          className="w-16 h-16 border-4 border-t-4 border-primary-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="mt-4 font-serif text-xl text-primary-500">Loading IndieBazaar...</p>
      </div>
    </div>
  )
}

export default Loader