import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import KanbanColumn from '@/components/organisms/KanbanColumn';
import TaskCard from '@/components/organisms/TaskCard';
import { projectService, taskService } from '@/services';
import LoadingPlaceholder from '@/components/molecules/LoadingPlaceholder';
import ErrorDisplay from '@/components/molecules/ErrorDisplay';

const KanbanBoardView = ({ columns, tasks, filters, onTaskUpdate, onTaskCreate, onTaskDelete, onTaskClick }) => {
    const [projectData, setProjectData] = useState(null); // This will hold project data for column info
    const [allTasks, setAllTasks] = useState([]); // This will hold all tasks, used for DND
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [projectRes, tasksRes] = await Promise.all([
                    projectService.getById('1'), // Assuming '1' is the project ID
                    taskService.getAll()
                ]);
                setProjectData(projectRes);
                setAllTasks(tasksRes);
            } catch (err) {
                setError(err.message || 'Failed to load board data');
                toast.error('Failed to load board data');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        const activeTask = allTasks.find(task => task.id === active.id);
        if (!activeTask) return;

        const overId = over.id;
        let newColumnId = activeTask.columnId;

        // Check if dropped on a column (droppable area)
        if (projectData?.columns.find(col => col.id === overId)) {
            newColumnId = overId;
        } else {
            // Dropped on another task, get its column
            const overTask = allTasks.find(task => task.id === overId);
            if (overTask) {
                newColumnId = overTask.columnId;
            }
        }

        if (newColumnId === activeTask.columnId) return;

        try {
            const updatedTask = { ...activeTask, columnId: newColumnId };
            await taskService.update(activeTask.id, updatedTask);
            setAllTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === activeTask.id ? updatedTask : task
                )
            );
            onTaskUpdate(activeTask.id, updatedTask); // Propagate up to BoardPage
            toast.success('Task moved successfully');
        } catch (error) {
            toast.error('Failed to move task');
        }
    };

    if (loading) {
        return <LoadingPlaceholder type="page" count={4} />;
    }

    if (error) {
        return <ErrorDisplay title="Failed to load board" message={error} onRetry={() => window.location.reload()} />;
    }

    if (!projectData) {
        return (
            <ErrorDisplay
                iconName="Folder"
                title="No project found"
                message="Please select a project to view its board"
            />
        );
    }

    const activeTask = activeId ? allTasks.find(task => task.id === activeId) : null;

    // Apply filters locally for display
    let filteredTasks = [...allTasks];
    if (filters.assignee) {
      filteredTasks = filteredTasks.filter(task =>
        task.assigneeIds.includes(filters.assignee)
      );
    }
    if (filters.priority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filters.priority);
    }
    if (filters.dueDate) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      filteredTasks = filteredTasks.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);

        switch (filters.dueDate) {
          case 'today':
            return dueDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return dueDate.toDateString() === tomorrow.toDateString();
          case 'week':
            return dueDate <= nextWeek && dueDate >= today;
          case 'overdue':
            return dueDate < today;
          default:
            return true;
        }
      });
    }


    return (
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="h-full flex space-x-6 p-6 min-w-max">
                    {projectData.columns.map(column => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            tasks={filteredTasks.filter(task => task.columnId === column.id)}
                            onTaskCreate={onTaskCreate}
                            onTaskClick={onTaskClick}
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
    );
};

export default KanbanBoardView;