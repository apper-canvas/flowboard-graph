import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';

const NotFoundPage = () => {
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
        <Heading level={1} className="mt-6">404</Heading>
        <Heading level={2} className="mt-2">Page Not Found</Heading>
        <Paragraph className="mt-4 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </Paragraph>
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
  );
};

export default NotFoundPage;