import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'

const Settings = () => {
  const [settings, setSettings] = useState({
    projectName: 'Project Alpha',
    description: 'Main development project for the team',
    notifications: true,
    autoAssign: false,
    defaultPriority: 'medium'
  })

  const [columns, setColumns] = useState([
    { id: '1', title: 'To Do', color: '#94a3b8' },
    { id: '2', title: 'In Progress', color: '#3b82f6' },
    { id: '3', title: 'Review', color: '#f59e0b' },
    { id: '4', title: 'Done', color: '#10b981' }
  ])

  const handleSettingsUpdate = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully')
  }

  const handleColumnUpdate = (columnId, field, value) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId ? { ...col, [field]: value } : col
    ))
  }

  const handleAddColumn = () => {
    const newColumn = {
      id: Date.now().toString(),
      title: 'New Column',
      color: '#64748b'
    }
    setColumns(prev => [...prev, newColumn])
  }

  const handleRemoveColumn = (columnId) => {
    setColumns(prev => prev.filter(col => col.id !== columnId))
    toast.success('Column removed')
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-surface-900">Project Settings</h1>
        <p className="text-surface-600 mt-1">Configure your project preferences and board layout</p>
      </div>

      {/* Project Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        <h2 className="text-lg font-medium text-surface-900 mb-4">Project Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Project Name
            </label>
            <input
              type="text"
              value={settings.projectName}
              onChange={(e) => handleSettingsUpdate('projectName', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Description
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => handleSettingsUpdate('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            />
          </div>
        </div>
      </motion.div>

      {/* Board Columns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-surface-900">Board Columns</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddColumn}
            className="flex items-center space-x-2 bg-accent text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>Add Column</span>
          </motion.button>
        </div>
        <div className="space-y-3">
          {columns.map((column, index) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-4 p-3 border border-surface-200 rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: column.color }}
                />
                <input
                  type="text"
                  value={column.title}
                  onChange={(e) => handleColumnUpdate(column.id, 'title', e.target.value)}
                  className="flex-1 px-2 py-1 border border-surface-300 rounded focus:outline-none focus:border-secondary"
                />
                <input
                  type="color"
                  value={column.color}
                  onChange={(e) => handleColumnUpdate(column.id, 'color', e.target.value)}
                  className="w-8 h-8 rounded border border-surface-300 cursor-pointer"
                />
              </div>
              {columns.length > 1 && (
                <button
                  onClick={() => handleRemoveColumn(column.id)}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-sm"
      >
        <h2 className="text-lg font-medium text-surface-900 mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700">
                Email Notifications
              </label>
              <p className="text-xs text-surface-500">Receive updates about task changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingsUpdate('notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-surface-700">
                Auto-assign Tasks
              </label>
              <p className="text-xs text-surface-500">Automatically assign new tasks to team members</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoAssign}
                onChange={(e) => handleSettingsUpdate('autoAssign', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Default Priority
            </label>
            <select
              value={settings.defaultPriority}
              onChange={(e) => handleSettingsUpdate('defaultPriority', e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
        >
          Save Changes
        </motion.button>
      </div>
    </div>
  )
}

export default Settings