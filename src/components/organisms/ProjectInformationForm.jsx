import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/molecules/SectionHeader';
import FormField from '@/components/molecules/FormField';

const ProjectInformationForm = ({ settings, onUpdate, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white rounded-lg p-6 shadow-sm ${className || ''}`}
        >
            <SectionHeader title="Project Information" titleLevel={2} className="mb-4" />
            <div className="space-y-4">
                <FormField
                    id="projectName"
                    label="Project Name"
                    type="text"
                    value={settings.projectName}
                    onChange={(e) => onUpdate('projectName', e.target.value)}
                />
                <FormField
                    id="description"
                    label="Description"
                    type="textarea"
                    value={settings.description}
                    onChange={(e) => onUpdate('description', e.target.value)}
                    rows={3}
                />
            </div>
        </motion.div>
    );
};

export default ProjectInformationForm;