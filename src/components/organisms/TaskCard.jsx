import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Avatar from '@/components/atoms/Avatar';

const TaskCard = ({ task, onClick, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-surface-300 bg-white';
    }
  };

  const getDueDateDisplay = (dueDate) => {
    if (!dueDate) return null;

    const date = new Date(dueDate);
    let color = 'text-surface-600';
    let bgColor = 'bg-surface-100';

    if (isPast(date) && !isToday(date)) {
      color = 'text-red-700';
      bgColor = 'bg-red-100';
    } else if (isToday(date)) {
      color = 'text-yellow-700';
      bgColor = 'bg-yellow-100';
    } else if (isTomorrow(date)) {
      color = 'text-blue-700';
      bgColor = 'bg-blue-100';
    }

    let displayText;
    if (isToday(date)) {
      displayText = 'Today';
    } else if (isTomorrow(date)) {
      displayText = 'Tomorrow';
    } else {
      displayText = format(date, 'MMM d');
    }

    return { displayText, color, bgColor };
  };

  const dueDateInfo = getDueDateDisplay(task.dueDate);

  if (isDragging) {
    return (
      <div className={`bg-white rounded-lg p-4 shadow-lg border-l-4 ${getPriorityColor(task.priority)} cursor-grabbing`}>
        <Heading level={4} className="mb-2 break-words">{task.title}</Heading>
        {task.description && (
          <Paragraph className="text-sm mb-3 break-words line-clamp-2">{task.description}</Paragraph>
        )}
      </div>
    );
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
        <Heading level={4} className="break-words flex-1 min-w-0 pr-2">
          {task.title}
        </Heading>
        <div className="flex items-center space-x-1 flex-shrink-0">
          {task.priority === 'high' && (
            <ApperIcon name="AlertCircle" className="w-3 h-3 text-red-500" />
          )}
          <ApperIcon name="GripVertical" className="w-3 h-3 text-surface-400" />
        </div>
      </div>

      {/* Task Description */}
      {task.description && (
        <Paragraph className="text-sm mb-3 break-words line-clamp-2">
          {task.description}
        </Paragraph>
      )}

      {/* Task Labels */}
      {task.labels && task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.labels.slice(0, 2).map(label => (
            <Badge
              key={label.id}
              className="text-white"
              bgColor={label.color}
            >
              {label.name}
            </Badge>
          ))}
          {task.labels.length > 2 && (
            <Badge bgColor="bg-surface-200" textColor="text-surface-700">
              +{task.labels.length - 2}
            </Badge>
          )}
        </div>
      )}

      {/* Task Footer */}
      <div className="flex items-center justify-between text-xs">
        {/* Due Date */}
        {dueDateInfo && (
          <Badge className={`font-medium ${dueDateInfo.color} ${dueDateInfo.bgColor}`}>
            <ApperIcon name="Calendar" className="w-3 h-3 mr-1" />
            {dueDateInfo.displayText}
          </Badge>
        )}

        {/* Assignees */}
        {task.assigneeIds && task.assigneeIds.length > 0 && (
          <div className="flex -space-x-1">
            {task.assigneeIds.slice(0, 3).map((assigneeId, index) => (
              <Avatar
                key={assigneeId}
                initials={assigneeId[0].toUpperCase()}
                className="w-6 h-6 border-2 border-white"
                style={{ zIndex: 10 - index }}
              />
            ))}
            {task.assigneeIds.length > 3 && (
              <Avatar
                initials={`+${task.assigneeIds.length - 3}`}
                className="w-6 h-6 border-2 border-white bg-surface-300 text-surface-700"
                bgColor="bg-surface-300"
                textColor="text-surface-700"
              />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;