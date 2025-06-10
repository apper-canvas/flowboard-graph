import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/molecules/SectionHeader';
import ToggleSwitch from '@/components/molecules/ToggleSwitch';
import FormField from '@/components/molecules/FormField';

const ProjectPreferencesForm = ({ settings, onUpdate, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`bg-white rounded-lg p-6 shadow-sm ${className || ''}`}
        >
            <SectionHeader title="Preferences" titleLevel={2} className="mb-4" />
            <div className="space-y-4">
                <ToggleSwitch
                    id="notifications"
                    label="Email Notifications"
                    description="Receive updates about task changes"
                    checked={settings.notifications}
                    onChange={(e) => onUpdate('notifications', e.target.checked)}
                />
                <ToggleSwitch
                    id="autoAssign"
                    label="Auto-assign Tasks"
                    description="Automatically assign new tasks to team members"
                    checked={settings.autoAssign}
                    onChange={(e) => onUpdate('autoAssign', e.target.checked)}
                />
                <FormField
                    id="defaultPriority"
                    label="Default Priority"
                    type="select"
                    value={settings.defaultPriority}
                    onChange={(e) => onUpdate('defaultPriority', e.target.value)}
                    options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                    ]}
                />
            </div>
        </motion.div>
    );
};

export default ProjectPreferencesForm;