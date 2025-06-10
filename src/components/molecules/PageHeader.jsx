import React from 'react';
import SectionHeader from '@/components/molecules/SectionHeader';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const PageHeader = ({ title, description, actionButtonText, onActionButtonClick, actionButtonIcon, className }) => {
    return (
        <div className={`flex-shrink-0 px-6 py-4 border-b border-surface-200 bg-white ${className || ''}`}>
            <div className="flex items-center justify-between">
                <SectionHeader title={title} description={description} titleLevel={1} descriptionClassName="text-surface-600" />
                {actionButtonText && (
                    <Button
                        onClick={onActionButtonClick}
                        className="flex items-center space-x-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {actionButtonIcon && <ApperIcon name={actionButtonIcon} className="w-4 h-4" />}
                        <span>{actionButtonText}</span>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PageHeader;