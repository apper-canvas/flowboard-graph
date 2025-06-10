import React from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ColumnConfigItem = ({ column, onUpdate, onRemove, showRemove, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 p-3 border border-surface-200 rounded-lg"
        >
            <div className="flex items-center space-x-3 flex-1">
                <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: column.color }}
                />
                <Input
                    type="text"
                    value={column.title}
                    onChange={(e) => onUpdate(column.id, 'title', e.target.value)}
                    className="flex-1 px-2 py-1 border border-surface-300 rounded focus:outline-none focus:border-secondary"
                    inputClassName="px-2 py-1" // Override default input padding to be smaller
                />
                <Input
                    type="color"
                    value={column.color}
                    onChange={(e) => onUpdate(column.id, 'color', e.target.value)}
                    className="w-8 h-8 rounded border border-surface-300 cursor-pointer"
                />
            </div>
            {showRemove && (
                <Button
                    onClick={() => onRemove(column.id)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                    <ApperIcon name="Trash2" className="w-4 h-4" />
                </Button>
            )}
        </motion.div>
    );
};

export default ColumnConfigItem;