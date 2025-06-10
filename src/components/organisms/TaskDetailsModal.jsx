import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import BaseModal from '@/components/atoms/BaseModal';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Label from '@/components/atoms/Label';
import FormField from '@/components/molecules/FormField';
import Paragraph from '@/components/atoms/Paragraph';

const TaskDetailsModal = ({ isOpen, onClose, task, onSave, onDelete, columns }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    columnId: '',
    priority: 'medium',
    dueDate: '',
    assigneeIds: []
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        columnId: task.columnId || '',
        priority: task.priority || 'medium',
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : '',
        assigneeIds: task.assigneeIds || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        columnId: columns?.[0]?.id || '',
        priority: 'medium',
        dueDate: '',
        assigneeIds: []
      });
    }
  }, [task, columns, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };

    if (task) {
      await onSave(task.id, taskData);
    } else {
      await onSave(formData.columnId, taskData);
    }
    onClose();
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await onDelete(task.id);
      onClose();
    }
  };

  const columnOptions = columns?.map(col => ({ value: col.id, label: col.title })) || [];
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Heading level={2}>{task ? 'Edit Task' : 'Create Task'}</Heading>
          <Button
            type="button"
            onClick={onClose}
            className="p-2 text-surface-400 hover:text-surface-600 transition-colors duration-200"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <FormField
            id="title"
            label="Task Title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter task title..."
            required
          />

          <FormField
            id="description"
            label="Description"
            type="textarea"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            placeholder="Enter task description..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="columnId"
              label="Column"
              type="select"
              value={formData.columnId}
              onChange={(e) => setFormData(prev => ({ ...prev, columnId: e.target.value }))}
              options={columnOptions}
            />

            <FormField
              id="priority"
              label="Priority"
              type="select"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              options={priorityOptions}
            />
          </div>

          <FormField
            id="dueDate"
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
          />

          <div>
            <Label className="mb-2">Assignees</Label>
            <div className="flex items-center space-x-2 p-3 border border-surface-300 rounded-lg">
              <ApperIcon name="Users" className="w-4 h-4 text-surface-400" />
              <Paragraph className="text-sm text-surface-500 mb-0">
                {formData.assigneeIds.length > 0
                  ? `${formData.assigneeIds.length} assignee(s) selected`
                  : 'No assignees selected'
                }
              </Paragraph>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-surface-200">
          <div>
            {task && (
              <Button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            )}
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 text-surface-600 hover:text-surface-800 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!formData.title.trim()}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {task ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </div>
      </form>
    </BaseModal>
  );
};

export default TaskDetailsModal;