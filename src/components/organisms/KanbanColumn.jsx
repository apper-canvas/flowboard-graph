import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import TaskCard from '@/components/organisms/TaskCard';
import QuickAddTaskForm from '@/components/organisms/QuickAddTaskForm';
import Heading from '@/components/atoms/Heading';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Paragraph from '@/components/atoms/Paragraph';

const KanbanColumn = ({ column, tasks, onTaskCreate, onTaskClick }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { setNodeRef } = useDroppable({ id: column.id });

  const handleTaskCreate = async (taskData) => {
    await onTaskCreate(column.id, taskData);
    setIsAddingTask(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-surface-100 text-surface-800';
    }
  };

  const tasksByPriority = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm h-full flex flex-col overflow-hidden">
        {/* Column Header */}
        <div className="p-4 border-b border-surface-200" style={{ backgroundColor: column.color + '20' }}>
          <div className="flex items-center justify-between mb-2">
            <Heading level={4}>{column.title}</Heading>
            <Badge bgColor="bg-surface-100" textColor="text-surface-600">
              {tasks.length}
            </Badge>
          </div>

          {/* Priority Distribution */}
          {tasks.length > 0 && (
            <div className="flex space-x-1">
              {Object.entries(tasksByPriority).map(([priority, count]) => (
                <Badge
                  key={priority}
                  className={`font-medium ${getPriorityColor(priority)}`}
                >
                  {priority}: {count}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Tasks Area */}
        <div
          ref={setNodeRef}
          className="flex-1 p-4 space-y-3 overflow-y-auto min-h-0"
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            <AnimatePresence>
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TaskCard
                    task={task}
                    onClick={() => onTaskClick(task)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </SortableContext>

          {/* Quick Add Task */}
          <AnimatePresence>
            {isAddingTask ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <QuickAddTaskForm
                  onSave={handleTaskCreate}
                  onCancel={() => setIsAddingTask(false)}
                />
              </motion.div>
            ) : (
              <Button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsAddingTask(true)}
                className="w-full p-3 border-2 border-dashed border-surface-300 rounded-lg text-surface-500 hover:border-secondary hover:text-secondary transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span className="text-sm font-medium">Add task</span>
              </Button>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {tasks.length === 0 && !isAddingTask && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <ApperIcon name="Package" className="w-12 h-12 text-surface-300 mx-auto mb-3" />
              <Paragraph className="text-sm text-surface-500">No tasks yet</Paragraph>
              <Paragraph className="text-xs text-surface-400 mt-1">Click the button above to add one</Paragraph>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;