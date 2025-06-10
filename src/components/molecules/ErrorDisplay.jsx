import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Heading from '@/components/atoms/Heading';
import Paragraph from '@/components/atoms/Paragraph';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';

const ErrorDisplay = ({ iconName = 'AlertCircle', title, message, onRetry, className, ...motionProps }) => {
    return (
        <Container className={`flex items-center justify-center h-full ${className || ''}`} motionProps={motionProps}>
            <div className="text-center">
                <ApperIcon name={iconName} className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <Heading level={3} className="mb-2">{title}</Heading>
                <Paragraph className="mb-4">{message}</Paragraph>
                {onRetry && (
                    <Button
                        onClick={onRetry}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
                    >
                        Retry
                    </Button>
                )}
            </div>
        </Container>
    );
};

export default ErrorDisplay;