import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/molecules/SectionHeader';
import ColumnConfigItem from '@/components/molecules/ColumnConfigItem';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const BoardColumnManagement = ({ columns, onColumnUpdate, onAddColumn, onRemoveColumn, className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`bg-white rounded-lg p-6 shadow-sm ${className || ''}`}
        >
            <div className="flex items-center justify-between mb-4">
                <SectionHeader title="Board Columns" titleLevel={2} className="mb-0" />
                <Button
                    onClick={onAddColumn}
                    className="flex items-center space-x-2 bg-accent text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ApperIcon name="Plus" className="w-4 h-4" />
                    <span>Add Column</span>
                </Button>
            </div>
            <div className="space-y-3">
                {columns.map((column, index) => (
                    <ColumnConfigItem
                        key={column.id}
                        column={column}
                        onUpdate={onColumnUpdate}
                        onRemove={onRemoveColumn}
                        showRemove={columns.length > 1}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default BoardColumnManagement;