import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@/components/molecules/PageHeader';
import ProjectInformationForm from '@/components/organisms/ProjectInformationForm';
import BoardColumnManagement from '@/components/organisms/BoardColumnManagement';
import ProjectPreferencesForm from '@/components/organisms/ProjectPreferencesForm';
import Button from '@/components/atoms/Button';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    projectName: 'Project Alpha',
    description: 'Main development project for the team',
    notifications: true,
    autoAssign: false,
    defaultPriority: 'medium'
  });

  const [columns, setColumns] = useState([
    { id: '1', title: 'To Do', color: '#94a3b8' },
    { id: '2', title: 'In Progress', color: '#3b82f6' },
    { id: '3', title: 'Review', color: '#f59e0b' },
    { id: '4', title: 'Done', color: '#10b981' }
  ]);

  const handleSettingsUpdate = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleColumnUpdate = (columnId, field, value) => {
    setColumns(prev => prev.map(col =>
      col.id === columnId ? { ...col, [field]: value } : col
    ));
  };

  const handleAddColumn = () => {
    const newColumn = {
      id: Date.now().toString(),
      title: 'New Column',
      color: '#64748b'
    };
    setColumns(prev => [...prev, newColumn]);
  };

  const handleRemoveColumn = (columnId) => {
    setColumns(prev => prev.filter(col => col.id !== columnId));
    toast.success('Column removed');
  };

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
    // In a real app, you'd send `settings` and `columns` to a backend here.
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title="Project Settings"
        description="Configure your project preferences and board layout"
      />

      <ProjectInformationForm
        settings={settings}
        onUpdate={handleSettingsUpdate}
      />

      <BoardColumnManagement
        columns={columns}
        onColumnUpdate={handleColumnUpdate}
        onAddColumn={handleAddColumn}
        onRemoveColumn={handleRemoveColumn}
      />

      <ProjectPreferencesForm
        settings={settings}
        onUpdate={handleSettingsUpdate}
      />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;