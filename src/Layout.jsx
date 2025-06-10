import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './components/ApperIcon'
import { routes } from './config/routes'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState('Project Alpha')
  const location = useLocation()

  const projects = [
    'Project Alpha',
    'Project Beta', 
    'Project Gamma'
  ]

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-surface-50">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-surface-200 z-40">
        <div className="h-full px-4 flex items-center justify-between max-w-full">
          {/* Left side */}
          <div className="flex items-center space-x-4 min-w-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-purple rounded-lg flex items-center justify-center">
                <ApperIcon name="Kanban" className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-surface-900 hidden sm:block">
                FlowBoard
              </span>
            </div>

            {/* Project Selector */}
            <div className="relative">
              <select 
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="appearance-none bg-surface-50 border border-surface-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-surface-700 hover:border-secondary focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
              >
                {projects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
              <ApperIcon 
                name="ChevronDown" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-surface-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {Object.values(routes).map(route => (
              <NavLink
                key={route.id}
                to={route.path}
                className={({ isActive }) => `
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-purple text-white shadow-sm' 
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                  }
                `}
              >
                <ApperIcon name={route.icon} className="w-4 h-4" />
                <span>{route.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Add Task Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
            >
              <ApperIcon name="Plus" className="w-4 h-4" />
              <span>Add Task</span>
            </motion.button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-surface-600 hover:text-surface-900 hover:bg-surface-100 transition-colors duration-200"
            >
              <ApperIcon name={mobileMenuOpen ? 'X' : 'Menu'} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden"
            >
              <nav className="p-4 space-y-2">
                {Object.values(routes).map(route => (
                  <NavLink
                    key={route.id}
                    to={route.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-purple text-white shadow-sm' 
                        : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                      }
                    `}
                  >
                    <ApperIcon name={route.icon} className="w-5 h-5" />
                    <span>{route.label}</span>
                  </NavLink>
                ))}
                <div className="border-t border-surface-200 my-4 pt-4">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/90 transition-colors duration-200">
                    <ApperIcon name="Plus" className="w-5 h-5" />
                    <span>Add Task</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout