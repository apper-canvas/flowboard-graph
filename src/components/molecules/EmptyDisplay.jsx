import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';

const EmptyDisplay = ({ iconName = 'Package', title, message, actionButtonText, onActionButtonClick, className, ...motionProps }) => {
    return (
        <Container className={`flex items-center justify-center h-full ${className || ''}`} motionProps={motionProps}>
            <div className="text-center">
                <ApperIcon name={iconName} className="w-16 h-16 text-surface-300 mx-auto mb-4" />
                <Heading level={3} className="mb-2">{title}</Heading>
                <Paragraph className="mb-4">{message}</Paragraph>
                {actionButtonText && (
                    <Button
                        onClick={onActionButtonClick}
                        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {actionButtonText}
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default EmptyDisplay;