import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/molecules/PageHeader';
import FilterBar from '@/components/organisms/FilterBar';
import KanbanBoardView from '@/components/organisms/KanbanBoardView';
import TaskDetailsModal from '@/components/organisms/TaskDetailsModal';
import { projectService, taskService } from '@/services';
import LoadingPlaceholder from '@/components/molecules/LoadingPlaceholder';
import ErrorDisplay from '@/components/molecules/ErrorDisplay';

const BoardPage = () => {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]); // Master list of tasks
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    assignee: '',
    priority: '',
    dueDate: ''
  });

  useEffect(() => {
    const loadProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectData = await projectService.getById('1');
        const tasksData = await taskService.getAll();
        setProject(projectData);
        setTasks(tasksData);
      } catch (err) {
        setError(err.message || 'Failed to load board data');
        toast.error('Failed to load board data');
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, []);

  const handleTaskCreate = async (columnId, taskData) => {
    try {
      const newTask = await taskService.create({
        ...taskData,
        columnId,
        position: tasks.filter(t => t.columnId === columnId).length
      });
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    }
  };

  const handleTaskUpdate = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates);
      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const openTaskModal = (task = null) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(false);
  };

  if (loading) {
    return <LoadingPlaceholder type="page" count={4} />;
  }

  if (error) {
    return <ErrorDisplay title="Failed to load board" message={error} onRetry={() => window.location.reload()} />;
  }

  if (!project) {
    return (
      <ErrorDisplay
        iconName="Folder"
        title="No project found"
        message="Please select a project to view its board"
      />
    );
  }

  return (
    <div className="h-full flex flex-col max-w-full overflow-hidden">
      <PageHeader
        title={project.name}
        description={project.description}
        actionButtonText="Add Task"
        actionButtonIcon="Plus"
        onActionButtonClick={() => openTaskModal()}
      />

      <FilterBar filters={filters} onFiltersChange={setFilters} />

      <KanbanBoardView
        columns={project.columns}
        tasks={tasks} // Pass master tasks and let KanbanBoardView handle filtering
        filters={filters}
        onTaskCreate={handleTaskCreate}
        onTaskUpdate={handleTaskUpdate}
        onTaskDelete={handleTaskDelete}
        onTaskClick={openTaskModal}
      />

      <TaskDetailsModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        task={selectedTask}
        onSave={selectedTask ? handleTaskUpdate : handleTaskCreate}
        onDelete={handleTaskDelete}
        columns={project.columns}
      />
    </div>
  );
};

export default BoardPage;