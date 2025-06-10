import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { toast } from 'react-toastify'
import ApperIcon from '../components/ApperIcon'
import KanbanColumn from '../components/KanbanColumn'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import FilterBar from '../components/FilterBar'
import { projectService, taskService } from '../services'

const Board = () => {
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeId, setActiveId] = useState(null)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    assignee: '',
    priority: '',
    dueDate: ''
  })

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [projectData, tasksData] = await Promise.all([
          projectService.getById('1'),
          taskService.getAll()
        ])
        setProject(projectData)
        setTasks(tasksData)
        setFilteredTasks(tasksData)
      } catch (err) {
        setError(err.message || 'Failed to load board data')
        toast.error('Failed to load board data')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    let filtered = [...tasks]

    if (filters.assignee) {
      filtered = filtered.filter(task => 
        task.assigneeIds.includes(filters.assignee)
      )
    }

    if (filters.priority) {
      filtered = filtered.filter(task => task.priority === filters.priority)
    }

    if (filters.dueDate) {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7)

      filtered = filtered.filter(task => {
        if (!task.dueDate) return false
        const dueDate = new Date(task.dueDate)
        
        switch (filters.dueDate) {
          case 'today':
            return dueDate.toDateString() === today.toDateString()
          case 'tomorrow':
            return dueDate.toDateString() === tomorrow.toDateString()
          case 'week':
            return dueDate <= nextWeek && dueDate >= today
          case 'overdue':
            return dueDate < today
          default:
            return true
        }
      })
    }

    setFilteredTasks(filtered)
  }, [tasks, filters])

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const activeTask = tasks.find(task => task.id === active.id)
    if (!activeTask) return

    const overId = over.id
    let newColumnId = activeTask.columnId

    // Check if dropped on a column
    if (project?.columns.find(col => col.id === overId)) {
      newColumnId = overId
    } else {
      // Dropped on another task, get its column
      const overTask = tasks.find(task => task.id === overId)
      if (overTask) {
        newColumnId = overTask.columnId
      }
    }

    if (newColumnId === activeTask.columnId) return

    try {
      // Update task column
      const updatedTask = { ...activeTask, columnId: newColumnId }
      await taskService.update(activeTask.id, updatedTask)
      
      // Update local state
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === activeTask.id ? updatedTask : task
        )
      )
      
      toast.success('Task moved successfully')
    } catch (error) {
      toast.error('Failed to move task')
    }
  }

  const handleTaskCreate = async (columnId, taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        columnId,
        position: tasks.filter(t => t.columnId === columnId).length
      })
      setTasks(prev => [...prev, newTask])
      toast.success('Task created successfully')
    } catch (error) {
      toast.error('Failed to create task')
    }
  }

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates)
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task))
      toast.success('Task updated successfully')
    } catch (error) {
      toast.error('Failed to update task')
    }
  }

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(task => task.id !== taskId))
      toast.success('Task deleted successfully')
    } catch (error) {
      toast.error('Failed to delete task')
    }
  }

  const openTaskModal = (task = null) => {
    setSelectedTask(task)
    setIsTaskModalOpen(true)
  }

  const closeTaskModal = () => {
    setSelectedTask(null)
    setIsTaskModalOpen(false)
  }

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface-200 rounded w-1/4 mb-4"></div>
          <div className="h-12 bg-surface-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-6 bg-surface-200 rounded"></div>
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-32 bg-surface-200 rounded"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">Failed to load board</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <ApperIcon name="Folder" className="w-12 h-12 text-surface-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-surface-900 mb-2">No project found</h3>
          <p className="text-surface-600">Please select a project to view its board</p>
        </div>
      </div>
    )
  }

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      {/* Page Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b border-surface-200 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-surface-900">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-surface-600 mt-1">{project.description}</p>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openTaskModal()}
            className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
            <span>Add Task</span>
          </motion.button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar filters={filters} onFiltersChange={setFilters} />

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full flex space-x-6 p-6 min-w-max">
            {project.columns.map(column => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={filteredTasks.filter(task => task.columnId === column.id)}
                onTaskCreate={handleTaskCreate}
                onTaskClick={openTaskModal}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <div className="rotate-6 opacity-80">
                <TaskCard task={activeTask} isDragging />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
        onSave={selectedTask ? handleTaskUpdate : handleTaskCreate}
        onDelete={handleTaskDelete}
        columns={project.columns}
      />
    </div>
  )
}

export default Board