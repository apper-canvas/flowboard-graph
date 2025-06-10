import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <ApperIcon name="FileQuestion" className="w-24 h-24 text-surface-300 mx-auto" />
        </motion.div>
        <h1 className="text-4xl font-heading font-bold text-surface-900 mt-6">404</h1>
        <h2 className="text-xl font-medium text-surface-700 mt-2">Page Not Found</h2>
        <p className="text-surface-500 mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Link
            to="/board"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Board</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound