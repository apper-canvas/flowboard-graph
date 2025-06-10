import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Select from '@/components/atoms/Select';
import FilterChip from '@/components/molecules/FilterChip';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';

const FilterBar = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({
      assignee: '',
      priority: '',
      dueDate: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value);

  return (
    <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-surface-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Filter" className="w-4 h-4 text-surface-500" />
          <Paragraph className="text-sm font-medium text-surface-700 mb-0">Filters:</Paragraph>
        </div>

        {/* Priority Filter */}
        <Select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="px-3 py-1.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-secondary bg-white"
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </Select>

        {/* Due Date Filter */}
        <Select
          value={filters.dueDate}
          onChange={(e) => handleFilterChange('dueDate', e.target.value)}
          className="px-3 py-1.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-secondary bg-white"
        >
          <option value="">All Due Dates</option>
          <option value="overdue">Overdue</option>
          <option value="today">Due Today</option>
          <option value="tomorrow">Due Tomorrow</option>
          <option value="week">Due This Week</option>
        </Select>

        {/* Assignee Filter */}
        <Select
          value={filters.assignee}
          onChange={(e) => handleFilterChange('assignee', e.target.value)}
          className="px-3 py-1.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-secondary bg-white"
        >
          <option value="">All Assignees</option>
          <option value="user1">John Smith</option>
          <option value="user2">Sarah Johnson</option>
          <option value="user3">Mike Chen</option>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-surface-600 hover:text-surface-800 transition-colors duration-200"
          >
            <ApperIcon name="X" className="w-3 h-3" />
            <span>Clear</span>
          </Button>
        )}
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <AnimatePresence>
          <div className="flex flex-wrap gap-2 mt-2">
            {filters.priority && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <FilterChip
                  label="Priority"
                  value={filters.priority}
                  onClear={() => handleFilterChange('priority', '')}
                  bgColor="bg-purple-100"
                  textColor="text-purple-800"
                />
              </motion.div>
            )}
            {filters.dueDate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <FilterChip
                  label="Due"
                  value={filters.dueDate}
                  onClear={() => handleFilterChange('dueDate', '')}
                  bgColor="bg-blue-100"
                  textColor="text-blue-800"
                />
              </motion.div>
            )}
            {filters.assignee && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <FilterChip
                  label="Assignee"
                  value={filters.assignee}
                  onClear={() => handleFilterChange('assignee', '')}
                  bgColor="bg-green-100"
                  textColor="text-green-800"
                />
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default FilterBar;