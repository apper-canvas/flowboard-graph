import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const FilterBar = ({ filters, onFiltersChange }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    onFiltersChange({
      assignee: '',
      priority: '',
      dueDate: ''
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value)

  return (
    <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-surface-200">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Filter" className="w-4 h-4 text-surface-500" />
          <span className="text-sm font-medium text-surface-700">Filters:</span>
        </div>

        {/* Priority Filter */}
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="px-3 py-1.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-secondary bg-white"
        >
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        {/* Due Date Filter */}
        <select
          value={filters.dueDate}
          onChange={(e) => handleFilterChange('dueDate', e.target.value)}
          className="px-3 py-1.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-secondary bg-white"
        >
          <option value="">All Due Dates</option>
          <option value="overdue">Overdue</option>
          <option value="today">Due Today</option>
          <option value="tomorrow">Due Tomorrow</option>
          <option value="week">Due This Week</option>
        </select>

        {/* Assignee Filter */}
        <select
          value={filters.assignee}
          onChange={(e) => handleFilterChange('assignee', e.target.value)}
          className="px-3 py-1.5 text-sm border border-surface-300 rounded-lg focus:outline-none focus:border-secondary bg-white"
        >
          <option value="">All Assignees</option>
          <option value="user1">John Smith</option>
          <option value="user2">Sarah Johnson</option>
          <option value="user3">Mike Chen</option>
        </select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="flex items-center space-x-1 px-3 py-1.5 text-sm text-surface-600 hover:text-surface-800 transition-colors duration-200"
          >
            <ApperIcon name="X" className="w-3 h-3" />
            <span>Clear</span>
          </motion.button>
        )}
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-2">
          {filters.priority && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Priority: {filters.priority}
              <button
                onClick={() => handleFilterChange('priority', '')}
                className="ml-1 text-purple-600 hover:text-purple-800"
              >
                <ApperIcon name="X" className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.dueDate && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Due: {filters.dueDate}
              <button
                onClick={() => handleFilterChange('dueDate', '')}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <ApperIcon name="X" className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.assignee && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Assignee: {filters.assignee}
              <button
                onClick={() => handleFilterChange('assignee', '')}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                <ApperIcon name="X" className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterBar