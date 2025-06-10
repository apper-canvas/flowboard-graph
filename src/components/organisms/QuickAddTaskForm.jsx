import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const QuickAddTaskForm = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await onSave({
        title: title.trim(),
        description: '',
        priority: 'medium',
        assigneeIds: []
      });
      setTitle(''); // Clear input on successful save
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-lg border border-surface-200 shadow-sm p-3"
    >
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter task title..."
          className="w-full text-sm border-none outline-none resize-none placeholder-surface-400"
          inputClassName="px-0 py-0" // override default input padding
          autoFocus
          disabled={isLoading}
        />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-surface-100">
          <div className="flex space-x-1">
            <Button
              type="button"
              className="p-1 text-surface-400 hover:text-surface-600 transition-colors duration-200"
              title="Set priority"
            >
              <ApperIcon name="Flag" className="w-3 h-3" />
            </Button>
            <Button
              type="button"
              className="p-1 text-surface-400 hover:text-surface-600 transition-colors duration-200"
              title="Set due date"
            >
              <ApperIcon name="Calendar" className="w-3 h-3" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="px-2 py-1 text-xs text-surface-500 hover:text-surface-700 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!title.trim() || isLoading}
              className="px-3 py-1 bg-primary text-white text-xs rounded font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default QuickAddTaskForm;