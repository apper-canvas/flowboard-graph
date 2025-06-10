import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { format, isToday, isTomorrow, isPast } from 'date-fns'
import ApperIcon from './ApperIcon'

const TaskCard = ({ task, onClick, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50'
      case 'medium': return 'border-l-yellow-500 bg-yellow-50'  
      case 'low': return 'border-l-green-500 bg-green-50'
      default: return 'border-l-surface-300 bg-white'
    }
  }

  const getDueDateDisplay = (dueDate) => {
    if (!dueDate) return null
    
    const date = new Date(dueDate)
    let color = 'text-surface-600'
    let bgColor = 'bg-surface-100'
    
    if (isPast(date) && !isToday(date)) {
      color = 'text-red-700'
      bgColor = 'bg-red-100'
    } else if (isToday(date)) {
      color = 'text-yellow-700'
      bgColor = 'bg-yellow-100'
    } else if (isTomorrow(date)) {
      color = 'text-blue-700'
      bgColor = 'bg-blue-100'
    }

    let displayText
    if (isToday(date)) {
      displayText = 'Today'
    } else if (isTomorrow(date)) {
      displayText = 'Tomorrow'
    } else {
      displayText = format(date, 'MMM d')
    }

    return { displayText, color, bgColor }
  }

  const dueDateInfo = getDueDateDisplay(task.dueDate)

  if (isDragging) {
    return (
      <div className={`bg-white rounded-lg p-4 shadow-lg border-l-4 ${getPriorityColor(task.priority)} cursor-grabbing`}>
        <h4 className="font-medium text-surface-900 mb-2 break-words">{task.title}</h4>
        {task.description && (
          <p className="text-sm text-surface-600 mb-3 break-words line-clamp-2">{task.description}</p>
        )}
      </div>
    )
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      whileHover={!isSortableDragging ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isSortableDragging ? { scale: 0.98 } : {}}
      onClick={() => !isSortableDragging && onClick && onClick()}
      className={`
        bg-white rounded-lg p-4 shadow-sm border-l-4 cursor-pointer transition-all duration-200
        ${getPriorityColor(task.priority)}
        ${isSortableDragging ? 'opacity-50 cursor-grabbing shadow-lg' : 'hover:shadow-md cursor-grab'}
      `}
    >
      {/* Task Header */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-surface-900 break-words flex-1 min-w-0 pr-2">
          {task.title}
        </h4>
        <div className="flex items-center space-x-1 flex-shrink-0">
          {task.priority === 'high' && (
            <ApperIcon name="AlertCircle" className="w-3 h-3 text-red-500" />
          )}
          <ApperIcon name="GripVertical" className="w-3 h-3 text-surface-400" />
        </div>
      </div>

      {/* Task Description */}
      {task.description && (
        <p className="text-sm text-surface-600 mb-3 break-words line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Task Labels */}
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.slice(0, 2).map(label => (
            <span
              key={label.id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </span>
          ))}
          {task.labels.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface-200 text-surface-700">
              +{task.labels.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Task Footer */}
      <div className="flex items-center justify-between text-xs">
        {/* Due Date */}
        {dueDateInfo && (
          <span className={`inline-flex items-center px-2 py-1 rounded-full font-medium ${dueDateInfo.color} ${dueDateInfo.bgColor}`}>
            <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
            {dueDateInfo.displayText}
          </span>
        )}

        {/* Assignees */}
        {task.assigneeIds && task.assigneeIds.length > 0 && (
          <div className="flex -space-x-1">
            {task.assigneeIds.slice(0, 3).map((assigneeId, index) => (
              <div
                key={assigneeId}
                className="w-6 h-6 rounded-full bg-gradient-purple border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                style={{ zIndex: 10 - index }}
              >
                {assigneeId[0].toUpperCase()}
              </div>
            ))}
            {task.assigneeIds.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-surface-300 border-2 border-white flex items-center justify-center text-surface-700 text-xs font-medium">
                +{task.assigneeIds.length - 3}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TaskCard